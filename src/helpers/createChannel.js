const { Permissions } = require('discord.js');

const FLAGS = [
  Permissions.FLAGS.ADMINISTRATOR,
];

module.exports = async (guild) => {
  const channelCreate = await guild.channels.create('bot-messages', {
    type: 'GUILD_TEXT',
    permissionOverwrites: [
      {
        id: guild.id,
        allow: new Permissions(FLAGS),
      },
    ],
  });

  return channelCreate;
};