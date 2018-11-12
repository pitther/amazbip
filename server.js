const TeleBot = require('telebot');
let token = "";
let bot = new TeleBot(token);


class Core{
    constructor(){

    }
    messageHandler(msg){
        setTimeout(function(){
            for (let i = 0; i < msg.text.length; i++){
                msg.text = msg.text.split('і').join('i');
                msg.text = msg.text.split('є').join('э');
                msg.text = msg.text.split('ї').join('i');
            }
            let input = msg.text;
            var len = 90;
            var curr = len;
            var prev = 0;

            let output = [];

            while (input[curr]) {
                if (input[curr++] == ' ') {
                    output.push(input.substring(prev,curr));
                    prev = curr;
                    curr += len;
                }
            }
            output.push(input.substr(prev));
            msg.text = output;
            let i = msg.text.length-1;
            let inv = setInterval(function(){
                bot.sendMessage(msg.chat.id, msg.text[i]);
                i--;
                if (i < 0){
                    clearInterval(inv);
                }
            }, 8000);
        }, 1000);
    }
}

let CORE = new Core();

bot.on('text', (msg) => {
    CORE.messageHandler(msg);
});

bot.start();
