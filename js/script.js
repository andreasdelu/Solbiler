
const afhent = document.getElementById("afhentning");
const aflever = document.getElementById("aflevering");

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

afhent.value = year.toString() + "-" + month.toString() + "-" + day.toString();
aflever.value = year.toString() + "-" + month.toString() + "-" + day.toString();
afhent.min = afhent.value;
aflever.min = afhent.value;