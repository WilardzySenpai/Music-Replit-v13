const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const Ascii = require('ascii-table');
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Commands
  const Table_command = new Ascii("Commands Loaded");

  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }

    if (!file.name)
      return Table_command.addRow(file.name, `🔶 Problem with(NAME)`)
    if (!file.description)
      return Table_command.addRow(file.name, `🔶 Erro in(DESCRIPTION)`)

    Table_command.addRow(file.name, `🔷 Loaded`)
  });

  console.log(Table_command.toString())

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands

  const Table_slash = new Ascii(`SlashCommands Loaded`)

  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);

    if (!file.name)
      return Table_slash.addRow(file.name, `🔶 Problem with(NAME)`)
    if (!file.description)
      return Table_slash.addRow(file.name, `🔶 Error in(DESCRIPTION)`)

    Table_slash.addRow(file.name, `🔷 Loaded`)
  });

  console.log(Table_slash.toString())
  client.on("ready", async () => {
    // Register for all the guilds the bot is in
    await client.application.commands.set(arrayOfSlashCommands);
  });

  // mongoose
  const { mongooseConnectionString } = require("../config.json");
  if (!mongooseConnectionString) return;

  mongoose
    .connect(mongooseConnectionString)
    .then(() => console.log("Connected to mongodb"));
};