module.exports = {
    Weekoptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Понедельник', callback_data: '1'}],
                [{text: 'Вторник', callback_data: '2'}],
                [{text: 'Среда', callback_data: '3'}],
                [{text: 'Четверг', callback_data: '4'}],
                [{text: 'Пятника', callback_data: '5'}]
            ]
        })
    },
}