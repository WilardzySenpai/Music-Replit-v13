const client = require("../index");

client.on('ready', () => {
console.log(`${client.user.tag}`)
  client.user.setStatus("online")
    client.user.setActivity(`Type: ${client.config.slash}Play丨Prefix ${client.config.prefix}`, { type: 'LISTENING' })
});
