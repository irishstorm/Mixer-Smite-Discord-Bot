const commando = require('discord.js-commando');
const bot = new commando.Client({ unknownCommandResponse: false });
const Mixer = require('beam-client-node');
const mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());

//   process.env.BOT_TOKEN
let token = 'NDI4NDgxMDIwNTYwNTM5NjU4.DZztog.cFsvFdcetRXE36tE-CxwHT2eWOU';
let channelId = 19088261;  //SmiteGame
let lastCode = "Scraping chat for codes, This may take time. Try Again.";
let lastPoll = "No Active Polls, Try Again.";

bot.on("ready", () => {
    getMixerCodes();
    console.log(lastCode);
})

bot.on('message', message => {
    if (message.content === '!code') {  
        getMixerCodes();
        message.channel.send(lastCode);
    }
});

function getMixerCodes(){
    mixerClient.request('GET', '/chats/' + channelId + '/history')
    .then(res => {
        for (var i = 0; i < res.body.length; i++){
            if(res.body[i].message.message[0].text.includes("!command add !lastdrop Most Recent Code: "))
                FormatCode(res.body[i].message.message[0].text.slice(41, 58));
            else if(res.body[i].message.message[0].text.includes("Most Recent Code: "))
                FormatCode(res.body[i].message.message[0].text.slice(18, 47));
            else
                FormatCode(res.body[i].message.message[0].text);
        }
    })
    .catch(error => { console.error(error); });
}

function FormatCode(currentCode){
    if(currentCode.includes('APMCB'))
        lastCode =  "Blue Mixer Chest - " + currentCode;
    else if(currentCode.includes('APMCW'))
        lastCode =  "White Mixer Chest - " + currentCode;
    else if(currentCode.includes('APY'))
        lastCode =  "Odyssey 2018 Chest - " + currentCode;
}

bot.login(token);
