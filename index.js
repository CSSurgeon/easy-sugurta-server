const TelegramBot = require('node-telegram-bot-api');

// Используем переменную окружения для токена
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// Твоя ссылка на GitHub Pages (обязательно включи её в настройках GitHub!)
const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/'; 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🚗 **EASYSUG'URTA**\n\nСтраховой полис ОСАГО онлайн за 3 минуты.`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📝 Оформить ОСАГО", web_app: { url: webAppUrl } }]
            ]
        }
    });
});

// Получение данных из Mini App
bot.on('web_app_data', async (msg) => {
    const data = JSON.parse(msg.web_app_data.data);
    const text = `✅ **Расчет готов!**\n\n🚗 Машина: ${data.car}\n💰 Сумма: ${data.price}\n\nНаш менеджер свяжется с вами для оплаты.`;
    
    await bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
});

console.log("Бот запущен и готов к работе!");
