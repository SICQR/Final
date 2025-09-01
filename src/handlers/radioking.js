const TelegramBot = require('node-telegram-bot-api');
const { formatRadioKingMessage } = require('../utils/format');
const { logEvent } = require('../utils/logger');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

module.exports = async (req, res) => {
  logEvent('RadioKing', req.body);
  const message = formatRadioKingMessage(req.body);
  await bot.sendMessage(TELEGRAM_CHAT_ID, message);
  res.status(200).send('Radio King webhook handled');
};