const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: {
        autoStart: true,
        params: { timeout: 10 }
    }
});

const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/';

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        '👋 Добро пожаловать в EASY SUGURTA\n\nОформите ОСАГО онлайн',
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🚀 Начать расчёт', web_app: { url: webAppUrl } }]
                ]
            }
        }
    );
});

bot.on('web_app_data', (msg) => {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(
        msg.chat.id,
        `✅ Заявка принята!\n\n🚗 Авто: ${data.car}\n💰 Сумма: ${data.price} сум\n\nНаш специалист свяжется с вами.`
    );
});
