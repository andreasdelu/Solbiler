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



/* Tilføj, fjern og gem ekstraudstyr */


const airbag = document.getElementById("airbag");
const kidjail = document.getElementById("kidjail");
const spoiler = document.getElementById("spoiler");
const tires = document.getElementById("tires");
const muskel = document.getElementById("muskel");

let udstyrListe = []
let nyPris;

window.addEventListener("load", () => {
    const udstyr = document.getElementById("udstyr");
    const pris = document.querySelector(".bestilling-pris");
    udstyr.innerText = 'Ingen';
    if (dataStorage.getItem("valgtUdstyr") != null && JSON.parse(dataStorage.getItem("valgtUdstyr")).length != 0){
        udstyrListe = JSON.parse(dataStorage.getItem("valgtUdstyr"));
        udstyr.innerText = '';
        
        udstyrListe.forEach(item => {
            udstyr.insertAdjacentHTML("beforeend", `<div class="udstyr">${item.txt}</div>`)
            document.getElementById(`${item.name}`).checked = true;
            nyPris += item.pris;
            pris.innerHTML = `DKK ${nyPris},-`;
        })
    }
})



airbag.addEventListener("change", function(){
    const obj = {
        name: "airbag",
        pris: 200, 
        txt: "Airbag + DKK 200,-"
    }
    if (this.checked) {
        addExtra(obj);
    }
    else {
        removeExtra(obj);
    }
})
kidjail.addEventListener("change", function(){
    const obj = {
        name: "kidjail",
        pris: 3000, 
        txt: "Børnefængsel + DKK 3000,-"
    }
    if (this.checked) {
        addExtra(obj);
    }
    else {
        removeExtra(obj);
    }
})
spoiler.addEventListener("change", function(){
    const obj = {
        name: "spoiler",
        pris: 500, 
        txt: "Fed spoiler + DKK 500,-"
    }
    if (this.checked) {
        addExtra(obj);
    }
    else {
        removeExtra(obj);
    }
})
tires.addEventListener("change", function(){
    const obj = {
        name: "tires",
        pris: 999, 
        txt: "Store dæk + DKK 999,-"
    }
    if (this.checked) {
        addExtra(obj);
    }
    else {
        removeExtra(obj);
    }
})
muskel.addEventListener("change", function(){
    const obj = {
        name: "muskel",
        pris: 50000, 
        txt: "Muskelhund på bagsædet + DKK 50.000,-"
    }
    if (this.checked) {
        addExtra(obj);
    }
    else {
        removeExtra(obj);
    }
})




function addExtra(extra) { 
    const pris = document.querySelector(".bestilling-pris");
    const udstyr = document.getElementById("udstyr");
    udstyrListe.push(extra);
    udstyr.innerText = '';
    nyPris += extra.pris;
    pris.innerHTML = `DKK ${nyPris},-`;
    udstyrListe.forEach(item => {
        udstyr.insertAdjacentHTML("beforeend", `<div class="udstyr">${item.txt}</div>`)
    })
    dataStorage.setItem("valgtUdstyr", JSON.stringify(udstyrListe));
}

function removeExtra(extra) {
    const pris = document.querySelector(".bestilling-pris");
    udstyrListe = udstyrListe.filter( item => item.name !== extra.name);
    nyPris -= extra.pris;
    udstyr.innerText = '';
    pris.innerHTML = `DKK ${nyPris},-`;
    udstyrListe.forEach(item => {
        udstyr.insertAdjacentHTML("beforeend", `<div class="udstyr">${item.txt}</div>`)
    })

    if (udstyrListe.length == 0) {
        udstyr.innerText = 'Ingen';
    }
    dataStorage.setItem("valgtUdstyr", JSON.stringify(udstyrListe));
    
}


const orderForm = document.getElementById("user-form")

orderForm.addEventListener("submit", function(e){
    e.preventDefault();
    bestil();
})

function bestil() {
    let formData = new FormData(orderForm);
    let kunde = {
        navn: formData.get("navn"),
        mail: formData.get("mail"),
        telefon: formData.get("telefon"),
        adresse: formData.get("adresse"),
        postnummer: formData.get("postnummer"),
        by: formData.get("by")
    }
    let valgtUdstyr = [];
    udstyrListe.forEach(item => {
        valgtUdstyr.push(item.name);
    })
    let orderInfo = {
        kunde,
        bil: ordernum,
        valgtUdstyr,
        pris: nyPris
    };
    orderForm.insertAdjacentText("afterend", JSON.stringify(orderInfo));
}


