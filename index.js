const discord = require("discord.js");
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(process.env.token);


client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
    
    client.user.setActivity(`met de derps`, { type: "PLAYING" });
 
});
   
 
client.on("message", async message => {
 
    if(message.author.bot) return;
 
    if(message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var command = messageArray[0];
 
    if (command === `${prefix}hallo`) {
 
        return message.channel.send("Hallo!!");
   
    }
   
    if (command === `${prefix}botinfo`) {
        // Embed wat we gaan laten tonen.
        var botEmbed = new discord.MessageEmbed()
            .setTitle("Botinfo")
            .setDescription("Hier zie je de info van de bot")
            .setColor("#ff0000")
            .addField("Naam bot", client.user.username)
            .addField("Gemaakt op", client.user.createdAt)
            .addField("Gemaakt door", "Chrinsieboyyy#3976")
            .addField("ID:", client.user.id)

            .setTimestamp()
            .setFooter('© 2020 Derps bot. Alle Rechten Voorbehouden.');
 
        // Terug sturen van het bericht
        return message.channel.send(botEmbed);
    }

    if (command === `${prefix}kick`) {
 
        const args = message.content.slice(prefix.length).split(/ +/);
 
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");
 
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");
 
        if (!args[1]) return message.reply("Geen gebruiker opgegeven.");
 
        if (!args[2]) return message.reply("Gelieve een redenen op te geven.");
 
        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
 
        var reason = args.slice(2).join(" ");
 
        if (!kickUser) return message.reply("Kan de gebruiker niet vinden.");
 
        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(kickUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);
 
        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${kickUser} kicken?`);
 
 
        message.channel.send(embedPrompt).then(async msg => {
 
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
 
            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {
 
            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');
 
            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });
 
 
            if (emoji === "✅") {
 
                msg.delete();
 
                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });
 
                message.reply(embed);
 
            } else if (emoji === "❌") {
 
                msg.delete();
 
                message.reply("Kick geanuleerd").then(m => m.delete(5000));
 
            }
 
        });
    }
 
 
    if (command === `${prefix}ban`) {
 
        const args = message.content.slice(prefix.length).split(/ +/);
 
        if (!args[1]) return message.reply("Geen gebruiker opgegeven.");
 
        if (!args[2]) return message.reply("Gelieve een redenen op te geven.");
 
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("sorry jij kan dit niet");
 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen perms");
 
        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
 
        var reason = args.slice(2).join(" ");
 
        if (!banUser) return message.reply("Kan de gebruiker niet vinden.");
 
        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Geband:** ${banUser} (${banUser.id})
            **Geband door:** ${message.author}
            **Redenen: ** ${reason}`);
 
        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${banUser} bannen?`);
 
 
        message.channel.send(embedPrompt).then(async msg => {
 
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
 
            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {
 
            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');
 
            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });
 
 
            if (emoji === "✅") {
 
                msg.delete();
 
               
                banUser.ban(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });
 
                message.reply(embed);
 
            } else if (emoji === "❌") {
 
                msg.delete();
 
                message.reply("Ban geanuleerd").then(m => m.delete(5000));
 
            }
 
        });
    }
 
// Emojis aan teksten kopellen.
async function promptMessage(message, author, time, reactions) {
    // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
    time *= 1000;
 
    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }
 
    // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
    // dan kunnen we een bericht terug sturen.
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
 
    // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
    // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}
});

// !avatar - Laat de profielfoto van een gebruiker zien.
// !botinfo - Laat alle informatie over de bot zien.
// !history - Laat je geschiedenis zien.
// !kerst - Laat zien hoelang het duurt totdat het kerst is.
// !leden - Geeft weer hoeveel leden er in de Discord server zitten.
// !ping - Laat de responstijd zien.
// !reclame - Laat zien tot wanneer je reclame cooldown duurt.
// !serverinfo - Laat alle info over de server zien.
// !whois - Laat alle informatie van een gebruiker zien.

// Informatie
// !doneer - Geeft informatie over het doneren.
// !help - Geeft informatie over de commands.
// !info - Alle linkjes van Jens.
// !youtube - Geeft info over Jens zijn kanaal.

// Minigames
// !dobbel - Gooi een dobbelsteen.
// !kopofmunt - Speel kop of munt tegen de bot.
// !rps - Speel steen, papier schaar tegen de bot.

// Muziek
// !play - Speel muziek af.
// !playing - Laat het nummer zien dat wordt afgespeeld.
// !queue - Laat de wachtrij voor nummers zien.
// !search - Zoek naar een nummer op YouTube.
// !skip - Vote om een nummer over te slaan.