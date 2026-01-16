import express from "express";
import TelegramBot from "node-telegram-bot-api";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 10000;

// ⚠️ ВАЖНО: замени на свой render URL
const WEBHOOK_URL = "https://api.render.com/deploy/srv-d5l760er433s73f1rv0g?key=I3iplVoYjLU";

// Mini App URL (GitHub Pages)
const webAppUrl = "https://CSSurgeon.github.io/easysugurta/";

const bot = new TelegramBot(TOKEN);

// Устанавливаем webhook
bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

// webhook endpoint
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Добро пожаловать в *EASY SUGURTA*!\n\nОформите ОСАГО онлайн за пару минут.`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Начать расчет",
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    }
  );
});

// данные из Mini App
bot.on("web_app_data", (msg) => {
  try {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(
      msg.chat.id,
      `✅ Данные получены!\n🚗 Авто: ${data.car}\n💰 Сумма: ${data.price} сум\n\n📞 С вами свяжется специалист.`
    );
  } catch (e) {
    bot.sendMessage(msg.chat.id, "❌ Ошибка данных");
  }
});

// express server
app.get("/", (req, res) => {
  res.send("Easy Sugurta Bot is running ✅");
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
