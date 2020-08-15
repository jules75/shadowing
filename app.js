let mp3;
let current_speed, current_offset;
let paragraphs;

function onSlowerClick(e) {
    mp3.playbackRate -= 0.1;
}

function onFasterClick(e) {
    mp3.playbackRate += 0.1;
}

function onRewindClick(e) {
    mp3.currentTime -= 10;
}

function onPlayPauseClick(e) {
    if (mp3.paused) {
        mp3.play();
    }
    else {
        mp3.pause();
    }
}

function onPauseClick(e) {
    mp3.pause();
}

function onForwardClick(e) {
    mp3.currentTime += 10;
}

function textAtAudioOffset(seconds) {
    for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].dataset.offset > seconds) {
            return paragraphs[i - 1];
        }
    }
}

function tick() {
    const p = textAtAudioOffset(mp3.currentTime);
    document.getElementById('current_paragraph').innerText = p.innerText;
    current_speed.innerText = mp3.playbackRate;
    current_offset.innerText = mp3.currentTime;
}

function init() {

    mp3 = document.getElementById('mp3');
    current_speed = document.getElementById('current_speed');
    current_offset = document.getElementById('current_offset');
    paragraphs = document.querySelectorAll('p[data-offset]');

    document.getElementById('slower').addEventListener('click', onSlowerClick);
    document.getElementById('faster').addEventListener('click', onFasterClick);

    document.getElementById('rewind').addEventListener('click', onRewindClick);
    document.getElementById('play_pause').addEventListener('click', onPlayPauseClick);
    document.getElementById('forward').addEventListener('click', onForwardClick);

    setInterval(tick, 250);
}
