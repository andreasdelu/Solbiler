
const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");

const biler = document.getElementById("biler");
const skabelon = document.getElementById("skabelon");

const liste = [
    {
        billede: "images/biler/swift.png",
        brand: "Suzuki",
        model: "Swift",
        kategori: "Budget",
        personer: 4,
        kufferter: 0,
        pris: 799
    },
    {
        billede: "images/biler/3.png",
        brand: "Mazda",
        model: "3",
        kategori: "Mellemklasse",
        personer: 5,
        kufferter: 3,
        pris: 999
    },
    {
        billede: "images/biler/touran.png",
        brand: "Volkswagen",
        model: "Touran",
        kategori: "Minivan",
        personer: 7,
        kufferter: 4,
        pris: 1099
    }
]

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

function search() {
    biler.innerHTML = '';
    for (const bil of liste) {
        if (bil.personer >= personer.value && bil.kufferter >= kufferter.value) {
            const klon = skabelon.content.cloneNode(true);
            const billede = klon.querySelector(".billede");
            const model = klon.querySelector(".model");
            const brand = klon.querySelector(".brand");
            const kategori = klon.querySelector(".bil-kategori");
            const bilpersoner = klon.querySelector(".bil-personer");
            const bilkufferter = klon.querySelector(".bil-kufferter");
            const pris = klon.querySelector(".pris");

            model.textContent += bil.model;
            brand.textContent += bil.brand;
            kategori.textContent += bil.kategori;
            bilpersoner.textContent += bil.personer;
            bilkufferter.textContent += bil.kufferter;
            pris.textContent += bil.pris;
            billede.src = bil.billede;
            biler.appendChild(klon);
        }
    }
}

search();