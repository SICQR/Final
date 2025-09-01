const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/hello/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello from your integration bot!');
});

module.exports = (req, res) => {
  // For webhook-based commands, if using webhook mode instead of polling
  // You can parse req.body and respond accordingly
  res.status(200).send('Telegram command received');
};