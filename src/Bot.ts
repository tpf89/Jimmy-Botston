import { Client, Intents } from 'discord.js';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';
import message from './listeners/message';
import Credentials from './Credentials.json';

const token = Credentials.authToken;
console.log('Bot is starting...');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  })

ready(client);
interactionCreate(client);
message(client);

client.login(token);
//console.log(client); 