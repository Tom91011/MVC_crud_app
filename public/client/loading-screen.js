const loadingMessage = document.querySelectorAll(".loading-screen h1 span")
let loadingMessageLetterArray = []

loadingMessage.forEach((letter,i ) => {
    loadingMessageLetterArray.push(i)
})
const randomiseLetters = loadingMessageLetterArray.sort(() => Math.random() - 0.5)


window.onload = setTimeout(() => {
    loadingMessageLetterArray.forEach((letterIndex,i) => {
        setTimeout(
            function(){
                loadingMessage[letterIndex].classList.remove("hide")
                loadingMessage[letterIndex].classList.add("show")
            }
        , i *30);
    }); 
},200)
