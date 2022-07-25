const { MessageButton, MessageActionRow, MessageEmbed, Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
    run: async (client,message, args) => {
        const globPromise = promisify(glob);
            const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
        let embed = new MessageEmbed()
      .setColor(`2f3136`)
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            embed.addField(`${client.config.prefix}${properties.name}`, `${properties.description}`, true)
        }
    });
        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
  .setStyle('LINK')
  .setLabel('Invite me')
  .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))
      
message.member.send({embeds: [embed], components: [row]}).then(() => {
    message.reply (`:white_check_mark: **Done send help private check**`)
}).catch(() => {
    message.reply(`:rolling_eyes: **Open your dm to send help**`)
})

    },
};