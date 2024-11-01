$(document).ready(function() {
    audio.play();
});

const songs = [
    {
        name: 'Still Alive (From "Portal")',
        artist: "The 8-Bit Big Band",
        cover: "image/the-8-bit-big-band.jpg",
        file: "music/stillalive.mp3"
    }, 
    { 
        name: 'L.O.V.E.',
        artist: "Michael Bublé",
        cover: "image/love.png",
        file: "music/love.mp3"
    },
    { 
        name: "It's Beginning to Look a Lot Like Christmas",
        artist: "Michael Bublé",
        cover: "image/christmas-buble.jpg",
        file: "music/christmas-buble.mp3"
    },
    { 
        name: 'two queens in a king sized bed',
        artist: "Girl in Red",
        cover: "image/queens.jpg",
        file: "music/queens.mp3"
    },
    { 
        name: 'My Way',
        artist: "Frank Sinatra",
        cover: "image/sinatra.jpg",
        file: "music/way.mp3"
    },
    { 
        name: 'Fly Me To The Moon',
        artist: "Frank Sinatra",
        cover: "image/sinatra.jpg",
        file: "music/Moon.mp3"
    },
    { 
        name: 'City of Stars',
        artist: "Ryan Gosling, Emma Stone",
        cover: "image/lalaland.jpg",
        file: "music/lalaland.mp3"
    },
    { 
        name: 'Silver White',
        artist: "Slowfly",
        cover: "image/slowfly.jpg",
        file: "music/silverwhite.mp3"
    },
    { 
        name: 'Promised Land',
        artist: "Slowfly",
        cover: "image/slowfly.jpg",
        file: "music/promisedland.mp3"
    },
    { 
        name: 'Carry a song',
        artist: "Wildson",
        cover: "image/wildson.jpg",
        file: "music/wildson.mp3"
    },
    { 
        name: 'Under the tree',
        artist: "Olly Arnold",
        cover: "image/tree.jpg",
        file: "music/tree.mp3"
    },
    { 
        name: 'Stockholm Love',
        artist: "Mathilda June",
        cover: "image/stockholm.jpg",
        file: "music/stockholm.mp3"
    },
    { 
        name: 'Vintage Dream',
        artist: "Mathilda June",
        cover: "image/vintage.jpg",
        file: "music/vintage.mp3"
    },
    { 
        name: 'Under the same stars',
        artist: "Flickering",
        cover: "image/samestars.jpg",
        file: "music/samestars.mp3"
    },
    { 
        name: 'Moon River',
        artist: "Stella Cole",
        cover: "image/river.jpg",
        file: "music/river.mp3"
    },
    { 
        name: 'Flowers',
        artist: "Stella Cole",
        cover: "image/flowers.jpg",
        file: "music/flowers.mp3"
    },
    { 
        name: "That's what I want for Christmas" ,
        artist: "Stella Cole",
        cover: "image/wantchristmas.jpg",
        file: "music/wantchristmas.mp3"
    },
    { 
        name: 'Christmas Dreaming',
        artist: "Stella Cole",
        cover: "image/dreaming.jpg",
        file: "music/dreaming.mp3"
    }
];

let songIndex = Math.floor(Math.random() * songs.length);

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const cover = document.getElementById('cover');
const coverlight = document.getElementById('cover-light');
const songName = document.getElementById('song-name');
const songNamelight = document.getElementById('song-name-light');
const artistName = document.getElementById('artist-name');
const artistNamelight = document.getElementById('artist-name-light');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
let n = 0;

function loadSong(song) {
    songName.innerText = song.name;
    artistName.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.file;
    songNamelight.innerText = song.name;
    artistNamelight.innerText = song.artist;
    coverlight.src = song.cover;
}

// Play or pause song
function playPause() {
    if (audio.paused) {
        audio.play();
        playButton.innerText = '⏸️'; // Change to pause symbol
    } else {
        audio.pause();
        playButton.innerText = '▶️'; // Change to play symbol
    }
}

function playaudio() {
    if(n == 0) {
        audio.play();
        n=1;
    }
}

// Update the progress bar and time
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Time calculation
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

// Progress bar click
function setProgress(event) {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Load next or previous song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playPause();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playPause();
}

audio.addEventListener('ended', nextSong);

// Initial load
window.addEventListener('DOMContentLoaded', () => {
    loadSong(songs[songIndex]);
    setTimeout(() => {
        audio.play();
    })
    playButton.innerText = '⏸️'; // Set to pause symbol on load
});

function hideDiv() {
    if( document.getElementById("audio-player").style.display == "none") {
        document.getElementById("audio-player").style.display = "block";
    } else {
        document.getElementById("audio-player").style.display = "none";

    }
}