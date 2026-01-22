import sqlite3
import json
from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils import executor

TOKEN = "PUT_YOUR_NEW_TOKEN_HERE"
ADMIN_ID = 1811483526
WEBAPP_URL = "https://cssurgeon.github.io/easy-sugurta-server/"

bot = Bot(token=TOKEN, parse_mode="Markdown")
dp = Dispatcher(bot)

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

@dp.message_handler(commands=["start"])
async def start(message: types.Message):
    kb = ReplyKeyboardMarkup(resize_keyboard=True)
    kb.add(KeyboardButton("🔑 Пройти авторизацию", request_contact=True))
    await message.answer("Подтвердите номер:", reply_markup=kb)

@dp.message_handler(content_types=["contact"])
async def save_user(message: types.Message):
    user = message.from_user
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO users VALUES (?, ?, ?, ?)",
        (user.id, user.first_name, f"@{user.username}" if user.username else "Нет", message.contact.phone_number)
    )
    conn.commit()
    conn.close()

    kb = InlineKeyboardMarkup(row_width=1)
    kb.add(
        InlineKeyboardButton("🛒 Купить страховку", web_app=types.WebAppInfo(url=WEBAPP_URL))
    )
    await message.answer("✅ Вы зарегистрированы", reply_markup=kb)

@dp.message_handler(commands=["admin"])
async def admin(message: types.Message):
    if message.from_user.id != ADMIN_ID:
        return

    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    conn.close()

    kb = InlineKeyboardMarkup(row_width=1)
    kb.add(
        InlineKeyboardButton("👥 Пользователи", callback_data="users"),
        InlineKeyboardButton("📊 Расчёты", callback_data="calcs")
    )

    await message.answer(f"Админка\n\nПользователей: {count}", reply_markup=kb)

@dp.callback_query_handler(lambda c: c.data == "users")
async def users(callback: types.CallbackQuery):
    await callback.answer()
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT name, phone FROM users")
    rows = cursor.fetchall()
    conn.close()

    text = "Пользователи:\n"
    for r in rows:
        text += f"{r[0]} — {r[1]}\n"

    await callback.message.answer(text or "Нет данных")

@dp.message_handler(content_types=["web_app_data"])
async def web_app(message: types.Message):
    data = json.loads(message.web_app_data.data)
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO calculations (user_id, car, price) VALUES (?, ?, ?)",
        (message.from_user.id, data.get("car"), data.get("price"))
    )
    conn.commit()
    conn.close()
    await message.answer("✅ Расчёт сохранён")

if __name__ == "__main__":
    init_db()
    executor.start_polling(dp, skip_updates=True)

