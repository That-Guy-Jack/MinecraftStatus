//only change things here
const token = '<Bot Token>';//your discord bot token
const serverip ='<serverip>';//server ip e.g Play.ThatGuyJack.co.uk
const serverport = '25565';//Set to default port currently change this if yours differs
const serverimage = '<serverimage>;'//image for the embeded .status command
const serverurl = '<website address>';//Your web sites address 
const servername = '<Server Name>';//Your server name

//don't edit below unless you know what you are doing

//libs and other vars
const Discord = require('discord.js');
const util = require('minecraft-server-util');
const client = new Discord.Client();

//login
client.login(token);

//print in console when logged in
client.on('ready', () => {
    console.log("Logged in.");
});

//create  async msg thread to listen for .status
client.on('message', async message => {
    if(message.content.toLowerCase() === '.status')
	{
		console.log(".status");
		status(message);	
	}
});

//function for the embend with the pinger
function status(message){
	util.queryFull(serverip, { port: serverport, protocolVersion: 47})
    .then((response) => {
		console.log(response);
		let players = response.players.toString();
		if (response.players == "") {
    		response.players = "No one is Online : (";
		}
		var colorArray = ["#FF2D00", "#08FF00", "#FFFF00", "#00FFF3", "#005DFF", "#6800FF", "#EC00FF", "#FF0083"];
    	var randomItem = colorArray[Math.floor(Math.random()*colorArray.length)];
    		const StatusEmbed = new Discord.MessageEmbed()
				.setTitle(servername)
				.setURL(serverurl)
				.setThumbnail(serverimage)
				.addField(`Players Online`,`${response.onlinePlayers}`+ "/" + `${response.maxPlayers}`)
				.addField(`${response.version}`)
				.addField('Players:',`${response.players}`)
				.setColor(`${randomItem}`)
				.setTimestamp()

    	message.channel.send(StatusEmbed);
    })
    .catch((error) => {
        throw error;
	});	
}

//when bot is logged in set the bots status to the amount of players
client.on('ready', () => {
	setInterval(() => {
	util.status(serverip, { port: serverport, protocolVersion: 47})    
   .then((response) => {
		console.log(response);
        client.user.setActivity(`with ${response.onlinePlayers} players`);
    })
    .catch((error) => {
        throw error;
    });
    }, 15000);
});