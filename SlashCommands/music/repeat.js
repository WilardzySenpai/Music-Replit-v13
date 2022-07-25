const player = require("../../client/player");

module.exports = {
    name: "repeat",
    description: "Toggles the repeat mode.",
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
                content: ":no_entry_sign: **There must be music playing to use that!**",
            });
       if (queue.repeatMode == 0) {
        queue.setRepeatMode(1);
        interaction.followUp({ content: "Repeat Mode: **ON**" });
       } else {
        queue.setRepeatMode(0);
        interaction.followUp({ content: "Repeat Mode: **OFF**" });
       }
    },
};
