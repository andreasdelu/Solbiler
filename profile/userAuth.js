if (window.sessionStorage.getItem("token") != "72756e65626f693532373536653635343537323463633361363662366236353732333133323333") {
    window.location.href = "../index.html" 
    throw new Error("Acess denied! User not authenticated!")  
}

document.querySelector("script").remove();