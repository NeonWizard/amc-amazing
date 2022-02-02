const axios = require('axios');
const { Client, Intents } = require('discord.js');

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const config = {
  API_KEY: process.env.API_KEY,
  BOT_TOKEN: process.env.BOT_TOKEN,
  TEST_CHANNEL_ID: "938219521683124235"
}

if (!config.API_KEY || !config.BOT_TOKEN) {
  throw "API_KEY and BOT_TOKEN environment variables must be set!";
}

// ---------------------------------------------------------------------------

client.once('ready', () => {
  console.log('ready');
})

client.login(config.BOT_TOKEN);
