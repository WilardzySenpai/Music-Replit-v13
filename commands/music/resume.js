const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "Resumes the currently paused track.",
    run: async (client, message, args) => {
            if (!message.member.voice.channel)
            return message.reply({
                content: ":no_entry_sign: **You must join a voice channel to use that!**",
            });
        if (message.guild.me.voice?.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.reply({
                content: `:no_entry_sign: You must be listening in **${message.guild.me.voice.channel.name}** to use that!`
            })
        const queue = player.getQueue(message.guild.id);
        if (!queue?.playing)
            return message.reply({
                content: ":no_entry_sign: **There must be music playing to use that!**",
            });
        queue.setPaused(false);

        return message.reply({ content: `:notes: Resumed **${queue.current.title}**.` });
    },
};
