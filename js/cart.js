
const skabelon = document.getElementById("skabelon");

let dataStorage = window.sessionStorage;

if (dataStorage.getItem("isAuthenticated")){
    const login = document.querySelector(".login");
    const profil = document.querySelector(".profil");

    login.remove();
    profil.style.display = "flex";
}

if (dataStorage.getItem("ordernum") == null) {
    noOrderErr();
    throw new Error("No order number found.");
}

function noOrderErr() {
    const print = document.getElementById("print");
    print.remove();
    const clear = document.getElementById("clear");
    clear.innerHTML = 'Til forsiden';
    clear.href = "index.html";
    document.getElementById("order-wrap").innerHTML = '<h1 style="margin: 0 auto;">Din indkøbsvogn er tom :(</h1>'
}

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
    dataStorage.removeItem("lejedage");
    dataStorage.removeItem("aflever");
    dataStorage.removeItem("ordernum");
    dataStorage.removeItem("valgtUdstyr");
    dataStorage.removeItem("afhent");
    vogn.innerHTML = '';
    window.location.href = "index.html";
    
}

function beregnLejeudgift(bilPris, bilTillaeg, moms) {
    return Math.round((bilPris + ((bilTillaeg + 100) * lejedage))*moms);
}



/* Tilføj, fjern og gem ekstraudstyr */

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

const checkbokse = document.querySelectorAll(".extra-udstyr");

for (const checkboks of checkbokse) {
    checkboks.addEventListener("change", function(){
        const obj = {
            name: checkboks.id,
            pris: parseInt(checkboks.value), 
            txt: checkboks.name
        }
        if (this.checked) {
            addExtra(obj);
        }
        else {
            removeExtra(obj);
        }
    })
}


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
    const udstyr = document.getElementById("udstyr");
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

let formError = false;


orderForm.addEventListener("submit", function(e){
    e.preventDefault();
    bestil();
})

// Check postnummer, adresse og by

const postnummer = document.getElementById("postnummer");
const by = document.getElementById("by");
const adresse = document.getElementById("adresse");
const postDataList = document.getElementById("postnummer-list")
const vejDataList = document.getElementById("adresse-list")
let oldValue;
let postnumre = [];
let vejnavne = [];

async function hentPostnumre(vej, post) {
    const response = await fetch("https://api.dataforsyningen.dk/postnumre/");
    postnumre = await response.json();
}
hentPostnumre();

postnummer.addEventListener("input", () => {
    if (postnummer.value.length >= 1) {
        if (postnummer.value.length == 4) {
            oldValue = parseInt(postnummer.value)
        }
        if (postnummer.value.length > 4) {
            postnummer.value = oldValue;
        }
        checkPostnumre(postnummer.value);
        
    }
    else{
        postDataList.innerHTML ='';
        by.value = '';
    }


})

function checkPostnumre(postnum) {
    postDataList.innerHTML ='';
    postnumre.forEach(post => {
        if (post.nr.startsWith(postnum)) {
            let nummer = document.createElement("option");
            nummer.value = post.nr;
            nummer.innerText = post.nr + " " + post.navn;
            postDataList.appendChild(nummer);
    
            postnummer.classList.remove("wrong");
            postnummer.setCustomValidity("");
        }
        if (post.nr == postnum){
            by.value = post.navn
            adresse.readOnly = false;
        }
    })
    if (postnummer.value.length == 4) {
        
        hentVejnavne(postnummer.value);
    }
    else {
        by.value = '';
        adresse.readOnly = true;
        adresse.value = ''
    }
}

adresse.addEventListener("input", () => {
    if (postnummer.value.length === 4) {
        let vejnavn = adresse.value.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()
        checkVejnavne(vejnavn);
    }

})

async function hentVejnavne(post) {
    const response = await fetch(`https://api.dataforsyningen.dk/adgangsadresser?q=${post}`);
    vejnavne = await response.json();
}

function checkVejnavne(navn){
    vejDataList.innerHTML ='';
    vejnavne.forEach(vej => {
        let vejnavn = (vej.vejstykke.navn + " " + vej.husnr);
        if (vejnavn.toLowerCase().startsWith(navn)) {
            let vejPunkt = document.createElement("option");
            vejPunkt.value = vejnavn;
            vejPunkt.innerText = vejnavn;
            vejDataList.appendChild(vejPunkt);
        }

    })
}




// Saml al brugerdata

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
        valgtUdstyr.push(item.txt);
    })
    let orderInfo = {
        kunde,
        bil: ordernum,
        valgtUdstyr,
        total: nyPris
    };
    orderForm.insertAdjacentText("afterend", JSON.stringify(orderInfo));
}


