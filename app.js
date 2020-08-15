let mp3;
let current_speed, current_offset;
let play_icon, pause_icon;

function onSlowerClick(e) {
    mp3.playbackRate -= 0.1;
}

function onFasterClick(e) {
    mp3.playbackRate += 0.1;
}

function onRewindClick(e) {
    mp3.currentTime -= 3;
}

function onForwardClick(e) {
    mp3.currentTime += 3;
}

function onPlayPauseClick(e) {
    if (mp3.paused) {
        mp3.play();
        play_icon.style.display = 'none';
        pause_icon.style.display = 'inline-block';
    }
    else {
        mp3.pause();
        play_icon.style.display = 'inline-block';
        pause_icon.style.display = 'none';
    }
}

function textAtAudioOffset(seconds) {

    const offsets = Object.keys(data).sort();   // TODO: no need to do this every tick

    for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] > seconds) {
            return data[offsets[(i == 0 ? 1 : i) - 1]];
        }
    }
}

function tick() {
    const q = textAtAudioOffset(mp3.currentTime);
    document.getElementById('text').innerText = q;   // TODO: no need to do this every tick
    current_speed.innerText = mp3.playbackRate.toFixed(1);
    current_offset.innerText = mp3.currentTime.toFixed(1);
}

function init() {

    mp3 = document.getElementById('mp3');
    current_speed = document.getElementById('current_speed');
    current_offset = document.getElementById('current_offset');

    play_icon = document.querySelectorAll('img[alt="Play"]')[0];
    pause_icon = document.querySelectorAll('img[alt="Pause"]')[0];
    pause_icon.style.display = 'none';

    document.getElementById('slower').addEventListener('click', onSlowerClick);
    document.getElementById('faster').addEventListener('click', onFasterClick);

    document.getElementById('rewind').addEventListener('click', onRewindClick);
    document.getElementById('play_pause').addEventListener('click', onPlayPauseClick);
    document.getElementById('forward').addEventListener('click', onForwardClick);

    setInterval(tick, 150);
}
