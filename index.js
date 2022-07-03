import fs from 'fs';
import expressHandlebars from 'express-handlebars';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

let app = express();

let secret = 'qwerty';
app.use(cookieParser(secret));
app.use(expressSession({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');



app.get('/', function(req, res) {
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    let num3 = req.query.num3;

    let resu = func(num1, num2, num3);


    let flag;
    if (num1 != '') {
        flag = true;
    }

    res.render('form', {
        fla: flag,
        day: resu
    })
})


function func(num1, num2, num3) {
    let obj = {
        'январь': 0,
        'февраль': 1,
        'март': 2,
        'апрель': 3,
        'май': 4,
        'июнь': 5,
        'июль': 6,
        'август': 7,
        'сентябрь': 8,
        'октябрь': 9,
        'ноябрь': 10,
        'декабрь': 11
    }

    let arr = ['воскресенье', 'суббота', 'пятница', 'четверг', 'среда', 'вторник', 'понедельник'];

    let d = +num1;
    let m = obj[num2];
    let y = +num3;
    let date = new Date(y, m, d);
    let day = date.getDay();

    let dn = arr[day];
    return dn
}












app.use((req, res) => {
    res.status(404).send('not found');
});

app.listen(3000, function() {
    console.log('running');
});

//end