/* eslint-disable no-param-reassign */
const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = (client) => {
  client.commands = new Collection();
  const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.data.name, command);
  }
};
