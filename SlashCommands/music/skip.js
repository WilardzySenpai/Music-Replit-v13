const player = require("../../client/player");

module.exports = {
    name: "skip",
    description: "Skip the current song.",
    run: async (client, interaction, args) => {
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
                content: ":no_entry_sign: **There must be music playing to use that!**",
            });
        interaction.followUp({ content: `:notes: Skipped **${queue.current.title}**` });
        await queue.skip()
    },
};
