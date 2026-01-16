import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN не найден");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

app.use(express.json());
app.use(express.static("."));

bot.on("message", (msg) => {
  if (msg.text === "/start") {
    bot.sendMessage(
      msg.chat.id,
      "Добро пожаловать в EASYsugurta 🚗\nНажмите кнопку ниже",
      {
        reply_markup: {
          inline_keyboard: [[
            {
              text: "Оформить ОСАГО",
              web_app: { url: "https://cssurgeon.github.io/easy-sugurta-server/" }
            }
          ]]
        }
      }
    );
  }
});

bot.on("web_app_data", (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  bot.sendMessage(
    msg.chat.id,
    `🚘 Номер: ${data.car}\n💰 Сумма: ${data.price}\nСтатус: готово к оплате`
  );
});

app.listen(PORT, () => {
  console.log("✅ Сервер запущен на порту", PORT);
  console.log("🤖 Бот запущен и готов к работе!");
});
