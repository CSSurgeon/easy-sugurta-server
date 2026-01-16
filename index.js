const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/'; 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🚗 **EASYsugurta** — Страхование в один клик.`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📝 Оформить ОСАГО", web_app: { url: webAppUrl } }]
            ]
        }
    });
});

bot.on('web_app_data', async (msg) => {
    const data = JSON.parse(msg.web_app_data.data);
    await bot.sendMessage(msg.chat.id, `✅ **Расчет принят!**\n\n🚗 Авто: ${data.car}\n💰 К оплате: ${data.price}\n\nНаш менеджер свяжется с вами для завершения оплаты.`);
});
