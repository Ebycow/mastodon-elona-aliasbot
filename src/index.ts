import Masto from 'mastodon';
import { ElonaNickName } from './aliasgen';
import { ACCESS_TOKEN } from './conf';


const n = new ElonaNickName();

const M = new Masto({
    access_token: ACCESS_TOKEN,
    api_url: 'https://mstdn.jp/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
});

M.post('statuses', {
    visibility: 'unlisted',
    status: n.reroll()[0],

});
