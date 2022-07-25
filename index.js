const express = require('express');
const app = express();
const chalk = require("chalk");

app.get('/', (req, res) => {
  res.send('Hello Express app!')
})
app.use('/ping', (req, res) => {
  res.send(new Date());
});
app.listen(3000, () => {
  console.log(chalk.red.bold('Express is ready.'))
});

const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
  allowedMentions: { repliedUser: false },
});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
require("./handler")(client);

client.login(process.env.TOKEN);