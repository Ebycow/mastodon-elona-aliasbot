const Masto = require('mastodon');
import cron from 'node-cron';
import argv from 'argv';
import { ElonaNickName } from './aliasgen';
import * as conf from './conf';


const args = argv.option([
    {
        name: 'token',
        short: 't',
        type: 'string'
    },
    {
        name: 'api',
        short: 'a',
        type: 'string'
    },

]);


let access_token: string;

const tokenArg: string | undefined = args.run().options.token;

if(tokenArg !== undefined){
    access_token = tokenArg;

} else {
    if(conf.ACCESS_TOKEN !== undefined){
        access_token = conf.ACCESS_TOKEN;
        
    } else {
        throw new Error("src/confまたは引数からACCESS_TOKENの指定が必要(readmeを読め)");
        
    }
    
}


let api_url: string;

const apiArg: string | undefined = args.run().options.api;

if(apiArg !== undefined){
    api_url = apiArg;

} else {
    if(conf.API_URL !== undefined){
        api_url = conf.API_URL;
        
    } else {
        throw new Error("src/confまたは引数からAPI_URLの指定が必要(readmeを読め)");
        
    }
    
}



const n = new ElonaNickName();

const M = new Masto({
    access_token: access_token,
    api_url: api_url, // optional, defaults to https://mastodon.social/api/v1/

});

cron.schedule('*/30 * * * *', () => {
    M.post('statuses', {
        visibility: 'unlisted',
        status: n.reroll()[0],
    
    });

}, {
    timezone : "Asia/Tokyo"
});

console.log("こんにちにゃ！");
