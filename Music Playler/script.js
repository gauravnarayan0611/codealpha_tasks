const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
    { name: "song1.mp3", title: "Dreams", artist: "Artist One" },
    { name: "song2.mp3", title: "Night Ride", artist: "Artist Two" },
    { name: "song3.mp3", title: "Relax Beat", artist: "Artist Three" },
    { name: "song4.mp3", title: "lofi song english", artist: "Artist four" },
    { name: "song5.mp3", title: "lofi songs hindi", artist: "Artist five" },
    { name: "song6.mp3", title: "Mashup", artist: "Artist six" },
    { name: "song7.mp3", title: "romantic", artist: "Artist seven" },
    { name: "song8.mp3", title: "Night love", artist: "Artist eight" },
    { name: "song9.mp3", title: "dj party", artist: "Artist nine" },
];  

let songIndex = 0;
let isPlaying = false;

/* Load song */
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = `songs/${song.name}`;
}

/* Play & Pause */
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = "⏸";
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = "▶";
}

/* Toggle */
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

/* Next & Previous */
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
    updatePlaylist();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
    updatePlaylist();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

/* Progress */
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
});

/* Volume */
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

/* Autoplay */
audio.addEventListener("ended", nextSong);

/* Time format */
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

/* Playlist */
function createPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
            updatePlaylist();
        });
        playlistEl.appendChild(li);
    });
}

function updatePlaylist() {
    const items = playlistEl.querySelectorAll("li");
    items.forEach((item, index) => {
        item.classList.toggle("active", index === songIndex);
    });
}

/* Init */
loadSong(songs[songIndex]);
createPlaylist();
updatePlaylist();
volume.value = 0.7;
audio.volume = 0.7;
