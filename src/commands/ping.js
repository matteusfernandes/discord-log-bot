const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Client Ping!'),
  async execute(interaction) {
    const embedMessage = new Discord.MessageEmbed()
    .setDescription(`${interaction.client.ws.ping}ms`);

    await interaction.reply({ embeds: [embedMessage], ephemeral: true });
  },
};
