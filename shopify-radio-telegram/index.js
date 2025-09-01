// Basic Node.js server for Shopify, Radio King, and Telegram bot integration

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

// Replace with your real tokens!
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // can be a group or user

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Shopify webhook endpoint
app.post('/webhook/shopify', async (req, res) => {
  // Customize based on your webhook event
  const { body } = req;
  const message = `Shopify event received:\n${JSON.stringify(body, null, 2)}`;
  await bot.sendMessage(TELEGRAM_CHAT_ID, message);
  res.status(200).send('Shopify webhook received');
});

// Radio King webhook endpoint (customize per their API)
app.post('/webhook/radioking', async (req, res) => {
  const { body } = req;
  const message = `Radio King event received:\n${JSON.stringify(body, null, 2)}`;
  await bot.sendMessage(TELEGRAM_CHAT_ID, message);
  res.status(200).send('Radio King webhook received');
});

// Telegram bot command example
bot.onText(/\/hello/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello from Shopify + RadioKing bot!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});