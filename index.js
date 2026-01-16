const TelegramBot = require('node-telegram-bot-api');

// Берем токен из Environment Variables на Render
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// Ссылка на твой GitHub Pages
const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/'; 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🚗 **EASYsugurta**\n\nОнлайн ОСАГО за 3 минуты. Нажмите кнопку ниже, чтобы начать расчет.`, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                [{ text: "💎 Оформить страховку", web_app: { url: webAppUrl } }]
            ],
            resize_keyboard: true
        }
    });
});

// Получаем данные после нажатия "Продолжить" в приложении
bot.on('web_app_data', async (msg) => {
    const data = JSON.parse(msg.web_app_data.data);
    const chatId = msg.chat.id;

    if (data.status === 'ready_to_pay') {
        await bot.sendMessage(chatId, `✅ **Расчет готов!**\n\n🚗 Авто: ${data.car}\n💰 Сумма: ${data.price}\n\nНажмите кнопку ниже для оплаты через Click или Payme:`, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Оплатить 192 000 сум", callback_data: "pay_now" }]
                ]
            }
        });
    }
});

console.log("Бот EASYsugurta запущен...");
