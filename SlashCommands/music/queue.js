const player = require("../../client/player");

module.exports = {
  name: "queue",
  description: "Display the queue of the current tracks in the playlist.",
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
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag
        }`;
    });

    return interaction.followUp({
      embeds: [
        {
          title: "Song Queue",
          description: `${tracks.join("\n")}${queue.tracks.length > tracks.length
              ? `\n...${queue.tracks.length - tracks.length === 1
                ? `${queue.tracks.length - tracks.length
                } more track`
                : `${queue.tracks.length - tracks.length
                } more tracks`
              }`
              : ""
            }`,
          color: "2f3136",
          fields: [
            {
              name: "Now Playing",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
            },
          ],
        },
      ],
    });
  },
};
