import { queue, adminQueue } from './bot.js'
import { usePlayer } from '@vue-youtube/core';

let curQueue = 0;
let curAdminQueue = 0;
let isPlaying = false;
let isAdminPlaying = false;
let adminCanPlay = true;
let opacityLerp = 0;
let adminTime = 0;

function videoPlayer(iframe, root) {
    const { instance, onStateChange, onReady } = usePlayer('', iframe, {
        playerVars: { autoplay: 1, controls: 0, cc_load_policy: 0 },
    });
    
    onReady((event) => { root.style.setProperty('--opacity', 0); })

    onStateChange((event) => {

        // data 0 - триггер, который срабатывает, когда плеер заканчивает играть видео
        if(event.data == '0') {

            // увиличивает значение стека в очереди и сбрасывает '*playing' триггеры
            if(isPlaying) { curQueue++; adminCanPlay = true; isPlaying = false; }

            if(isAdminPlaying) { curAdminQueue++; isAdminPlaying = false; }
            //
            
        }
    })
    
    setInterval(() => {
        // анимация появления плеера типо (костыль ;;)
        if(isPlaying || isAdminPlaying) {

            if(opacityLerp < 1) opacityLerp += 0.05;

        } else {

            if(opacityLerp > 0) opacityLerp -= 0.05;

        }

        root.style.setProperty('--opacity', opacityLerp);

    }, 1)

    setInterval(() => {
        // алгоритм проверки очередей треков на наличие этих самых треков
        // загружает треки по очереди, с приоритетом очереди зрителей
        if(!queue[curQueue]) {

            if(!adminQueue[curAdminQueue] || isAdminPlaying || !adminCanPlay) return;

            instance.value?.loadVideoById(adminQueue[curAdminQueue],adminTime,'hd720')
            isAdminPlaying = true;
            adminTime = 0;

        } else {

            console.log('normal queue events')
            
            if(isPlaying) return;
            
            // если админская очередь играла в этот момент,
            // сбрасывает её триггеры и блокирует
            adminCanPlay = false;
            isAdminPlaying = false;

            // сохраняет текущее время песни в админ очереди
            // чтобы после того, как все треки тут проиграются,
            // вернуться к админ очереди в нужный трек, в нужное время
            adminTime = instance.value?.getCurrentTime() 

            // и заменяет на обычную очередь
            instance.value?.loadVideoById(queue[curQueue],0,'hd720')
            isPlaying = true;

        }
        
    }, 1000)
}

export default { }
export { videoPlayer }