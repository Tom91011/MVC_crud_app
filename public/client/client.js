let socket = io();
var now = moment();
console.log(now);

socket.on('userIdRequest', () => {
    console.log("requesting id from server");
    const userId = document.querySelector(".username").getAttribute('data')
    socket.emit('clientId', userId)
})

let throttleTimer;

const handleScrollThrottle = () => {
    const scrollBuffer = 400
        if(window.innerHeight + window.scrollY >= document.body.scrollHeight - scrollBuffer){
            const dataNumber = window.innerHeight + document.body.scrollTop - document.body.scrollHeight
            const data = dataNumber + " from bottom, more content to be loaded";
            const usernameId = document.querySelector(".username").getAttribute('data')
            const articles = document.querySelectorAll(".article")
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
    if(nextArticle) {
        const node = document.querySelectorAll(".article")[0]
        const clone = node.cloneNode(true)
        const cloneNode =  document.querySelector(".articles-container").appendChild(clone)  
        cloneNode
        const articlesEl = document.querySelector(".articles-container")
        const lastChild = articlesEl.lastChild
        lastChild.querySelector(".article-title").textContent = nextArticle.title
        lastChild.querySelector(".article-date").textContent = moment([nextArticle.date]).fromNow()
        lastChild.setAttribute("data", nextArticle._id)
        lastChild.classList.remove("hide")
    }
})



  



