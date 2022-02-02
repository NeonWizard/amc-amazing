const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Replies with server info'),
  async execute(interaction) {
    interaction.reply({ content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}` })
  }
};