const discord = require("discord.js");
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(process.env.token);

const activities_list = [
    "met de derps!", 
    "op de derpsserver", 
    "?help"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
    console.log(`${client.user.username} is online.`);
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

    // Geef een gebruiker een rol nadat hij/zij is gejoind / Welkomsbericht

bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find("name", "721347102113792125");
    if (!channel) console.log("Kan kanaal niet vinden");
 
    var joinMessage = new discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
       .setDescription(`Hoi ${member.user.username}, **Welkom in de server**, We wensen je een fijne tijd hier!`)
       .setColor("#ff0000")
       .setTimestamp()
       .setFooter("© 2020 Derps bot. Alle Rechten Voorbehouden.");
 
    channel.send(joinMessage);
 
    var role = member.guild.roles.find("name", "👤➨ Speler");
 
    if (!role) return;
 
    member.addRole(role);
 
 });
 
 // Vaarwelbericht
 
 bot.on("guildMemberRemove", member => {
 
    const channel = member.guild.channels.find("name", "721347102113792125");
    if (!channel) console.log("Kan kanaal niet vinden");
 
    var joinMessage = new discord.RichEmbed()
       .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
       .setDescription(`Tot ziens ${member.user.username}. Hopelijk zien we je snel weer terug!`)
       .setColor("#ff0000")
       .setTimestamp()
       .setFooter("© 2020 Derps bot. Alle Rechten Voorbehouden."); 
    channel.send(joinMessage);
 
 });

    if (command === `${prefix}help`) {
 
        return message.channel.send("Hallo!\n\nIedereen kan dit\n?hallo - Hallo!\n?botinfo\n\nStaff commands\n?kick - kick iemand\n?ban - ban iemand");
   
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
 
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Nope! Dat gaan we ff moet doen!`);
 
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Jammer dan. Je hebt geen perms!");
 
        if (!args[1]) return message.reply("Geen gebruiker binnengekregen. Let je wel op in de wiskunde les?");
 
        if (!args[2]) return message.reply("Wil je ook ff een reden op te geven.");
 
        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
 
        var reason = args.slice(2).join(" ");
 
        if (!kickUser) return message.reply("Kan de gebruiker niet vinden. Vervelend hè?");
 
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
            .setAuthor("Wil je ff binnen 30 sec reageren?")
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
 
        if (!args[1]) return message.reply("Geen gebruiker binnengekregen. Let je wel op in de wiskunde les?");
 
        if (!args[2]) return message.reply("Wil je ook ff een reden op te geven.");
 
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Nope! Dat gaan we ff moet doen!");
 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Jammer dan. Je hebt geen perms!");
 
        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
 
        var reason = args.slice(2).join(" ");
 
        if (!banUser) return message.reply("Kan de gebruiker niet vinden. Vervelend hè?");
 
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
            .setAuthor("Wil je ff binnen 30 sec reageren?")
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