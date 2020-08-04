if(process.env.NODE_ENV === "development"){
    require('dotenv').config();         //npm i dotenv
}
    
const app = require('./app');
const dbConnect = require('./database');

async function main () {
    try {
        await dbConnect(process.env.MONGODB_URI);
        await app.listen(process.env.PORT || 5000);
        console.log('Servidor en puerto ', process.env.PORT || 5000);

        // await app.listen(app.get('port'));
        // console.log('Servidor en puerto ', app.get('port'));
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

main();