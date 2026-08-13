const tracks = [
  ["Current Se Chali Zindagi", "Desi Electrician Mix", "5:45", "Kishore_Kumar_-_Mere_mehboob_part_1_(mp3.pm).mp3"],
  ["Wiring Wale Yaar", "Electrician Work Mode", "4:20", ""],
  ["Switch On • Mood On", "Power Vibes", "3:58", ""],
  ["Roshni Ka Hunar", "Electrician Playlist", "4:10", ""],
  ["Kaam Apna, Attitude Alag", "Desi Work Mix", "4:05", ""],
  ["Meter Se Mood Tak", "Electrician Night Mix", "4:30", ""]
];

let idx = 0;
let audio = null;

const list = document.querySelector("#list");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const play = document.querySelector("#play");

function render() {
  if (!list) return;

  list.innerHTML = tracks.map((t, i) => `
    <div class="track" onclick="selectTrack(${i})">
      <b>${String(i + 1).padStart(2, "0")}</b>
      <span>
        <strong>${t[0]}</strong>
        <small>${t[1]} • ${t[2]}</small>
      </span>
    </div>
  `).join("");
}

function selectTrack(i) {
  idx = i;

  if (title) title.textContent = tracks[i][0];
  if (artist) artist.textContent = tracks[i][1];

  if (audio) {
    audio.pause();
    audio = null;
  }

  if (!tracks[i][3]) {
    alert("Is track ki MP3 file abhi add nahi ki gayi hai.");
    return;
  }

  audio = new Audio(encodeURI(tracks[i][3]));
  audio.play().catch(() => {
    alert("Play karne ke liye dobara Play button dabayein.");
  });
}

if (play) {
  play.onclick = () => {
    if (!tracks[idx][3]) {
      alert("Music chalane ke liye MP3 file ka URL/file name add karein.");
      return;
    }

    if (!audio) {
      selectTrack(idx);
    } else if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
}

const next = document.querySelector("#next");
if (next) {
  next.onclick = () => {
    selectTrack((idx + 1) % tracks.length);
  };
}

const prev = document.querySelector("#prev");
if (prev) {
  prev.onclick = () => {
    selectTrack((idx - 1 + tracks.length) % tracks.length);
  };
}

render();
