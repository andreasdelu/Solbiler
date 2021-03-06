const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");
const convert = document.getElementById("valuta");
const formular = document.querySelector(".formular");

const skabelon = document.getElementById("skabelon");
let dataStorage = window.sessionStorage;
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

if (dataStorage.getItem("isAuthenticated")){
    const login = document.querySelector(".login");
    const profil = document.querySelector(".profil");
    const logout = document.querySelector(".logout");

    login.remove();
    profil.style.display = "flex";
    logout.style.display = "flex";
}


afhent.value = `${year}-${month}-${day}`;
aflever.value = `${year}-${month}-${day}`;
afhent.min = afhent.value;
aflever.min = afhent.value;


afhent.addEventListener("change", function()
{
    if (afhent.value < afhent.min) 
    {
        afhent.value=afhent.min;
    }
    aflever.min, aflever.value = afhent.value;
});
aflever.addEventListener("change", function()
{
    if (aflever.value < afhent.value) 
    {
        aflever.value = afhent.value;
    }
});



let biler;

async function loadBiler() {
    const output = document.getElementById("biler");

    try {
        output.insertAdjacentHTML("afterbegin", "<h2>Henter biler...</h2>")
        const response = await fetch('./biler.json');
        biler = await response.json();
        await loadValuta();
        search();
    } catch (err) {
        console.log(err.message);
        output.innerHTML = '';
        output.insertAdjacentHTML("afterbegin", "<h2>Kunne ikke hente biler... prøv igen.</h2>")
    }
    
}


loadBiler();

const api = "https://api.exchangerate-api.com/v4/latest/DKK";

let valuta;

async function loadValuta() {
    const fetched = await fetch(`${api}`);
    const currency = await fetched.json();
    valuta = currency.rates;
}

convert.addEventListener("change", function(){search();});

formular.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
});

function search() 
{
    beregnAntalLejedage();
    const output = document.getElementById("biler"); 
    output.innerHTML = '';
    for (const bil of biler) 
    {
        if (bil.personer >= personer.value && bil.kufferter >= kufferter.value) 
        {
            const klon = skabelon.content.cloneNode(true);
            const billede = klon.querySelector(".billede");
            const model = klon.querySelector(".model");
            const brand = klon.querySelector(".brand");
            const kategori = klon.querySelector(".bil-kategori");
            const bilpersoner = klon.querySelector(".bil-personer");
            const bilkufferter = klon.querySelector(".bil-kufferter");
            const pris = klon.querySelector(".pris");
            
            const bookbtn = klon.querySelector(".booknu");
            bookbtn.onclick = function(){bookNu(JSON.stringify(bil));};

            billede.src = bil.billede;
            model.textContent += bil.model;
            brand.textContent += bil.brand;
            kategori.textContent += bil.kategori;
            bilpersoner.textContent += bil.personer;
            bilkufferter.textContent += bil.kufferter;

            const udregnetPris = beregnLejeudgift(bil.pris, bil.tillaeg, 1.25);
            pris.textContent += convert.value + " " + Math.round(udregnetPris * valuta[convert.value]) + ",-";
            output.appendChild(klon);

            
        }
    }
    if (output.innerHTML == '') 
    {
        output.insertAdjacentHTML("afterbegin", '<h2>Ingen biler fundet :(</h2>')
    }
}


function bookNu(order) 
{
    let lejedage = beregnAntalLejedage();

    if (order != dataStorage.getItem("bil")) {
        dataStorage.removeItem("valgtUdstyr");
    }
    dataStorage.setItem("bil", order);
    dataStorage.setItem("lejedage", lejedage);
    fixDate("afhent");
    fixDate("aflever");
    window.location.href = "order.html";
}

function fixDate(dato) {
    if (dato == "afhent") {
        let split = afhent.value.split("-");
        dataStorage.setItem("afhent", split[2] + "-" + split[1] + "-" + split[0]);
    }
    else if (dato == "aflever") {
        let split = aflever.value.split("-");
        dataStorage.setItem("aflever", split[2] + "-" + split[1] + "-" + split[0]);
    }
}

if (dataStorage.getItem("bil") != null) {
    const cart = document.querySelector(".shopping-cart");
    cart.classList.add("isShown");
}



function beregnAntalLejedage(){
    const afhentDato = new Date(afhent.value);
    const afleverDato = new Date(aflever.value);
    const forskelTid = Math.abs(afleverDato - afhentDato);
    const forskelDage = Math.ceil(forskelTid / (1000 * 60 * 60 * 24) + 1);
    return forskelDage;
}

function beregnLejeudgift(bilPris, bilTillaeg, moms) {
    return Math.round((bilPris + ((bilTillaeg + 100) * beregnAntalLejedage())) * moms);
}


function logout() {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("isAuthenticated");
    window.location.href = "index.html"
}
