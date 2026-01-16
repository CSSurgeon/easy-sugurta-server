import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// --- TELEGRAM BOT ---
const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN not set');
} else {
  const bot = new TelegramBot(token, { polling: true });

  bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Бот работает ✅');
  });

  console.log('Бот запущен и готов к работе!');
}
;
