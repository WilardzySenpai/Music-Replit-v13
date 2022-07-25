const player = require("../../client/player");

module.exports = {
    name: "stop",
    description: "Stop the current song and clears the entire music queue.",
    run: async (client, interaction) => {
                if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: ":no_entry_sign: **You must join a voice channel to use that!**",
            });
if (!interaction.guild.me.voice.channel)
            return interaction.followUp({
                content: ":notes: **The player has stopped and the queue has been cleared.**",
            });
        if (interaction.guild.me.voice?.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
            return interaction.followUp({
                content: `:no_entry_sign: You must be listening in **${interaction.guild.me.voice.channel.name}** to use that!`
            })
        const queue = player.getQueue(interaction.guildId);

        queue.stop();

        return interaction.followUp({ content: ":notes: **The player has stopped and the queue has been cleared.**" });
    },
};
