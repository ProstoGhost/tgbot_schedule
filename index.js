const rp = require('request-promise');
const Cheerio = require('cheerio');
const ENV = require('dotenv').config();
const TelegramAPI = require('node-telegram-bot-api');

const Group = require('./schedule.json');
const {Weekoptions, LowwerKeyboard, TeacherList} = require('./options')


const bot = new TelegramAPI(process.env.TOKEN,{polling: true})

//let day = 3; //указываем день
//let gruppa = 'АТ-43-22' //указываем группу для которой нужно узнать рассписание
let gruppa = {}
let CurrentTask = {}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: "Приветствие"},
    {command: '/info', description: "Инфа о боте"},
    {command: '/schedule', description: "Переход в режим поиска расписания"},
  ])

  console.log('Bot is ready!')

  bot.on('error',()=>{
    console.error('Обнаружена критическая ошибка!!!');
  })


  bot.on("message", async msg =>{

    const text = msg.text;
    const chatId = msg.chat.id;
    const msgid = msg.message_id;
    //CurrentTask[chatId] = 0

    if(text === '/start' & CurrentTask[chatId] == null){
      return bot.sendMessage(chatId, `Данный бот выдаёт расписание вашей группы`, LowwerKeyboard)
    }
    if(text === '/info' & CurrentTask[chatId] == null){
      return bot.sendMessage(chatId, `Напишите в сообщении название вашей группы(Заглавными буквами) и выберите день`)
    }
    if ((text === `/schedule`|| text === `Рассписание`) & CurrentTask[chatId] == null) {
      bot.sendMessage(chatId, `Напишите номер группы или "Отмена" для возврата в главное меню`);
      CurrentTask[chatId] = 1;
      return;
    }
    if ((text === `/teacher`|| text === `Преподователи`) & CurrentTask[chatId] == null) {
      bot.sendMessage(chatId, `Выберите преподователя чтобы узнать его почту или напишите "Отмена" для возврата в главное меню`, TeacherList);
      CurrentTask[chatId] = 2;
      return;
    }
    if (text.toLocaleLowerCase() === 'отмена' & CurrentTask[chatId] != null) {
      bot.sendMessage(chatId, 'Отмена поиска', LowwerKeyboard);
      CurrentTask[chatId] = null;
    }
    if(Group[text] != undefined & CurrentTask[chatId] == 1){
      try{
        gruppa[chatId] = Group[text]
        return bot.sendMessage(chatId, `Выберете день недели`, Weekoptions);
      }catch(err){
        console.log(err)
      }
    }
    if(Group[text] == undefined & CurrentTask[chatId] == 1){
      return bot.sendMessage(chatId, `Группа не найдена, проверьте корректно ли указано название, пример - ОП-13-37`)
    }
    if (text === `/test`) {
      //console.log('запрос получен, попытка обработки')
      bot.sendMessage(chatId, 'try new keyboard', LowwerKeyboard)
    }
/*     else{
      bot.sendMessage(chatId, 'Я не совсем понял что ты хочешь от меня')
    } */
  })
  bot.on('callback_query', async msg =>{
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const msgid = msg.message.message_id;

    try {
      rp(gruppa[chatId])

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
          if(NumberMinute < 10){
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
          arraypara[i-1] = para
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
      });
    }
    catch(error){
      bot.sendMessage(chatId, 'Пожалуйста, не используйте старый запрос расписания')
    }

  });
  bot.on('error',()=>{
    console.error('Обнаружена критическая ошибка!!!');
  })
}
start()