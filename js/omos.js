const business = document.getElementById("business");
business.style.backgroundPositionY = "-" + window.scrollY/4 + "px";
window.addEventListener("scroll", (e) => {
    business.style.backgroundPositionY = "-" + window.scrollY/4 + "px";
})

const personer = document.querySelectorAll(".person");

let observer = new IntersectionObserver((entries) => {
    if(entries[0]['intersectionRatio'] == 0) {
        /* entries[0].target.classList.remove("shown") */
    }
    else {
        entries[0].target.classList.add("shown")
        observer.unobserve(entries[0].target)
    }
}, { root: null, rootMargin: "0px 0px -70px 0px" });

personer.forEach(person => {
    observer.observe(person);
})

