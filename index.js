const discord = require("discord.js");
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(botConfig.token);
 
let statuses = [`https://discord.gg/8HV9Ts`, `met de derps!`]


client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
 
    setInterval(function() {

        let status = statuses[Math.floor(Math.random()*statuses.length)]

        client.user.setPresence({ activity: { name: status }, status: `online`});

    }, 10000)
    
    // client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "LISTENING" });
 
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
     
    if (command === `${prefix}info`) {
 
        // Embed wat we gaan laten tonen.
        var botEmbed = new discord.MessageEmbed()
            .setTitle('Userinfo')
            .setDescription("Dit is alle informatie die we konden vinden over")
            .setColor("#ff0000")
            .addField("Bot naam", client.user.username)

            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        // Terug sturen van het bericht
        return message.channel.send(botEmbed);
    }

    if (command === `${prefix}serverinfo`) {

        var serverEmbed = new discord.MessageEmbed()
        .setDescription("**Serverinfo**")
        .setColor("#ff0000")
        .addField("Je bent deze server gejoind op", message.member.joinedAt)
        .addField("Totaal members", message.guild.memberCount);

    return message.channel.send(serverEmbed);
    }

	if (command === `${prefix}stats`) {
		return message.channel.send(`Server count: ${client.guilds.cache.size}`);
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