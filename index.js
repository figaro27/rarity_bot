const eris = require('eris');
require('dotenv').config();
const PREFIX = '$SS_Rarity';

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
  if(content.startsWith(PREFIX) && channel === "rarity") {
    // msg.channel.send(`Thank you for your feedback ${msg.author.username}! It has been sent to the admins.`);
    // // two `s allows you to add an object in a string. To add the object, put it inside this -> ${}

    const parts = content.split(' ').map(s => s.trim()).filter(s => s);

    try {
        await msg.channel.createMessage('SS: ' +  parts[1]);
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