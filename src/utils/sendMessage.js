module.exports = async (client, id, messageToSend) => {
  await client.channels.fetch(id)
    .then((channel) => channel.send({ embeds: [messageToSend] }));
};
