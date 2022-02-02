const axios = require('axios');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');

const config = require('./config.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES ] });

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'))
const commands = []

// Creating a collection for commands in client
client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

// ---------------------------------------------------------------------------
// onReady
client.once('ready', () => {
  console.log('Ready!');

  // Registering the commands in the client
  const CLIENT_ID = client.user.id;
  const rest = new REST({
      version: '9'
  }).setToken(config.BOT_TOKEN);

  (async () => {
    try {
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, config.GUILD_ID), { body: commands });
      console.log('Successfully registered application commands.');
    } catch (error) {
      if (error) console.error(error);
    }
  })();
})

// ---------------------------------------------------------------------------
// onInteractionCreate
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    if (error) console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(config.BOT_TOKEN);
