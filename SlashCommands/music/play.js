const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
  name: "play",
  description: "Add a song to queue and plays it.",
  options: [
    {
      name: "song",
      description: "Song to search for or the link of the song.",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const songTitle = interaction.options.getString("song");

    if (!interaction.member.voice.channel)
      return interaction.followUp({
        content: ":no_entry_sign: **You must join a voice channel to use that!**",
      });
    if (interaction.guild.me.voice?.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
      return interaction.followUp({
        content: `:no_entry_sign: You must be listening in **${interaction.guild.me.voice.channel.name}** to use that!`
      })
    const queue = await player.createQueue(interaction.guild, {
      leaveOnEnd: true,
      leaveOnStop: true,
      metadata: {
        channel: interaction.channel,
        voice: interaction.member.voice.channel
      }
    });
    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({ content: `:rolling_eyes: **Couldn't join your voice channel!**` })
    }
    interaction.followUp({ content: `:watch: Searching ... (\`${songTitle}\`)`, fetchReply: true }).then(async m => {
      const searchResult = await player.search(songTitle, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
      if (!searchResult.tracks.length) return m.edit({ content: `**:mag: Not found.**` })
      m.edit({ content: `:notes: **${searchResult.tracks[0].title}** Added to **Queue** (${searchResult.tracks[0].duration})!` })
      searchResult.playlist
        ? queue.addTracks(searchResult.tracks)
        : queue.addTrack(searchResult.tracks[0]);

      if (!queue.playing) await queue.play();
    })
  },
};
