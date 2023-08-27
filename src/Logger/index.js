const names = ['Пан Марод', 'Фелис', 'Хафф', 'Пан Драйд'];

const { codeBlock } = require('discord.js');
const isNan = require('lodash/isNan');

class Logger {
  log(message, interaction) {
    const bossLogs = message.split('\n').map((m) => this.parseString(m));

    if (bossLogs.some((bossLog) => !bossLog)) {
      interaction.reply(codeBlock('Не знаю таких'));
      interaction.react('❌');
      return;
    }

    interaction.reply(
      codeBlock(
        bossLogs
          .map(
            (bossLog) => `Босс ${bossLog.bossName} убит в ${bossLog.bossTime}`
          )
          .join('\n')
      )
    );
    interaction.react('✅');
  }

  parseString(message) {
    const messageArgs = message.split(' ');
    let bossName, bossTime, bossDate, bossDeadTime;

    if (isNan(parseInt(messageArgs[1]))) {
      bossName = messageArgs.slice(0, 2).join(' ');
      bossTime = messageArgs[2];
      bossDate = messageArgs[3];
    } else {
      bossName = messageArgs[0];
      bossTime = messageArgs[1];
      bossDate = messageArgs[2];
    }

    if (
      names.filter((name) =>
        name.toLowerCase().includes(bossName.toLowerCase())
      ).length !== 1
    )
      return null;

    if (!bossTime) bossDeadTime = new Date();
    else {
      bossDeadTime = new Date();

      const timeArgs = bossTime.split(':');

      bossDeadTime.setHours(parseInt(timeArgs[0]));
      bossDeadTime.setMinutes(parseInt(timeArgs[1]) || 0);
      bossDeadTime.setSeconds(parseInt(timeArgs[2]) || 0);

      if (bossDate) {
        const dateArgs = bossDate.split('.');

        const day = parseInt(dateArgs[0]);
        const month = parseInt(dateArgs[1]) - 1;
        const year = parseInt(dateArgs[2]);

        bossDeadTime.setDate(day);
        bossDeadTime.setMonth(month || new Date().getMonth());
        bossDeadTime.setFullYear(year || new Date().getFullYear());
      }
    }

    return {
      bossName: names.find((name) =>
        name.toLowerCase().includes(bossName.toLowerCase())
      ),
      bossTime: bossDeadTime.toLocaleString('ru-RU', {
        timezone: 'Europe/Moscow',
      }),
    };
  }
}

module.exports = Logger;
