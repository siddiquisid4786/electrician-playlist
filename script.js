const tracks = [
  ["Current Se Chali Zindagi", "Desi Electrician Mix", "Kishore_Kumar_-_Mere_mehboob_part_1_(mp3.pm).mp3"],
  ["Wiring Wale Yaar", "Electrician Work Mode", "Yeh_Dil_Aashiqana___Kumar_Sanu___Alka_Yagnik___Nadeem-Shravan___90_s_Romantic_Song(256k).mp3"],
  ["Switch On • Mood On", "Power Vibes", "song3.mp3"],
  ["Roshni Ka Hunar", "Electrician Playlist", "song4.mp3"],
  ["Kaam Apna, Attitude Alag", "Desi Work Mix", "song5.mp3"],
  ["Meter Se Mood Tak", "Electrician Night Mix", "song6.mp3"]
];

let idx = 0;
const audio = new Audio();

const list = document.querySelector("#list");
const title = document.querySelector("#nowTitle");
const artist = document.querySelector("#nowArtist");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const bar = document.querySelector("#bar");
const cur = document.querySelector("#cur");
const dur = document.querySelector("#dur");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function render() {
  if (!list) return;

  list.innerHTML = tracks.map((t, i) => `
    <div class="track ${i === idx ? "active" : ""}" onclick="selectTrack(${i})">
      <b>${String(i + 1).padStart(2, "0")}</b>
      <span>
        <strong>${t[0]}</strong>
        <small>${t[1]}</small>
      </span>
    </div>
  `).join("");
}

function selectTrack(i, autoPlay = true) {
  idx = i;

  const track = tracks[idx];

  title.textContent = track[0];
  artist.textContent = track[1];

  audio.pause();
  audio.currentTime = 0;
  audio.src = encodeURI(track[2]);
  audio.load();

  cur.textContent = "0:00";
  dur.textContent = "0:00";
  bar.style.width = "0%";

  render();

  if (autoPlay) {
    audio.play()
      .then(() => {
        playBtn.textContent = "Ⅱ";
      })
      .catch(() => {
        playBtn.textContent = "▶";
        alert("MP3 file nahi mil rahi. GitHub me filename check karo.");
      });
  }
}

function togglePlay() {
  if (!audio.src) {
    selectTrack(idx, true);
    return;
  }

  if (audio.paused) {
    audio.play()
      .then(() => {
        playBtn.textContent = "Ⅱ";
      })
      .catch(() => {
        playBtn.textContent = "▶";
      });
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextTrack() {
  idx = (idx + 1) % tracks.length;
  selectTrack(idx, true);
}

function prevTrack() {
  idx = (idx - 1 + tracks.length) % tracks.length;
  selectTrack(idx, true);
}

/* Play / Pause */
playBtn.addEventListener("click", togglePlay);

/* Previous / Next */
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

/* Audio duration load hone ke baad */
audio.addEventListener("loadedmetadata", () => {
  dur.textContent = formatTime(audio.duration);
});

/* Time + progress bar */
audio.addEventListener("timeupdate", () => {
  cur.textContent = formatTime(audio.currentTime);

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    bar.style.width = `${percent}%`;
  }
});

/* Song khatam → next song */
audio.addEventListener("ended", () => {
  nextTrack();
});

/* Browser ke pause/play ke according button */
audio.addEventListener("play", () => {
  playBtn.textContent = "Ⅱ";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
});

/* First song select karo, lekin automatically play mat karo */
selectTrack(0, false);
const progressLine = document.querySelector(".line");

progressLine.addEventListener("click", (e) => {
  if (!audio.duration) return;

  const rect = progressLine.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  audio.currentTime = percent * audio.duration;
});
