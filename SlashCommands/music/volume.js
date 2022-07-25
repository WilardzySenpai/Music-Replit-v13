const player = require("../../client/player");

module.exports = {
    name: "volume",
    description: "change or check the volume of the current song",
    options: [
        {
            name: "amount",
            description: "Changes/Shows the current volume.",
            type: "INTEGER",
            required: false,
        },
    ],
    run: async (client, interaction) => {
                if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: ":no_entry_sign: **You must join a voice channel to use that!**",
            });
        if (interaction.guild.me.voice?.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
            return interaction.followUp({
                content: `:no_entry_sign: You must be listening in **${interaction.guild.me.voice.channel.name}** to use that!`
            })
        const volumePercentage = interaction.options.getInteger("amount");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: ":no_entry_sign: **There must be music playing to use that!**",
            });

        if (!volumePercentage)
            return interaction.followUp({
                content: `**Volume: \`${queue.volume}\`**`,
            });

        if (volumePercentage < 0 || volumePercentage > 150)
            return interaction.followUp({
                content: ":no_entry_sign: **Volume must be a valid integer between 0 and 150!**",
            });
        interaction.followUp({
            content: `:loud_sound: **Volume changed from \`${queue.volume}\` to \`${volumePercentage}\`**`,
        });
        queue.setVolume(volumePercentage);
    },
};
