const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const Commander = require('./src/Commands');
const Logger = require('./src/Logger');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commander = new Commander();
const logger = new Logger();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (interaction) => {
  if (
    interaction.author.bot ||
    interaction.channelId !== process.env.LOGS_CHANNEL_ID
  )
    return;

  // command received
  if (interaction.content.startsWith('.')) {
    commander.execute(interaction.content.slice(1), interaction);
    return;
  }

  // log received
  logger.log(interaction.content, interaction);

  console.log('Message received! Message content: ' + interaction.content);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
