/**
 * Created by julia on 02.10.2016.
 */
var i18nBean = require('../utility/i18nManager');
var t = i18nBean.getT();
var cmd = 'info';
var logger = require('../utility/logger');
var winston = logger.getT();
var AsciiTable = require('ascii-table');
var messageHelper = require('../utility/message');
var execute = function (message) {
    if (message.mentions.users.size > 0) {
        let user = message.mentions.users.first();
        message.guild.fetchMember(user).then(member => {
            let table = new AsciiTable();
            let WolkeBot = messageHelper.hasWolkeBot(message, member);
            table
                .addRow(t('server-info.id', {lngs: message.lang}), user.id)
                .addRow('WolkeBot', WolkeBot)
                .addRow(t('server-info.name', {lngs: message.lang}), user.username)
                .addRow('Avatar', user.avatarURL)
                .addRow(t('server-info.creation', {lngs: message.lang}), user.createdAt.toDateString())
                .addRow('Bot', user.bot);
            message.reply(`\n\`\`\`${table.toString()}\`\`\``);
        }).catch(err => winston.error(err));
    } else {
        if (message.guild) {
            let table = new AsciiTable();
            let textChannels = message.guild.channels.findAll('type', 'text').length;
            let voiceChannels = message.guild.channels.findAll('type', 'voice').length;
            table
                .addRow(t('server-info.id', {lngs: message.lang}), message.guild.id)
                .addRow(t('server-info.name', {lngs: message.lang}), message.guild.name)
                .addRow(t('server-info.member', {lngs: message.lang}), message.guild.memberCount)
                .addRow(t('server-info.text', {lngs: message.lang}), textChannels)
                .addRow(t('server-info.voice', {lngs: message.lang}), voiceChannels)
                .addRow(t('server-info.creation', {lngs: message.lang}), message.guild.createdAt.toDateString())
                .addRow(t('server-info.region', {lngs: message.lang}), message.guild.region)
                .addRow(t('server-info.owner', {lngs: message.lang}), `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
                .addRow(t('server-info.roles', {lngs: message.lang}), message.guild.roles.size);
            message.reply(`\n\`\`\`${table.toString()}\`\`\``);
        } else {
            message.reply(t('generic.no-pm', {lngs: message.lang}));
        }
    }
};
module.exports = {cmd: cmd, accessLevel: 0, exec: execute, cat: 'stats'};
//uwu