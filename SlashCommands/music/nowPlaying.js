const player = require("../../client/player");

module.exports = {
    name: "now_playing",
    description: "Shows what is song that the bot is currently playing.",
    run: async (client, interaction) => {
                if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: ":no_entry_sign: **You must join a voice channel to use that!**",
            });
        if (interaction.guild.me.voice?.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
            return interaction.followUp({
                content: `:no_entry_sign: You must be listening in **${interaction.guild.me.voice.channel.name}** to use that!`
            })
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: ":x: **bot is not currently playing**",
            });
        return interaction.followUp({
            embeds: [
                { 
                    title: `${queue.current.title}`,
                    description: `:arrow_forward: ${queue.createProgressBar().split(' ')[2]}\`[${queue.createProgressBar().split(' ')[0]}/${queue.createProgressBar().split(' ')[4]}]\``,
                    color: "2f3136"
                }
            ]})
    },
};
