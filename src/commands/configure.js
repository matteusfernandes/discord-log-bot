/* eslint-disable max-lines-per-function */
const { SlashCommandBuilder } = require('@discordjs/builders');
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

module.exports = {
  data: new SlashCommandBuilder()
    .setName('configure')
    .setDescription('Configura salas de logs.')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('Digite um nome para o Bot')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('bot')
        .setDescription('Digite o ID da sala onde o bot deve enviar mensagens')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('join_left')
        .setDescription('Digite o ID da sala para logs de ENTRADA/SAÍDA de membros')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('mod')
        .setDescription('Digite o ID da sala para logs de KICK/BAN de membros')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('msg')
        .setDescription('Digite o ID da sala para logs de MENSAGENS de membros')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('icon')
        .setDescription('Digite a URL para o ícone do bot')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('thumb')
        .setDescription('Digite a URL para a thumbnail do bot')
        .setRequired(true)),

  async execute(interaction) {
    try {
      const { client } = interaction;

      const configData = {
        isConfigured: true,
        botName: await interaction.options.getString('name'),
        idBotChn: await interaction.options.getString('bot'),
        idMemberChn: await interaction.options.getString('join_left'),
        idModChn: await interaction.options.getString('mod'),
        idMsgChn: await interaction.options.getString('msg'),
        iconUrl: await interaction.options.getString('icon'),
        thumbUrl: await interaction.options.getString('thumb'),
      };

      await utils.sendMsg(client, configData.idBotChn, configEmbed(configData));
      await interaction.reply({ content: 'Configuração Registrada!', ephemeral: true });
    } catch (error) {
      await interaction.reply({
        content: 'Erro interno, tente novamente mais tarde!',
        ephemeral: true,
      });
      console.log(error);
    }
  },
};
