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
                ['Рассписание','Преподаватели']
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
            //force_reply: true,
        })
    }
}