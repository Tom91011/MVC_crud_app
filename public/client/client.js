let socket = io();

// const setup = () => {
    // socket = io.connect()
// }
// setup()

socket.on('userIdRequest', () => {
    console.log("requesting id from server");
    const userId = document.querySelector(".username").getAttribute('data')
    socket.emit('clientId', userId)
})


// let userId = new Date().getTime();

// var screenAvailWidth = window.screen.availWidth;
// var screenAvailHeight = window.screen.availHeight;
// console.log(screenAvailHeight);
// console.log(screenAvailWidth);

// var screenWidth = window.screen.availWidth;
// var screenHeight = window.screen.availHeight;
// console.log(screenHeight);
// console.log(screenWidth);


// document.body.addEventListener('scroll',()=>{
    
//     const scrollBuffer = 400
//     if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - scrollBuffer){

//         let userId = new Date().getTime();
//         const dataNumber = window.innerHeight + document.body.scrollTop - document.body.scrollHeight
//         console.log(dataNumber);
//         const data = dataNumber + " from bottom, more content to be loaded";

//         console.log(document.querySelectorAll(".article"));
//         const articles = document.querySelectorAll(".article")
//         // console.log(data);
//         const lastArticle = articles[articles.length-1].getAttribute('data')
//         console.log(lastArticle);
//         socket.emit('loadMore', lastArticle)
//     } else {
//         // console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
//     }
// })


let throttleTimer;

const handleScrollThrottle = () => {
    const scrollBuffer = 400
        if(window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollBuffer){
        //     console.log("window inner height is : " + window.innerHeight);
        //     console.log("scroll top is : " + document.body.scrollTop);
        //     console.log("client height is: " + document.body.clientHeight)
        //     console.log("scroll height is : " + document.body.scrollHeight);
        //     console.log("scroll Y position is: " + window.scrollY)
            // let userId = new Date().getTime();
            const dataNumber = window.innerHeight + document.body.scrollTop - document.body.scrollHeight
            // console.log(dataNumber);
            const data = dataNumber + " from bottom, more content to be loaded";
            const usernameId = document.querySelector(".username").getAttribute('data')
            // console.log(document.querySelectorAll(".article"));
            const articles = document.querySelectorAll(".article")
            // console.log(data);
            const lastArticleId = articles[articles.length-1].getAttribute('data')
            const message = {
                articleId: lastArticleId,
                userId: usernameId
            }
            console.log("last article id is : " + lastArticleId);
            socket.emit('loadMore', message)
        } else {
            // console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
        }
}
 
const throttle = (handleScrollThrottle, time) => {
  if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        handleScrollThrottle();
        throttleTimer = false;
    }, time);
}
 
window.addEventListener("scroll", () => { 
  throttle(handleScrollThrottle, 250);
});

 

socket.on('message', message => {
    console.log(message);
})

socket.on('privateMessage', nextArticle => {
    // console.log(nextArticle);
    
    // usernameEl.innerHTML = nextArticle
    if(nextArticle) {
        const node = document.querySelectorAll(".article")[0]
        const clone = node.cloneNode(true)
        const cloneNode =  document.querySelector(".articles-container").appendChild(clone)  
        cloneNode
        // console.log(nextArticle);
        const articlesEl = document.querySelector(".articles-container")
        const lastChild = articlesEl.lastChild
        lastChild.querySelector(".article-title").textContent = nextArticle.title
        lastChild.querySelector(".article-date").textContent = nextArticle.date
        lastChild.setAttribute("data", nextArticle._id)
        lastChild.classList.remove("hide")
    }
})



  



