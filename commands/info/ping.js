const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: `Test the bots response time.`,
    aliases: [],
    run: async (client, message, args) => {
        message.reply({content:`:ping_pong: **Pong ${client.ws.ping} ms**` , ephemeral:true});
    },
};