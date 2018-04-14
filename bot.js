//  ToDo:
//  Read in chatlog and push it to an array.
//  Find the code in the chatlog
//  take it out and store one instance in a variable
//  Push the code to an new array
//  check to make sure the code is not already added

const commando = require('discord.js-commando');
const bot = new commando.Client({ unknownCommandResponse: false });
const Mixer = require('beam-client-node');
const mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());

//   process.env.BOT_TOKEN - Heroku
let token = process.env.BOT_TOKEN;
let channelId = 19088261;  //SmiteGame 19088261
let chatMessages = [];
let codeList = [];
codePrefex = ["APMCB", "APMCW", "APYSC"];

bot.login(token);

var guild;
var channel;

bot.on('ready', function () {
    var guilds = bot.guilds;

    guilds.forEach(function (g) {
        guild = g;
    });
    //  Discord channel id
    channel = guild.channels.get("431071036247638016");
});

bot.on('message', message => {
    if (message.content === '!code') {  
        message.channel.send("/claimpromotion " + codeList[codeList.length - 1]);
    }
    
    if (message.content === '!allcodes') {  
        for (var i = 0; i < codeList.length; i++){
            message.channel.send(codeList[i] + " ");
        }
    }
    
    if (message.content === '!clear') {
        codeList.length = 0;
        message.channel.send("All codes have been cleared! " + codeList.length);
    }
    
});

setInterval(getChatMessages, 10000);

function getChatMessages(){
    mixerClient.request('GET', '/chats/' + channelId + '/history')
    .then(res => {
        for (var i = 0; i < res.body.length; i++){
            chatMessages.push(res.body[i].message.message[0].text);
        }
        findCode(chatMessages);
    })
    .catch(error => { console.error(error); });
}

function findCode(arrayObj){
    arrayObj.map((res) => {
        for (var i = 0; i < codePrefex.length; i++){
            if(res.includes(codePrefex[i])){
                let temp = res.slice(res.indexOf(codePrefex[i]), res.indexOf(codePrefex[i]) + 17);
                if(!codeList.includes(temp)){
                    codeList.push(temp);
                    channel.send("/claimpromotion " + temp);
                }
            }
        }
    });
}
