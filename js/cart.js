const skabelon = document.getElementById("skabelon");

dataStorage = window.sessionStorage;

const vogn = document.getElementById("cart");
const infoskabelon = document.getElementById("bestilling-info");

let prisSum;
const lejedage = dataStorage.getItem("lejedage");
const afhent = dataStorage.getItem("afhent");
const aflever = dataStorage.getItem("aflever");

const ordernum = dataStorage.getItem("ordernum");

let biler;

async function loadBiler() {
    const response = await fetch('./biler.json');
    biler = await response.json();
    fillCart();
}

loadBiler();

function fillCart() {
    const klon = skabelon.content.cloneNode(true);
    const billede = klon.querySelector(".billede");

    billede.src = biler[ordernum].billede;

    vogn.appendChild(klon);

    const infoklon = infoskabelon.content.cloneNode(true);
    const infobrand = infoklon.querySelector(".bestilling-brand");
    const infomodel = infoklon.querySelector(".bestilling-model");
    const infokategori = infoklon.querySelector(".bestilling-kategori");
    const infopersoner = infoklon.querySelector(".bestilling-personer");
    const infokufferter = infoklon.querySelector(".bestilling-kufferter");
    const infoafhent = infoklon.querySelector(".bestilling-afhent");
    const infoaflever = infoklon.querySelector(".bestilling-aflever");
    const infodage = infoklon.querySelector(".bestilling-dage");
    const infogrundpris = infoklon.querySelector(".bestilling-grundpris");
    const infolejepris = infoklon.querySelector(".bestilling-lejepris");
    const infotillaeg = infoklon.querySelector(".bestilling-tillaeg");
    const infoexmoms = infoklon.querySelector(".bestilling-exmoms");
    const infopris = infoklon.querySelector(".bestilling-pris");
    
    infobrand.innerHTML += biler[ordernum].brand;
    infomodel.innerHTML += biler[ordernum].model;
    infokategori.innerHTML += biler[ordernum].kategori;
    infopersoner.innerHTML += biler[ordernum].personer;
    infokufferter.innerHTML += biler[ordernum].kufferter;
    infoafhent.innerHTML += afhent;
    infoaflever.innerHTML += aflever;
    infodage.innerHTML += lejedage;
    infogrundpris.innerHTML += biler[ordernum].pris + ",-";
    infolejepris.innerHTML += 100 + ",-";
    infotillaeg.innerHTML += biler[ordernum].tillaeg + ",-";
    infoexmoms.innerHTML += beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1) + ",-";
    infopris.textContent += beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1.25) + ",-";

    vogn.appendChild(infoklon);

    prisSum = beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1.25);
    nyPris = prisSum;
}


function clearCart() {
    dataStorage.clear();
    vogn.innerHTML = '';
    window.location.href = "index.html";
    
}

function beregnLejeudgift(bilPris, bilTillaeg, moms) {
    return Math.round((bilPris + ((bilTillaeg + 100) * lejedage))*moms);
}


const airbag = document.getElementById("airbag");
const kidjail = document.getElementById("kidjail");
const spoiler = document.getElementById("spoiler");
const tires = document.getElementById("tires");
const muskel = document.getElementById("muskel");

let udstyrListe = []

airbag.addEventListener("change", function(){
    if (this.checked) {
        udstyrListe.push("Airbag");
        addExtra(200);
    }
    else {
        let myIndex = udstyrListe.indexOf('Airbag');
        if (myIndex !== -1) {
            udstyrListe.splice(myIndex, 1);
        }
        removeExtra(200);
    }
})
kidjail.addEventListener("change", function(){
    if (this.checked) {
        udstyrListe.push("Børnefængsel");
        addExtra(3000);
    }
    else {
        let myIndex = udstyrListe.indexOf('Børnefængsel');
        if (myIndex !== -1) {
            udstyrListe.splice(myIndex, 1);
        }
        removeExtra(3000);
    }
})
spoiler.addEventListener("change", function(){
    if (this.checked) {
        udstyrListe.push("Fed spoiler");
        addExtra(500);
    }
    else {
        let myIndex = udstyrListe.indexOf('Fed spoiler');
        if (myIndex !== -1) {
            udstyrListe.splice(myIndex, 1);
        }
        removeExtra(500);
    }
})
tires.addEventListener("change", function(){
    if (this.checked) {
        udstyrListe.push("Store dæk");
        addExtra(999);
    }
    else {
        let myIndex = udstyrListe.indexOf('Store dæk');
        if (myIndex !== -1) {
            udstyrListe.splice(myIndex, 1);
        }
        removeExtra(999);
    }
})
muskel.addEventListener("change", function(){
    if (this.checked) {
        udstyrListe.push("Muskelhund på bagsædet");
        addExtra(50000);
    }
    else {
        let myIndex = udstyrListe.indexOf('Muskelhund på bagsædet');
        if (myIndex !== -1) {
            udstyrListe.splice(myIndex, 1);
        }
        removeExtra(50000);
    }
})


let nyPris;


function addExtra(extra) { 
    const pris = document.querySelector(".bestilling-pris");
    const udstyr = document.getElementById("udstyr");
    udstyr.innerText = '';
    nyPris += extra;
    pris.innerHTML = `DKK ${nyPris},-`;
    udstyrListe.forEach(item => {
        udstyr.insertAdjacentHTML("beforeend", item + "<br><br>")
    })
}

function removeExtra(extra) {
    const pris = document.querySelector(".bestilling-pris");
    nyPris -= extra;
    udstyr.innerText = '';
    pris.innerHTML = `DKK ${nyPris},-`;
    udstyrListe.forEach(item => {
        udstyr.insertAdjacentHTML("beforeend", item + "<br><br>")
    })

    if (udstyrListe.length == 0) {
        udstyr.innerText = 'Ingen';
    }
}


