const { Permissions } = require('discord.js');

module.exports = async (guild) => {
  const channelCreate = await guild.channels.create('bot-messages', {
    type: 'GUILD_TEXT',
    permissionOverwrites: [
      {
        id: guild.id,
        deny: [Permissions.FLAGS.VIEW_CHANNEL],
      },
    ],
  });

  return channelCreate;
};