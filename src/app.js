if(process.env.NODE_ENV === "development"){
    require('dotenv').config();         //npm i dotenv
}
//                                         //npm i nodemon -D
const express = require('express'); //npm i express
const cors = require('cors');        //npm i cors
const morgan = require('morgan');   //npm i morgan
const path = require('path');
const multer = require('multer');   //npm i multer
// const fs = require('fs'); 

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

const app = express();
// require('./database');


// // setting
// app.set('port', process.env.PORT || 5000)

// middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('photo'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
// app.use('^/$', async (req, res, next) => {          //PARA SERVER SIDE RENDERING
//     try {
//         console.log('hola')
//         const data = await fs.readFile(path.resolve('./public/index.html'), 'utf-8');
//         console.log('data: ', data);
//         res.send(data.replace(
//             '<div id="root"></div>', 
//             `<div id="root">${ReactDOMServer.renderToString()}</div>`
//             )
//         );
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error ocurrido');
//     }
// })
app.use('/api', require('./routes/routes'));


module.exports = app;
