const commando = require('discord.js-commando');
const bot = new commando.Client({ unknownCommandResponse: false });
const Mixer = require('beam-client-node');
const mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());

//   process.env.BOT_TOKEN
let token = process.env.BOT_TOKEN;
let channelId = 19088261;  //SmiteGame
let chatMessages = [];
let codeList = [];

bot.login(token);

//  ToDo:
//  Read in chatlog and push it to an array.
//  Find the code in the chatlog
//  take it out and store one instance in a variable
//  Push the code to an new array
//  check to make sure the code is not already added
bot.on("ready", () => {
    getChatMessages();
})

bot.on('message', message => {
    if (message.content === '!allcodes') {  
        getChatMessages();
        for (var i = 0; i < codeList.length; i++){
            message.channel.send("/claimpromotion " + codeList[i]);
        }
    }
});

bot.on('message', message => {
    if (message.content === '!allcodes') {  
        getChatMessages();
        for (var i = 0; i < codeList.length; i++)
            message.channel.send(codeList[i] + " ");
    }
});

function getChatMessages(){
    mixerClient.request('GET', '/chats/' + channelId + '/history')
    .then(res => {
        for (var i = 0; i < res.body.length; i++){
            chatMessages.push(res.body[i].message.message[0].text);
        }
        findCodes(chatMessages);
    });
}

function findCodes(arrayObj){
    arrayObj.map((res) => {
        if(res.includes("APMCB")){
            let temp = res.slice(res.indexOf("APMCB"), res.indexOf("APMCB") + 17);
            if(!codeList.includes(temp))
                codeList.push(temp);
        }
        else if(res.includes("APMCW")){
            let temp = res.slice(res.indexOf("APMCW"), res.indexOf("APMCW") + 17);
            if(!codeList.includes(temp))
                codeList.push(temp);
        }
        else if(res.includes("APYSC")){
            let temp = res.slice(res.indexOf("APYSC"), res.indexOf("APYSC") + 17);
            if(!codeList.includes(temp))
                codeList.push(temp);
        }
    });
}
