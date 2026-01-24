import sqlite3
import json
from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils import executor

# ================= НАСТРОЙКИ =================
TOKEN = "8282187260:AAF2UJHLBYkFccp2UWK5vFPOCRyCzyGuB5M"
ADMIN_ID = 1811483526

# ВАЖНО: Замените эту ссылку на ваш адрес (например, ngrok или GitHub Pages)
# WEBAPP_URL = "https://cssurgeon.github.io/easy-sugurta-server/" 
WEBAPP_URL = "https://cssurgeon.github.io/easy-sugurta-server/" # Placeholder, replace with your URL

bot = Bot(token=TOKEN, parse_mode="Markdown")
dp = Dispatcher(bot)

# ================= БАЗА ДАННЫХ =================
def init_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            username TEXT,
            phone TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS calculations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            car TEXT,
            price TEXT
        )
    """)
    conn.commit()
    conn.close()

# ================= START =================
@dp.message_handler(commands=["start"])
async def start(message: types.Message):
    kb = ReplyKeyboardMarkup(resize_keyboard=True)
    kb.add(KeyboardButton("🔑 Пройти авторизацию", request_contact=True))

    await message.answer(
        "👋 Добро пожаловать в **EASY SUGURTA**!\n\n"
        "Подтвердите номер телефона:",
        reply_markup=kb
    )

@dp.message_handler(content_types=["contact"])
async def save_user(message: types.Message):
    user = message.from_user

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO users VALUES (?, ?, ?, ?)",
        (
            user.id,
            user.first_name,
            f"@{user.username}" if user.username else "Нет",
            message.contact.phone_number
        )
    )
    conn.commit()
    conn.close()

    ikb = InlineKeyboardMarkup(row_width=1)
    ikb.add(
        InlineKeyboardButton("🆘 Страховой случай", callback_data="sos"),
        InlineKeyboardButton("💬 Консультация 24/7", callback_data="support"),
        InlineKeyboardButton("🛒 Купить страховку", web_app=types.WebAppInfo(url=WEBAPP_URL))
    )

    await message.answer("✅ Вы зарегистрированы!", reply_markup=ikb)

# ================= АДМИН ПАНЕЛЬ =================
@dp.message_handler(commands=["admin"])
async def admin_panel(message: types.Message):
    if message.from_user.id != ADMIN_ID:
        return await message.answer("❌ Нет доступа")

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    users_count = cursor.fetchone()[0]
    conn.close()

    ikb = InlineKeyboardMarkup(row_width=1)
    ikb.add(
        InlineKeyboardButton("👥 Список пользователей", callback_data="list_users"),
        InlineKeyboardButton("📊 Последние расчеты", callback_data="list_calcs"),
        InlineKeyboardButton("📢 Сделать рассылку", callback_data="broadcast")
    )

    await message.answer(
        f"⚙️ **Админ-панель**\n\n👥 Пользователей: {users_count}",
        reply_markup=ikb
    )

# ================= ВСЕ ПОЛЬЗОВАТЕЛИ =================
@dp.callback_query_handler(lambda c: c.data == "list_users")
async def show_users(callback: types.CallbackQuery):
    if callback.from_user.id != ADMIN_ID:
        return

    await callback.answer()

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, username, phone FROM users")
    users = cursor.fetchall()
    conn.close()

    if not users:
        return await callback.message.answer("❌ Пользователей нет")

    text = "👥 **ВСЕ ПОЛЬЗОВАТЕЛИ:**\n\n"
    for u in users:
        text += (
            f"🆔 `{u[0]}`\n"
            f"👤 {u[1]}\n"
            f"🔗 {u[2]}\n"
            f"📞 {u[3]}\n"
            f"────────────\n"
        )

    for part in [text[i:i+3500] for i in range(0, len(text), 3500)]:
        await callback.message.answer(part)

# ================= РАСЧЕТЫ =================
@dp.callback_query_handler(lambda c: c.data == "list_calcs")
async def show_calcs(callback: types.CallbackQuery):
    if callback.from_user.id != ADMIN_ID:
        return

    await callback.answer()

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
        SELECT users.name, calculations.car, calculations.price
        FROM calculations
        JOIN users ON users.id = calculations.user_id
    """)
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        return await callback.message.answer("❌ Расчетов пока нет")

    text = "📊 **ВСЕ РАСЧЕТЫ:**\n\n"
    for r in rows:
        text += f"👤 {r[0]} | 🚗 {r[1]} | 💰 {r[2]}\n"

    await callback.message.answer(text)

# ================= РАССЫЛКА =================
waiting_broadcast = False

@dp.callback_query_handler(lambda c: c.data == "broadcast")
async def start_broadcast(callback: types.CallbackQuery):
    global waiting_broadcast
    if callback.from_user.id != ADMIN_ID:
        return

    waiting_broadcast = True
    await callback.answer()
    await callback.message.answer("✍️ Отправь текст рассылки")

@dp.message_handler(lambda m: m.from_user.id == ADMIN_ID)
async def do_broadcast(message: types.Message):
    global waiting_broadcast
    if not waiting_broadcast:
        return

    waiting_broadcast = False

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users")
    users = cursor.fetchall()
    conn.close()

    sent = 0
    for u in users:
        try:
            await bot.send_message(u[0], message.text)
            sent += 1
        except:
            pass

    await message.answer(f"✅ Рассылка отправлена: {sent}")

# ================= MINI APP =================
@dp.message_handler(content_types=["web_app_data"])
async def mini_app(message: types.Message):
    data = json.loads(message.web_app_data.data)

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO calculations (user_id, car, price) VALUES (?, ?, ?)",
        (message.from_user.id, data.get("car"), data.get("price"))
    )
    conn.commit()
    conn.close()

    await message.answer("✅ Расчет сохранён")

# ================= RUN =================
if __name__ == "__main__":
    init_db()
    print("BOT STARTED")
    executor.start_polling(dp, skip_updates=True)
