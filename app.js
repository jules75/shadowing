let mp3;
let current_speed, current_offset;
let overlay;

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
        overlay.src = 'icon/pause.svg';
    }
    else {
        mp3.pause();
        overlay.src = 'icon/play.svg';
    }
}

function textAtAudioOffset(seconds) {

    const offsets = Object.keys(data.text).sort();   // TODO: no need to do this every tick

    for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] > seconds) {
            return data.text[offsets[(i == 0 ? 1 : i) - 1]];
        }
    }
}

function onAudioEnded(e) {
    overlay.src = 'icon/repeat.svg';
}

function tick() {
    
    const q = textAtAudioOffset(mp3.currentTime);
    const el = document.getElementById('text'); // TODO: no need to do this every tick

    // only update on change
    if (el.innerText != q) {
        el.innerText = q;
    }

    current_speed.innerText = mp3.playbackRate.toFixed(1);
    current_offset.innerText = mp3.currentTime.toFixed(1);
}

function listen(elid, fn) {
    document.getElementById(elid).addEventListener('click', fn);
}

function init() {

    mp3 = document.getElementById('mp3');
    mp3.src = data.src;  // loaded from JS file
    mp3.onended = onAudioEnded;

    current_speed = document.getElementById('current_speed');
    current_offset = document.getElementById('current_offset');

    overlay = document.getElementById('overlay');

    listen('slower', onSlowerClick);
    listen('faster', onFasterClick);
    listen('rewind', onRewindClick);
    listen('forward', onForwardClick);
    listen('text', onPlayPauseClick);

    document.getElementById('meta').innerHTML = data.title + '<br>' + data.attribution;

    setInterval(tick, 150);
}
