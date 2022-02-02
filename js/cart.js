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

fetch('./biler.json').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    biler = data;
    fillCart();
  }).catch(err => {
    // Do something for an error here
    console.log("Error loading cars");
  });

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
    window.location.href = "/solbiler/index.html";
    
}

function beregnLejeudgift(bilPris, bilTillaeg, moms) {
    return Math.round((bilPris + ((bilTillaeg + 100) * lejedage))*moms);
}

let bestilling ={};

let read;

function bestil(){
    if (Object.keys(bestilling).length <= 0) {
        bestilling = { 
            brand: biler[ordernum].brand, 
            model: biler[ordernum].model, 
            kategori: biler[ordernum].kategori, 
            afhentning: afhent, 
            aflevering: aflever, 
            dage: lejedage, 
            pris: prisSum
        };

        const bestringify = JSON.stringify(bestilling);
        
        /* readJSON(bestringify); */
        
        
    }
    else return;
}

function postJSON(toPost) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          console.log(req.responseText);
        }
      };

      req.open("PUT", "https://api.jsonbin.io/b/61fa3b534ce71361b8cb3bca", true);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("X-Master-Key", "$2b$10$olQoTRu1TrQaOOiqgjO8gud5Tfyq4UMPOIbp4TVccFQKe5jPhEan6");
      req.send(toPost);
}

function readJSON(stringy) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
        let response = req.responseText;
        response = response.slice(0, -2);
        finished = response + ","  + stringy + "]}"
        postJSON(finished);
        let orders = JSON.parse(finished);
        orderPrint(orders);
    }
    };

    req.open("GET", "https://api.jsonbin.io/b/61fa3b534ce71361b8cb3bca/latest", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$olQoTRu1TrQaOOiqgjO8gud5Tfyq4UMPOIbp4TVccFQKe5jPhEan6");
    req.send();

}

function orderPrint(toPrint) {
    for (const order of toPrint.orders) {
        vogn.insertAdjacentHTML("beforeend", order.brand + "<br>");
        console.log(order);
        
    }
}






