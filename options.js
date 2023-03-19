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
    },
    TeacherListKeyboard:{
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'МИХАЙЛОВА ГАЛИНА ВАЛЕНТИНОВНА', callback_data: 'МИХАЙЛОВА ГАЛИНА ВАЛЕНТИНОВНА'}],
                [{text: 'ШМАТКОВ СЕРГЕЙ АНАТОЛЬЕВИЧ', callback_data: 'ШМАТКОВ СЕРГЕЙ АНАТОЛЬЕВИЧ'}],
                [{text: 'БАШУКОВА ЛАРИСА ВАЛЕРЬЕВНА', callback_data: 'БАШУКОВА ЛАРИСА ВАЛЕРЬЕВНА'}],
                [{text: 'ГЕТАЛОВА ВИКТОРИЯ ВИТАЛЬЕВНА', callback_data: 'ГЕТАЛОВА ВИКТОРИЯ ВИТАЛЬЕВНА'}],
                [{text: 'КОЗЛОВА МАРИНА ЮРЬЕВНА', callback_data: 'КОЗЛОВА МАРИНА ЮРЬЕВНА'}],
                [{text: 'ВОЛОКИТИН СЕРГЕЙ ВИКТОРОВИЧ', callback_data: 'ВОЛОКИТИН СЕРГЕЙ ВИКТОРОВИЧ'}],
                [{text: 'КУЛЕШ АЛЬБИНА ФЛЮРОВНА', callback_data: 'КУЛЕШ АЛЬБИНА ФЛЮРОВНА'}],
                [{text: 'СИМОНОВА ТАТЬЯНА ВАСИЛЬЕВНА', callback_data: 'СИМОНОВА ТАТЬЯНА ВАСИЛЬЕВНА'}],
                [{text: 'ГРИШИНА СВЕТЛАНА АНАТОЛЬЕВНА', callback_data: 'ГРИШИНА СВЕТЛАНА АНАТОЛЬЕВНА'}],
                [{text: 'АХМЕТЗЯНОВА ЕЛЕНА МИХАЙЛОВНА', callback_data: 'АХМЕТЗЯНОВА ЕЛЕНА МИХАЙЛОВНА'}],
                [{text: 'СИДОРОВА ВЕРА ВЛАДИМИРОВНА', callback_data: 'СИДОРОВА ВЕРА ВЛАДИМИРОВНА'}],
                [{text: 'БОБРОВСКИХ ЕВГЕНИЙ ВИКТОРОВИЧ', callback_data: 'БОБРОВСКИХ ЕВГЕНИЙ ВИКТОРОВИЧ'}],
                [{text: 'ВЕРХОТУРЦЕВ ВЯЧЕСЛАВ СЕРГЕЕВИЧ', callback_data: 'ВЕРХОТУРЦЕВ ВЯЧЕСЛАВ СЕРГЕЕВИЧ'}],
            ]
        })
    }
}