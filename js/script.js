
const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");

const biler = document.getElementById("biler");
const klon = document.getElementById("skabelon");
const bilPersoner = document.getElementById("bil-personer");
const bilKufferter = document.getElementById("bil-kufferter");

const budget = {
    model: "Suzuki",
    brand: "Swift",
    kategori: "Budget",
    personer: 4,
    kufferter: 0,
    pris: 799
}


const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (month <= 9) {
    month = "0" + month;
}

if (day <=9) {
    day = "0" + day;
}

afhent.value = `${year}-${month}-${day}`;
aflever.value = `${year}-${month}-${day}`;
afhent.min = afhent.value;
aflever.min = afhent.value;

function sub() {
    biler.innerHTML = '';
}