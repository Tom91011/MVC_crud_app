let socket = io();
var now = moment();

socket.on('userIdRequest', () => {
    console.log("requesting id from server");
    const userId = document.querySelector(".username").getAttribute('data')
    socket.emit('clientId', userId)
})

const accountDetailsEl = document.querySelector(".account-details")
const dropDownEl = document.querySelector(".account-dropdown-container")
const changeIconEl = document.querySelector(".change-icon-button")
const changeIconFormEl = document.querySelector(".sub-dropdown-container")

const showDropdown = () => {
    dropDownEl.classList.toggle("hide")
    dropDownEl.classList.toggle("show")
    if(changeIconFormEl.classList.contains("show")) {
      changeIconFormEl.classList.remove("show")
      changeIconFormEl.classList.add("hide")
    }
}

accountDetailsEl.addEventListener("click", showDropdown)

const showChangeIconForm = () => {
    changeIconFormEl.classList.toggle("hide")
    changeIconFormEl.classList.toggle("show")
}

changeIconEl.addEventListener("click", showChangeIconForm)

// minimises dropdown and subdropdown if user clicks anywhere except the dropdown element
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-switch')) {
        console.log("clicked outside dropdown");
      var dropdowns = document.getElementsByClassName("dropdown-container");
      console.log(dropdowns);
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (!openDropdown.classList.contains('hide')) {
          openDropdown.classList.add('hide');
          openDropdown.classList.remove('show');
        }
      }
    }
  }


// Stops the scroll maybe multiple
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

socket.on('nextArticles', articles => {
    articles.forEach(article => {        
            const node = document.querySelectorAll(".article")[0]
            const clone = node.cloneNode(true)
            const cloneNode =  document.querySelector(".articles-container").appendChild(clone)  
            cloneNode
            const articlesEl = document.querySelector(".articles-container")
            const lastChild = articlesEl.lastChild
            lastChild.querySelector(".article-title").textContent = article.title
            lastChild.querySelector(".article-date").textContent = moment([article.date]).fromNow()
            lastChild.setAttribute("data", article._id)
            lastChild.querySelector("a").setAttribute("href", `/article/${article._id}`)
            lastChild.querySelector(".article-image").setAttribute("src", article.image)
            lastChild.querySelector(".author-image").setAttribute("src", article.userIcon)
            lastChild.querySelector(".author-name").textContent = article.userName
            lastChild.querySelector(".teaser").textContent = article.teaser
            lastChild.classList.remove("hide")        
    })  
})



  



