if (storage.getItem("isAuthenticated")){
    const login = document.querySelector(".login");
    const profil = document.querySelector(".profil");
    const logout = document.querySelector(".logout");

    login.remove();
    profil.style.display = "flex";
    logout.style.display = "flex";
}

const business = document.getElementById("business");
business.style.backgroundPositionY = "-" + window.scrollY/4 + "px";

const sky = document.getElementById("sky");
const mountainBack = document.getElementById("mountains-back");
const mountainFront = document.getElementById("mountain-front");
const car = document.getElementById("car");

mountainBack.style.backgroundPositionY = window.scrollY/12 + "px";
mountainFront.style.backgroundPositionY = "-" +  window.scrollY/20 + "%";

const lilleBil = document.getElementById("lille-bil");
lilleBil.style.width = (document.documentElement.scrollTop/((document.documentElement.offsetHeight-window.innerHeight)/window.innerWidth)) + "px";


window.addEventListener("scroll", (e) => {
    business.style.backgroundPositionY = "-" + window.scrollY/4 + "px";

    mountainBack.style.backgroundPositionY = window.scrollY/12 + "px";
    mountainFront.style.backgroundPositionY = "-" + window.scrollY/20 + "%";

    lilleBil.style.width = (document.documentElement.scrollTop/((document.documentElement.offsetHeight-window.innerHeight)/window.innerWidth)) + "px";





})
const personer = document.querySelectorAll(".person");

let observer = new IntersectionObserver((entries) => {
    if(entries[0]['intersectionRatio'] > 0) {
        entries[0].target.classList.add("shown")
        observer.unobserve(entries[0].target)
    }
}, {rootMargin: "0px 0px -70px 0px" });

personer.forEach(person => {
    observer.observe(person);
})

const quote = document.getElementById("quote");


let observer2 = new IntersectionObserver((entries) => {
    if(entries[0]['intersectionRatio'] > 0) {
        entries[0].target.classList.add("show-quote")
        observer.unobserve(entries[0].target)
    }
}, { root: null, rootMargin: "0px 0px -60px 0px" });

observer2.observe(quote);


function logout() {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("isAuthenticated");
    window.location.href = "index.html"
}
