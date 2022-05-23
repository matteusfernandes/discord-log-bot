const { idMemberLogChannel } = require('../../config.json');

module.exports = async (client, member) => {
  const { nickname, user } = member;

  const msgText = `${nickname} deixou o Servidor! | ${user.username}#${user.discriminator}`;

  await client.channels.fetch(idMemberLogChannel)
    .then((channel) => channel.send(msgText));
};
