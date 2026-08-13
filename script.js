const tracks=[
["Current Se Chali Zindagi","Desi Electrician Mix","5:45",""],
["Wiring Wale Yaar","Electrician Work Mode","4:12",""],
["Switch On • Mood On","Power Vibes","3:58",""],
["Roshni Ka Hunar","Electrician Playlist","4:36",""],
["Kaam Apna, Attitude Alag","Desi Work Mix","5:02",""],
["Meter Se Mood Tak","Electrician Night Mix","4:20",""]
];
let idx=0,audio=null;
const list=document.querySelector("#list"),title=document.querySelector("#nowTitle"),artist=document.querySelector("#nowArtist"),bar=document.querySelector("#bar"),cur=document.querySelector("#cur"),dur=document.querySelector("#dur"),play=document.querySelector("#play");
function render(){list.innerHTML=tracks.map((t,i)=>`<div class="row" onclick="selectTrack(${i})"><div class="num">${String(i+1).padStart(2,"0")}</div><div class="song"><h3>${t[0]}</h3><p>${t[1]} • ${t[2]}</p></div></div>`).join("")}
function selectTrack(i){idx=i;title.textContent=tracks[i][0];artist.textContent=tracks[i][1];dur.textContent=tracks[i][2];bar.style.width="0%";cur.textContent="0:00";if(audio){audio.pause();audio=null}play.textContent="▶";if(tracks[i][3]){audio=new Audio(tracks[i][3]);audio.ontimeupdate=()=>{bar.style.width=(audio.currentTime/audio.duration*100)+"%";cur.textContent=fmt(audio.currentTime)};audio.onended=()=>selectTrack((idx+1)%tracks.length);audio.play();play.textContent="Ⅱ"}}
function fmt(s){return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
play.onclick=()=>{if(!tracks[idx][3]){alert("Music chalane ke liye script.js me apne permitted audio URL add karein.");return}if(audio.paused){audio.play();play.textContent="Ⅱ"}else{audio.pause();play.textContent="▶"}}
document.querySelector("#next").onclick=()=>selectTrack((idx+1)%tracks.length);
document.querySelector("#prev").onclick=()=>selectTrack((idx-1+tracks.length)%tracks.length);
render();
