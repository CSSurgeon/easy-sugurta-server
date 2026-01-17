import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;
// Используем ESM синтаксис для создания бота
const bot = new TelegramBot(token, { polling: true });

const webAppUrl = 'https://CSSurgeon.github.io/easysugurta/'; 

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🚗 **EASY SUGURTA**\n\nРассчитайте ОСАГО онлайн за 2 минуты. Нажмите кнопку ниже:`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "💎 Оформить полис", web_app: { url: webAppUrl } }]
            ]
        }
    });
});

bot.on('web_app_data', async (msg) => {
    try {
        const data = JSON.parse(msg.web_app_data.data);
        await bot.sendMessage(msg.chat.id, `✅ **Расчет принят!**\n\n🚗 Машина: ${data.car}\n💰 Сумма: ${data.price}\n\nНаш менеджер свяжется с вами для оформления оплаты.`);
    } catch (e) {
        console.error('Ошибка обработки данных:', e);
    }
});

console.log("Бот EASY SUGURTA (ESM) запущен на Node 22...");
