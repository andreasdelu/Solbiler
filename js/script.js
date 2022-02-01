const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");


const skabelon = document.getElementById("skabelon");


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

dataStorage = window.sessionStorage;

afhent.value = `${year}-${month}-${day}`;
aflever.value = `${year}-${month}-${day}`;
afhent.min = afhent.value;
aflever.min = afhent.value;

function search() 
{
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
            bookbtn.onclick = function(){bookNu(bil.nummer);};

            billede.src = bil.billede;
            model.textContent += bil.model;
            brand.textContent += bil.brand;
            kategori.textContent += bil.kategori;
            bilpersoner.textContent += bil.personer;
            bilkufferter.textContent += bil.kufferter;
            pris.textContent += bil.pris;
            output.appendChild(klon);
        }
    }
    if (output.innerHTML == '') 
    {
        output.insertAdjacentHTML("afterbegin", '<h2>Ingen biler fundet :(</h2>')
    }
}
search();  

function bookNu(order) 
{
    dataStorage.setItem("ordernum", order);
    fixDate("afhent");
    fixDate("aflever");
    window.location.href = "/order.html";
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



