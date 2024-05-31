import tmi from 'tmi.js'
import { channel, token, rewardType, rewardRequired } from "../config.json"
import { reloadAll, currentVideo, showType, nextVideo } from "../commands.json"
import { getId } from './ytp.js'
import { curVideoURL, curVideoTitle } from './video';

const opts = {
    identity: { username: 'zero', password: token },
    channels: [ channel ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('redeem', onRedeemed )

client.connect();

const queue = []; // очередь зрителей
const adminQueue = []; // очередь стримера

let queueMusic = false;
let oldRewardType = '';
let nextTrigger = false;

// слушатель сообщений
function onMessageHandler (target, context, msg, self) {

    // ВНИМАНИЕ КОСТЫЛЬ!!!

    // убирает прикол, когда в один канал можно спамить ботами с разными токенами
    // в следствии чего, эта вся штука работает ТОЛЬКО если токен бота принадлежит тому каналу, на котором
    // бот работает. если токен мой, то и канал должен быть мой и т.д.
    if(client.username !== channel) return;

    if(queueMusic || rewardRequired == '0') {
        if (context.username === `${channel}`) {
            // добавляет музыку в очередь стримера
            if(getId(msg)) adminQueue.push(getId(msg))
    
        } else {
            // добавляет музыку в очередь зрителей
            if(getId(msg)) queue.push(getId(msg))
        }
        queueMusic = false;
    }

    // дебаг для насти, чтобы чинить на месте
    if((context.username === `${channel}` || context.username === `umbrellaissold`) && msg == reloadAll)
        window.location.reload()

    // команда, показывает трек, который сейчас играет
    if(msg == currentVideo) {
        if(!curVideoURL) return;
        client.say(channel, `${curVideoTitle} - ${curVideoURL}`)
    }

    // триггер следующего трека
    if((context.username === `${channel}` || context.username === `umbrellaissold`) && msg == nextVideo) {
        nextTrigger = !nextTrigger;
    }

    // команда, показывающая айдишник награды
    // нужен для конфига, чтобы знать, с чего брать ссылки для очереди треков
    if(msg == showType && oldRewardType !== '') {
        client.say(channel, oldRewardType)
    } oldRewardType = '';

}
// заглушка с доков, чтобы увидеть, что ботик работает
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
// слушает награды, в частности, нужна разве что для того,
// чтобы вывалить в чат тип (id-like) награды, который потом
// надо в конфиг вставить в поле rewardType
function onRedeemed(target, username, type) {

    // про костыль выше читай
    if(client.username !== channel) return;

    queueMusic = type === rewardType
    if(username == channel || username == 'umbrellaissold')
        oldRewardType = type;
}

export default { }
export { queue, adminQueue, nextTrigger }