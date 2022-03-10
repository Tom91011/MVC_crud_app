let socket = io();

const setup = () => {
    socket = io.connect()
}
setup()


// let userId = new Date().getTime();

var screenAvailWidth = window.screen.availWidth;
var screenAvailHeight = window.screen.availHeight;
console.log(screenAvailHeight);
console.log(screenAvailWidth);

var screenWidth = window.screen.availWidth;
var screenHeight = window.screen.availHeight;
console.log(screenHeight);
console.log(screenWidth);


document.body.addEventListener('scroll',()=>{
    
    const scrollBuffer = 400
    if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - scrollBuffer){

        let userId = new Date().getTime();
        const dataNumber = window.innerHeight + document.body.scrollTop - document.body.scrollHeight
        console.log(dataNumber);
        const data = dataNumber + " from bottom, more content to be loaded";

        console.log(document.querySelectorAll(".article"));
        const articles = document.querySelectorAll(".article").length
        console.log(data);

        socket.emit('loadMore', articles)
    } else {
        // console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
    }
})

socket.on('message', message => {
    console.log(message);
})

socket.on('privateMessage', nextArticle => {
    console.log(nextArticle);
    const usernameEl = document.querySelector(".username")
    usernameEl.innerHTML = nextArticle
    if(nextArticle) {
        const node = document.querySelectorAll(".article")[0]
        const clone = node.cloneNode(true)
        const cloneNode =  document.querySelector(".articles-container").appendChild(clone)  
        cloneNode
        console.log(nextArticle);
        const articlesEl = document.querySelector(".articles-container")
        const lastChild = articlesEl.lastChild
        lastChild.querySelector(".article-title").textContent = nextArticle.title
        lastChild.querySelector(".article-date").textContent = nextArticle.date
    }
    
    

      
})



  



