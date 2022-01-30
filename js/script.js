
const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");

const biler = document.getElementById("biler");
const skabelon = document.getElementById("skabelon");

const budget = {
    model: "Suzuki",
    brand: "Swift",
    kategori: "Budget",
    personer: 4,
    kufferter: 0,
    pris: 799
}

const budget1 = ["Suzuki", "Swift", "Budget", 4, 0, 799];
const mellem1 = ["Mazda", "3", "Mellemklasse", 5, 3, 999];
const mini1 = ["Volkswagen", "Touran", "Minivan", 7, 4, 1099];

const bilListe = [budget1, mellem1, mini1];


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
    for (const bil of bilListe) {
        if (bil[3] >= personer.value && bil[4] >= kufferter.value) {
            console.log(bil);
            const klon = skabelon.content.cloneNode(true);
            const billede = klon.querySelector(".billede");
            const model = klon.querySelector(".model");
            const brand = klon.querySelector(".brand");
            const kategori = klon.querySelector(".bil-kategori");
            const bilpersoner = klon.querySelector(".bil-personer");
            const bilkufferter = klon.querySelector(".bil-kufferter");
            const pris = klon.querySelector(".pris");

            model.textContent += bil[0];
            brand.textContent += bil[1];
            kategori.textContent += bil[2];
            bilpersoner.textContent += bil[3];
            bilkufferter.textContent += bil[4];
            pris.textContent += bil[5];
            billede.src = `images/${bil[1]}.png`
            biler.appendChild(klon);
        }
    }
}