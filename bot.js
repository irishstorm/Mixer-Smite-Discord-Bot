const commando = require('discord.js-commando');
const bot = new commando.Client();
const token = 'YOUR_TOKEN_HERE';
const channelId = 000000000;

const Mixer = require('beam-client-node');
let mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());
let chatLog = [];

//  Mixer Api
mixerClient.request('GET', '/chats/' + channelId + '/history')
.then(res => {
    for (var i = 0; i < res.body.length; i++){
        if(res.body[i].message.message[0].text.includes("Most Recent Code")){
            let code = res.body[i].user_name + " - " + res.body[i].message.message[0].text;
            chatLog.push(code);
            console.log(code);
        }
    }
})
.catch(error => {
    console.error(error);
});

bot.on('message', message => {
    if (message.content === '!code') {
        for (var i = 0; i < chatLog.length; i++){
            if(chatLog[i] != null ){
                message.channel.send(chatLog[i]);
                console.log("Mixer.com : " + chatLog[i]);
            }
        }
    }
});


bot.login(token);
