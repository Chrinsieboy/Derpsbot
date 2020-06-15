const discord = require("discord.js");

module.exports.run = async(client, message, arguments) =>{

    var serverEmbed = new discord.MessageEmbed()
    .setDescription("Zet de beschrijving")
    .setColor("#kleur")
    .addField("Bot naam", client.user.username)
    .addField("Je bent deze server gejoind op", message.member.joinedAt)
    .addField("Totaal memebers", message.guild.memberCount);

return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo"
}