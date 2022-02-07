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
    const model = klon.querySelector(".model");
    const brand = klon.querySelector(".brand");
    const kategori = klon.querySelector(".bil-kategori");
    const bilpersoner = klon.querySelector(".bil-personer");
    const bilkufferter = klon.querySelector(".bil-kufferter");

    billede.src = biler[ordernum].billede;
    model.textContent += biler[ordernum].model;
    brand.textContent += biler[ordernum].brand;
    kategori.textContent += biler[ordernum].kategori;
    bilpersoner.textContent += biler[ordernum].personer;
    bilkufferter.textContent += biler[ordernum].kufferter;

    vogn.appendChild(klon);

    const infoklon = infoskabelon.content.cloneNode(true);
    const infoafhent = infoklon.querySelector(".bestilling-afhent");
    const infoaflever = infoklon.querySelector(".bestilling-aflever");
    const infodage = infoklon.querySelector(".bestilling-dage");
    const infogrundpris = infoklon.querySelector(".bestilling-grundpris");
    const infolejepris = infoklon.querySelector(".bestilling-lejepris");
    const infotillaeg = infoklon.querySelector(".bestilling-tillaeg");
    const infoexmoms = infoklon.querySelector(".bestilling-exmoms");
    const infopris = infoklon.querySelector(".bestilling-pris");
    
    infoafhent.textContent += afhent;
    infoaflever.textContent += aflever;
    infodage.textContent += lejedage;
    infogrundpris.textContent += biler[ordernum].pris + ",-";
    infolejepris.textContent += 100 + ",-";
    infotillaeg.textContent += biler[ordernum].tillaeg + ",-";
    infoexmoms.textContent += beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1) + ",-";
    infopris.textContent += beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1.25) + ",-";

    vogn.appendChild(infoklon);

    prisSum = beregnLejeudgift(biler[ordernum].pris, biler[ordernum].tillaeg, 1.25);
}


function clearCart() {
    dataStorage.clear();
    vogn.innerHTML = '';
    window.location.href = "index.html";
    
}

function beregnLejeudgift(bilPris, bilTillaeg, moms) {
    return Math.round((bilPris + ((bilTillaeg + 100) * lejedage))*moms);
}





