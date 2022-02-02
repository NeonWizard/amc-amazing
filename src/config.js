require('dotenv').config();

const config = {
  API_KEY: process.env.API_KEY,
  BOT_TOKEN: process.env.BOT_TOKEN,
  TEST_CHANNEL_ID: "938219521683124235",
  GUILD_ID: "898401193263513631",
}

if (!config.API_KEY || !config.BOT_TOKEN) {
  throw "API_KEY and BOT_TOKEN environment variables must be set!";
}

module.exports = config;
