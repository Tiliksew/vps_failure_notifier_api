
var cron = require('node-cron');

cron.schedule('0 * * * *', () => {
    console.log('This task runs every hour');
  });

// cron.schedule('*/1 * * * * *', async() => {
//     console.log('This task runs every second');
//     await TestTheVps()

//   });

//   cron.schedule('*/3 * * * * *', async() => {
//     console.log('This task runs every 15 seconds');
//     await TestTheVps()

//   });

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const server = http.createServer(app);


const port = process.env.PORT || 5001;
const helpers = require("./helpers");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
});

app.use('/call', async (req, res,next) => {

    await theTester(req,res,next);
    
});

// app.use('*', endpointNotFoundError);
// app.use(errorHandler);
async function  theTester(req,res,next){
    let testResult = await helpers.callAnEndPointToVps()
    console.log('the vps result is ',testResult);
    if(testResult){
        res.status(200).json({ message: 'No Errors Found Mr,Tilik' });

    }
    else{

        
            let currentDate = new Date();
            let theTime = currentDate.toLocaleTimeString();
            let theDate =currentDate.toDateString();
        
            let smsMessageBody = `Hey Dev Tilik, The VPS stops working.\nDate: ${theDate}\nTime: ${theTime}`;
            await helpers.sendSms('251919298457',smsMessageBody,next);
            res.status(200).json({ message: 'Succesfully Notified Mr,Tiliksew' });
    }
}

async function  TestTheVps(){
    let testResult = await helpers.callAnEndPointToVps()
    console.log('the vps result is ',testResult);
    if(testResult){
        console.log({ message: 'No Errors Found Mr,Tilik' });
    }
    else{
        console.log({ message: 'Errors Found Mr,Tilik' });

            let currentDate = new Date();
            let theTime = currentDate.toLocaleTimeString();
            let theDate =currentDate.toDateString();
            let smsMessageBody = `Hey Dev Tilik, The VPS stops working.\nDate: ${theDate}\nTime: ${theTime}`;
            await helpers.sendSms('251919298457',smsMessageBody,null);
            console.log({ message: 'Succesfully Notified Mr,Tiliksew' });
    }
}
            server.listen(port, () => {
                console.log({ message: `Server running on port ${port}`, level: 'info' });
            });

module.exports = app;
