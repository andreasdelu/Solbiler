const skabelon = document.getElementById("skabelon");

dataStorage = window.sessionStorage;

const vogn = document.getElementById("cart");
function fillCart() {
    var ordernum = dataStorage.getItem("ordernum");
    ordernum = ordernum.replace("ordernum=", "");
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
    vogn.insertAdjacentHTML("beforeend", "DKK "+biler[ordernum].pris + "<br>");
    vogn.insertAdjacentHTML("beforeend", "Afhentning: "+dataStorage.getItem("afhent") + "<br>");
    vogn.insertAdjacentHTML("beforeend", "Aflevering: "+dataStorage.getItem("aflever"));
}
fillCart();


