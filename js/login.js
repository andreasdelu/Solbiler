
const loginKnap = document.querySelector(".login");
const wrapper = document.querySelector(".wrapper")
if (!dataStorage.getItem("isAuthenticated")) {
    loginKnap.addEventListener("click", () => {
        createModal();
    })
}

function createModal() {

    /* Creating modal window */
    wrapper.style.filter = "blur(4px)"

    const modal = document.createElement("div");
    modal.id = "modal"
    document.body.appendChild(modal);

    const modalBG = document.createElement("div");
    modalBG.classList.add("modalBG");
    modal.appendChild(modalBG)

    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modalWindow");
    modal.appendChild(modalWindow);

    modalBG.addEventListener("click", () => {
        modal.remove();
        wrapper.removeAttribute("style");
    })

    /* Creating login form */

    const title = document.createElement("h2");
    title.innerText = "Log Ind";
    modalWindow.appendChild(title);

    const loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    modalWindow.appendChild(loginForm);
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        loginUser();
    })

    
    const userLabel = document.createElement("label")
    userLabel.setAttribute("for", "username");
    userLabel.innerText = "Brugernavn:"
    loginForm.appendChild(userLabel);

    const inputUser = document.createElement("input")
    inputUser.name = "username";
    inputUser.type = "text";
    inputUser.id = "username";
    inputUser.required = true;
    inputUser.autocomplete = "username";
    loginForm.appendChild(inputUser);

    const passLabel = document.createElement("label")
    passLabel.setAttribute("for", "password");
    passLabel.innerText = "Password:"
    loginForm.appendChild(passLabel);

    const inputPass = document.createElement("input")
    inputPass.name = "password";
    inputPass.type = "password";
    inputPass.id = "password";
    inputPass.required = true;
    inputPass.autocomplete = "current-password";
    loginForm.appendChild(inputPass);

    const glemt = document.createElement("a");
    glemt.onclick = function(){alert("username: runeboi\r\npassword: RuneErLækker123")}
    glemt.innerText = "Glemt login?"
    glemt.id = "glemt"
    loginForm.appendChild(glemt);

    const loginButton = document.createElement("button");
    loginButton.id = "loginButton";
    loginButton.type = "submit";
    loginButton.innerText = "Log Ind";
    loginForm.appendChild(loginButton);



}

let user;


function loginUser() {
    const modal = document.querySelector(".modalWindow");
    const loginForm = document.getElementById("loginForm");
    const form = new FormData(loginForm);
    modal.classList.remove("wrong")


    user = 
    {
        username: form.get("username"),
        password: CryptoJS.AES.encrypt(form.get("password"), "pass")
    }

    checkUser();

}


const loading = `<svg id="loader" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>`;


async function checkUser(){
    const modal = document.querySelector(".modalWindow");
    const loginForm = document.getElementById("loginForm");

    loginForm.style.display = "none"

    modal.insertAdjacentHTML("beforeend", loading)

    const response = await fetch('https://api.jsonbin.io/b/622872baa703bb67492659d4');
    let serverData = await response.json();

    modal.removeChild(document.getElementById("loader"));
    loginForm.style.display = "flex"

    if (user.username == serverData.username && CryptoJS.AES.decrypt(user.password, "pass").toString() == CryptoJS.AES.decrypt(serverData.password, "pass").toString()) {
        let token = CryptoJS.AES.decrypt(CryptoJS.AES.encrypt(user.username + CryptoJS.AES.decrypt(user.password, "pass").toString(), "token"), "token");
        dataStorage.setItem("token", token)
        dataStorage.setItem("isAuthenticated", true)

        window.location.href = "profile/user.html";
    }
    else {
        modal.classList.add("wrong")
    }

}

