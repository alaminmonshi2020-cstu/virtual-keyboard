const input = document.getElementById("input");
const suggestionBox = document.getElementById("suggestions");

let shift = false;
let caps = false;

/* BASIC WORD SUGGESTIONS */
const words = [
"hello","help","hero","house","html","hyper","hybrid",
"java","javascript","json","join",
"code","coding","computer","compiler",
"chat","chatgpt","create","class"
];

/* KEY PRESS */
document.querySelectorAll(".key").forEach(btn => {

btn.addEventListener("click", () => {

let key = btn.innerText.toLowerCase();

/* BACKSPACE */
if(btn.classList.contains("backspace")){
input.value = input.value.slice(0,-1);
}

/* ENTER */
else if(btn.classList.contains("enter")){
input.value += "\n";
}

/* SPACE */
else if(btn.classList.contains("space")){
input.value += " ";
}

/* SHIFT */
else if(btn.classList.contains("shift")){
shift = !shift;
}

/* CAPS */
else if(btn.classList.contains("caps")){
caps = !caps;
}

/* TAB */
else if(btn.classList.contains("tab")){
input.value += "    ";
}

/* NORMAL KEYS */
else{
let char = key;

if(shift || caps){
char = char.toUpperCase();
}

input.value += char;

if(shift) shift = false;
}

updateSuggestions();

});

});

/* WORD SUGGESTION ENGINE */
function updateSuggestions(){

let value = input.value.toLowerCase().split(/\s+/).pop();

suggestionBox.innerHTML = "";

if(value.length === 0) return;

let matches = words.filter(w => w.startsWith(value)).slice(0,5);

matches.forEach(word => {

let div = document.createElement("div");
div.innerText = word;

div.onclick = () => {
let parts = input.value.split(/\s+/);
parts.pop();
parts.push(word);
input.value = parts.join(" ") + " ";
suggestionBox.innerHTML = "";
};

suggestionBox.appendChild(div);

});

}