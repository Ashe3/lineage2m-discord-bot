class Command {
  commands = [
    {
      command: 'test',
      method: this.testCommand,
    },
  ];

  execute(textCommand, interaction) {
    const command = this.commands.find((c) => c.command === textCommand);

    console.log(command);

    if (!command) {
      interaction.reply('Command not found!');
      interaction.react('❌');
      return;
    }

    command.method(interaction);
    interaction.react('✅');
  }

  testCommand(interaction) {
    interaction.reply('Test command received!');
  }
}

module.exports = Command;
