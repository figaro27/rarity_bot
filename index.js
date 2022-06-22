const eris = require('eris');
const tiers = require('./ss_tier.json');
require('dotenv').config();
const PREFIX = '$rank';
const CHANNEL = 'samurais-ranking';

// Create a Client instance with our bot token.
const bot = new eris.Client(process.env.CLIENT_TOKEN);

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
  const content = msg.content;
  const channel = msg.channel.name;
  if(content.startsWith(PREFIX) && channel === CHANNEL) {
    const parts = content.split(' ').map(s => s.trim()).filter(s => s);
    const tier = tiers.find(_tier => _tier.id.toString() === parts[1]);
    let text = `__**ShogunSamurai**: #${parts[1]}__\n`;
    text += ` **Rank**: ${tier.rank} / 7470\n`;
    text += ` **Tier**: ${tier.tier}`;

    try {
        await msg.channel.createMessage(text);
    } catch (err) {
        // There are various reasons why sending a message may fail.
        // The API might time out or choke and return a 5xx status,
        // or the bot may not have permission to send the
        // message (403 status).
        console.warn('Failed to respond to mention.');
        console.warn(err);
    }
  }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();