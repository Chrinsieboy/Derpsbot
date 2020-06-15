const discord = require("discord.js");

module.exports.run = async(client, message, arguments) =>{

    return message.channel.send("Hallo!!");

}

module.exports.help = {
    name: "hallo"
}