require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const utils = require('../utils');
const helpers = require('.');

const configEmbed = (configIds) => {
  const { botName, idBotChn, idMemberChn, idModChn, idMsgChn, iconUrl, thumbUrl } = configIds;

  return new MessageEmbed()
    .setTitle()
    .setColor('#42dced')
    .setTimestamp()
    .setFooter({ iconURL: iconUrl, text: 'Discord Log Bot' })
    .setThumbnail(thumbUrl)
    .setAuthor({
      name: botName,
      iconURL: thumbUrl,
    })
    .setFields(
      { name: 'Nome do Bot', value: botName },
      { name: 'Canal de Mensagens do Bot', value: `<#${idBotChn}>` },
      { name: 'Canal de Log de Entrada e Saída de Membros', value: `<#${idMemberChn}>` },
      { name: 'Canal de Log de Kick e Ban de membros', value: `<#${idModChn}>` },
      { name: 'Canal de Log de Mensagens', value: `<#${idMsgChn}>` },
    );
};

const missConfig = () => (
  new MessageEmbed()
    .setDescription('Ultilize o comando /config e configure o bot antes de usa-lo.')
);

module.exports = async (client) => {
  const config = await utils.getConfig();

  if (config.isConfigured) {
    const message = configEmbed(config);
    utils.sendMsg(client, config.idBotChn, message);
    return;
  }

  if (config.idBotChn) {
    const message = missConfig();
    utils.sendMsg(client, config.idBotChn, message);
    return;
  }

  const message = missConfig();
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const { id } = await helpers.createChn(guild);
  config.idBotChn = id;
  await utils.setConfig(config);
  utils.sendMsg(client, id, message);
};