require('dotenv').config();

const { Client, Intents } = require('discord.js');

const myIntents = new Intents();

myIntents.add(
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_BANS,
);

const client = new Client({ intents: myIntents });

client.once('ready', () => {
  console.log(`Bot online: ${client.user.tag}!`);
});