import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

const token = process.env.BOT_TOKEN;
const app = express();
app.use(express.json());

// Render сам дает PORT
const PORT = process.env.PORT || 10000;

// URL твоего сервиса на Render
const RENDER_URL = 'https://easy-sugurta-server.onrender.com';

// Telegram Bot БЕЗ polling
const bot = new TelegramBot(token);

// Webhook путь
const WEBHOOK_PATH = `/bot${token}`;
const WEBHOOK_URL = `${RENDER_URL}${WEBHOOK_PATH}`;

// Устанавливаем webhook
await bot.setWebHook(WEBHOOK_URL);

// Endpoint для Telegram
app.post(WEBHOOK_PATH, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Команда /start
const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/';

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    '🚗 *EASY SUGURTA*\n\nРассчитайте ОСАГО онлайн за 2 минуты',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '💎 Оформить полис', web_app: { url: webAppUrl } }]
        ]
      }
    }
  );
});

// Данные из Mini App
bot.on('web_app_data', async (msg) => {
  try {
    const data = JSON.parse(msg.web_app_data.data);
    await bot.sendMessage(
      msg.chat.id,
      `✅ *Расчёт принят!*\n\n🚗 Машина: ${data.car}\n💰 Сумма: ${data.price}\n\nМенеджер свяжется с вами.`,
      { parse_mode: 'Markdown' }
    );
  } catch (e) {
    console.error('Ошибка web_app_data:', e);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log('🚀 EASY SUGURTA BOT запущен (Webhook)');
});
