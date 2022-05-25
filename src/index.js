require('dotenv').config();

const { Client, Intents } = require('discord.js');
const scripts = require('./scripts');
const helpers = require('./helpers');
const deployCmd = require('./deployCommands');

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
let isConfigured = false;

client.once('ready', () => {
  console.log(`Bot online: ${client.user.tag}!`);
  deployCmd();
  helpers.setCmd(client);
  isConfigured = helpers.config(client);
});

if (isConfigured) {
  client.on('guildMemberRemove', async (member) => {
      await scripts.memberExit(client, member);
    });
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply(
      {
        content: 'There was an error while executing this command!',
        ephemeral: true,
      },
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
