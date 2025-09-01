const express = require('express');
const bodyParser = require('body-parser');
const shopifyHandler = require('./handlers/shopify');
const radiokingHandler = require('./handlers/radioking');
const telegramHandler = require('./handlers/telegram');
const azuracastHandler = require('./handlers/azuracast');
const supabaseHandler = require('./handlers/supabase');

const app = express();
app.use(bodyParser.json());

// Shopify webhook
app.post('/webhook/shopify', shopifyHandler);

// Radio King webhook
app.post('/webhook/radioking', radiokingHandler);

// Telegram bot endpoint (for commands, webhook style)
app.post('/webhook/telegram', telegramHandler);

// AzuraCast placeholder webhook
app.post('/webhook/azuracast', azuracastHandler);

// Supabase placeholder endpoint
app.post('/api/supabase', supabaseHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Integration server running on port ${PORT}`);
});