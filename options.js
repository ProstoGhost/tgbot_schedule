module.exports = {
    Weekoptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Понедельник', callback_data: '1'}],
                [{text: 'Вторник', callback_data: '2'}],
                [{text: 'Среда', callback_data: '3'}],
                [{text: 'Четверг', callback_data: '4'}],
                [{text: 'Пятница', callback_data: '5'}]
            ]
        })
    },
    LowwerKeyboard: {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Рассписание','Преподователи']
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
            //force_reply: true,
        })
    },
    TeacherList:{
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'ghtgh', callback_data: '6'}],
                [{text: 'ghtgh', callback_data: '7'}],
                [{text: 'ghtgh', callback_data: '8'}],
                [{text: 'ghtgh', callback_data: '9'}],
                [{text: 'ghtgh', callback_data: '10'}],
                [{text: 'ghtgh', callback_data: '11'}],
                [{text: 'ghtgh', callback_data: '12'}],
                [{text: 'ghtgh', callback_data: '13'}],
                [{text: 'ghtgh', callback_data: '14'}],
                [{text: 'ghtgh', callback_data: '15'}],
                [{text: 'ghtgh', callback_data: '16'}],
                [{text: 'ghtgh', callback_data: '17'}],
                [{text: 'ghtgh', callback_data: '18'}],
            ]
        })
    }
}