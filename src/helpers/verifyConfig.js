const { MessageEmbed } = require('discord.js');
const utils = require('../utils');

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

module.exports = async (client) => {
  const config = utils.getConfig();

  if (config.isConfigured) {
    const message = configEmbed(config);
    utils.sendMsg(client, config.idBotChn, message);
    return;
  }

  return false;
  // Se false, Retorna mensagem de erro e fica spamando o privado dos admin
};