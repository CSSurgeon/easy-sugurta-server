import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Настройки из переменных окружения Render
const token = process.env.8282187260:AAF2UJHLBYkFccp2UWK5vFPOCRyCzyGuB5M;
const ADMIN_ID = 123456789; // ЗАМЕНИ НА СВОЙ ID (узнай у @userinfobot)

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const RENDER_URL = 'https://easy-sugurta-server.onrender.com';
const webAppUrl = 'https://cssurgeon.github.io/easy-sugurta-server/';

const bot = new TelegramBot(token);
const WEBHOOK_PATH = `/bot${token}`;
const WEBHOOK_URL = `${RENDER_URL}${WEBHOOK_PATH}`;

// --- ИНИЦИАЛИЗАЦИЯ БАЗЫ ДАННЫХ ---
// Используем SQLite для хранения данных пользователей и их расчетов
const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      name TEXT, 
      username TEXT, 
      phone TEXT
    );
    CREATE TABLE IF NOT EXISTS calcs (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER, 
      car TEXT, 
      price TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
initDB();

// Устанавливаем Webhook
await bot.setWebHook(WEBHOOK_URL);

app.post(WEBHOOK_PATH, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// --- ЛОГИКА ПОЛЬЗОВАТЕЛЯ ---

// Старт - запрашиваем номер телефона (как на фото)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Добро пожаловать в **EASY SUGURTA**!\n\nДля продолжения работы подтвердите номер телефона.`, {
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: [[{ text: "🔑 Пройти авторизацию", request_contact: true }]],
      resize_keyboard: true, 
      one_time_keyboard: true
    }
  });
});

// Обработка контакта и сохранение в базу
bot.on('contact', async (msg) => {
  const { id } = msg.from;
  const { phone_number, first_name } = msg.contact;
  const username = msg.from.username ? `@${msg.from.username}` : 'Нет';

  const db = await dbPromise;
  await db.run("INSERT OR REPLACE INTO users (id, name, username, phone) VALUES (?, ?, ?, ?)", 
    [id, first_name, username, phone_number]);

  bot.sendMessage(msg.chat.id, `Спасибо, ${first_name}! 🎉\nВаш номер зарегистрирован.\nЧем я могу помочь?`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🆘 Страховой случай", callback_data: 'sos' }],
        [{ text: "💬 Консультация 24/7", callback_data: 'support' }],
        [{ text: "🛒 Купить страховку", web_app: { url: webAppUrl } }]
      ]
    }
  });
});

// --- АДМИН-ПАНЕЛЬ (Доступ только по ADMIN_ID) ---

bot.onText(/\/admin/, async (msg) => {
  if (msg.from.id !== ADMIN_ID) return;

  const db = await dbPromise;
  const userCount = await db.get("SELECT COUNT(*) as count FROM users");
  
  bot.sendMessage(msg.chat.id, `⚙️ **Админ-панель**\n\nВсего пользователей в базе: ${userCount.count}`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "👥 Последние пользователи", callback_data: 'admin_users' }],
        [{ text: "📊 Последние расчеты", callback_data: 'admin_calcs' }]
      ]
    }
  });
});

bot.on('callback_query', async (query) => {
  if (query.from.id !== ADMIN_ID) return;
  const db = await dbPromise;

  if (query.data === 'admin_users') {
    const users = await db.all("SELECT * FROM users ORDER BY id DESC LIMIT 10");
    let text = "👥 **Последние 10 пользователей:**\n\n";
    users.forEach(u => text += `👤 ${u.name} | ${u.username} | ${u.phone}\n`);
    bot.sendMessage(ADMIN_ID, text || "Пользователей пока нет.", { parse_mode: 'Markdown' });
  }

  if (query.data === 'admin_calcs') {
    const calcs = await db.all("SELECT * FROM calcs ORDER BY id DESC LIMIT 10");
    let text = "📊 **Последние расчеты:**\n\n";
    calcs.forEach(c => text += `🚗 ${c.car} — 💰 ${c.price}\n`);
    bot.sendMessage(ADMIN_ID, text || "Расчетов пока нет.", { parse_mode: 'Markdown' });
  }
});

// Обработка данных из Mini App (сохранение расчета)
bot.on('web_app_data', async (msg) => {
  try {
    const data = JSON.parse(msg.web_app_data.data);
    const db = await dbPromise;
    await db.run("INSERT INTO calcs (user_id, car, price) VALUES (?, ?, ?)", 
      [msg.from.id, data.car, data.price]);

    bot.sendMessage(msg.chat.id, `✅ *Расчёт принят!*\n\n🚗 Машина: ${data.car}\n💰 Сумма: ${data.price}\n\nМенеджер свяжется с вами в ближайшее время.`, { 
      parse_mode: 'Markdown' 
    });
  } catch (e) { 
    console.error('Ошибка обработки данных WebApp:', e); 
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
