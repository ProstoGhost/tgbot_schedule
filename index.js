const rp = require('request-promise');
const Cheerio = require('cheerio');
const ENV = require('dotenv').config();
const TelegramAPI = require('node-telegram-bot-api');

const Group = require('./schedule.json');
const {Weekoptions} = require('./options')


const bot = new TelegramAPI(process.env.TOKEN,{polling: true})

//let day = 3; //указываем день
//let gruppa = 'АТ-43-22' //указываем группу для которой нужно узнать рассписание
let gruppa

//let url = Group[grupa]

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: "Приветствие"},
    {command: '/info', description: "Инфа о боте"},
  ])

  console.log('Bot is ready!')

  bot.on('error',()=>{
    console.error('Обнаружена критическая ошибка!!!');
  })


  bot.on("message", async msg =>{

    const text = msg.text;
    const chatId = msg.chat.id;
    const msgid = msg.message_id;

    if(text === '/start'){
      return bot.sendMessage(chatId, `Данный бот выдаёт расписание вашей группы и конкретного дня`)
    }
    if(text === '/info'){
      return bot.sendMessage(chatId, `Напишите в сообщении название вашей группы(Заглавными буквами) и выберите день`)
    }
    if(Group[text]){
      try{
        gruppa = Group[text]
        return bot.sendMessage(chatId, `Выберете день недели`, Weekoptions);
      }catch(err){
        console.log(err)}
    }
    if(!Group[text]){
      return bot.sendMessage(chatId, `Группа не найдена, проверьте корректно ли указано название, пример - АТ-43-22`)
    }
    else{
      bot.sendMessage(chatId, 'Я не совсем понял что ты хочешь от меня')
    }
  })
  bot.on('callback_query', async msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const msgid = msg.message.message_id;

/*     if(typeof uri === 'undefined'){
      console.error('Undefined is not a valid uri or options object.')
    }
 */
    rp(gruppa)
    .then(function(html){
      //Получилось!
    const $ = Cheerio.load(html)

    function normalizeWS(s) {
      s = s.match(/\S+/g);
      return s ? s.join(' ') : '';
    }
    //чистим от пробелов

    function DurationOfThePair(time){
      let curtime = time
      let minute;
      let hour;
      let endtime;
      if(curtime.length === 5){
        hour = curtime[0] + curtime[1];
        minute = curtime[3] + curtime[4];
      }
      else{
        hour = curtime[0];
        minute = curtime[2] + curtime[3];
      };
      let NumberMinute = Number(minute) + 30;
      let NumberHour = Number(hour);
      if(NumberMinute>=60){
        NumberHour = NumberHour + 1;
        NumberMinute = NumberMinute - 60;
      }
      if(NumberMinute === 0 || NumberMinute === 5){
        minute = `0` + String(NumberMinute);
        endtime = NumberHour + `:` + minute;
      }
      else{
        endtime = NumberHour + ":" + NumberMinute;
      }
      return endtime;
    }

    let divDAY = data * 2
    let h2DAY = divDAY - 1
    let arraypara = []
    let schedule = []

    let DayOfTheWeek = normalizeWS($(`div.news-list > h2:nth-child(${h2DAY})`, html).text())
    //запрос названия дня h2 должен быть не чётным 1 - понедельник

    let arrayLen = normalizeWS($(`div:nth-child(${divDAY}) > table > tbody > tr:last > td:first`, html).text())
    // узнаём колличество пар в день

    for(let i = 1; i-1 < arrayLen; i++){
      //запрашиваем по одному предмету в день
      let para = i + `. `
      for(let k = 2; k < 6; k++){
        //запрашиваем каждый элемент предмета - номер пары, кто ведёт, что ведёт и когда
        let paraDAY = $(`div:nth-child(${divDAY}) > table > tbody > tr:nth-child(${i}) > td:nth-child(${k})`, html).text();
        k === 2 ? para = para + normalizeWS(paraDAY) + ` - ` + DurationOfThePair(normalizeWS(paraDAY)) + `\n` : 
        k === 5 ? para = para + `\n` + normalizeWS(paraDAY) + `\n` : para = para + normalizeWS(paraDAY) + ` `;
        // переносим имя препода на новую строку

      }
      //arraypara[i-1] = normalizeWS(para)
      arraypara[i-1] = para
      //console.log(para.length)
    }
    

    arraypara.unshift(DayOfTheWeek)

    for(let v = 0; v < arraypara.length; v++){
      schedule += arraypara[v] + `\n`
    }
    // преобразовываем массив в текст

    bot.sendMessage(chatId, schedule, {parse_mode: 'HTML'})

    let array2 = $('div:nth-child(6) > table > tbody > tr:nth-child(1) > td', html).text()
      // tr - регулирует номер пары по порядку
      // div - отвечает за день и должен быть чётным начиная с 2

    })
    .catch(function(err){
      console.log(err)
      //ошибка
    });

  });
  bot.on('error',()=>{
    console.error('Обнаружена критическая ошибка!!!');
  })
}
start()