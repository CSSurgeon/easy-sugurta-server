import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

const token = process.env.BOT_TOKEN;
const app = express();
app.use(express.json());

// ПОРТ для Render
const PORT = process.env.PORT || 10000;

// Твои актуальные ссылки
const RENDER_URL = 'https://easy-sugurta-server.onrender.com';
const webAppUrl = 'https://cssurgeon.github.io/easy-sugurta-server/';

const bot = new TelegramBot(token);

// Настройка Webhook
const WEBHOOK_PATH = `/bot${token}`;
const WEBHOOK_URL = `${RENDER_URL}${WEBHOOK_PATH}`;

// Устанавливаем соединение с Telegram
await bot.setWebHook(WEBHOOK_URL);

app.post(WEBHOOK_PATH, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Команда /start - запрос авторизации (как на фото)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Добро пожаловать в **EASY SUGURTA**!\n\nДля продолжения работы, пожалуйста, подтвердите ваш номер телефона, нажав кнопку ниже.`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [
          [{ text: "🔑 Пройти авторизацию", request_contact: true }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    }
  );
});

// Обработка номера телефона и вывод главного меню
bot.on('contact', async (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  const firstName = msg.from.first_name;
  const username = msg.from.username ? `@${msg.from.username}` : 'не установлен';

  // Сообщение в стиле твоего скриншота
  const welcomeMessage = `Спасибо, ${firstName}! 🎉\n` +
                         `Ваш номер (${phoneNumber}) зарегистрирован. 📱\n` +
                         `Ваш юзернейм: ${username} 🔑\n\n` +
                         `Чем я могу помочь вам сегодня? 🙋‍♂️`;

  await bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      keyboard: [
        [{ text: "🆘 Страховой случай" }],
        [{ text: "💬 Консультация 24/7" }],
        [{ text: "🛒 Купить страховку" }],
        [{ text: "🔑 Пройти авторизацию", request_contact: true }]
      ],
      resize_keyboard: true
    }
  });
});

// Логика кнопки "Купить страховку" -> Появление кнопки для входа в Mini App
bot.on('message', async (msg) => {
  if (msg.text === "🛒 Купить страховку") {
    await bot.sendMessage(
      msg.chat.id,
      '🚗 *Оформить полис*\n\nНажмите кнопку ниже, чтобы перейти к расчету в приложении:',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '💎 Оформить полис', web_app: { url: webAppUrl } }]
          ]
        }
      }
    );
  }
});

// Обработка данных из Mini App (после нажатия кнопки "Продолжить")
bot.on('web_app_data', async (msg) => {
  try {
    const data = JSON.parse(msg.web_app_data.data);
    await bot.sendMessage(
      msg.chat.id,
      `✅ *Расчёт принят!*\n\n🚗 Машина: ${data.car}\n💰 Сумма: ${data.price}\n\nМенеджер свяжется с вами в ближайшее время.`,
      { parse_mode: 'Markdown' }
    );
  } catch (e) {
    console.error('Ошибка web_app_data:', e);
  }
});

app.listen(PORT, () => {
  console.log(`Бот запущен на порту ${PORT} через Webhook`);
});
