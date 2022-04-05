const commentsEl = document.body.querySelector(".right-column")
const showCommentsBtn = document.body.querySelector(".show-comments")
const articleContainerEl = document.body.querySelector(".article-container")

articleContainerEl.addEventListener("click", () => {
    if(window.innerWidth < 1000) {
        commentsEl.classList.remove("right-column-big")
        commentsEl.classList.add("hide-comments")
    }
})

showCommentsBtn.addEventListener("click", () => {
    commentsEl.classList.toggle("right-column-big")
    commentsEl.classList.toggle("hide-comments")
})

const showHideComments = () => {
    if(window.innerWidth < 1000) {
        commentsEl.classList.remove("right-column-big")
        commentsEl.classList.add("hide-comments")
        showCommentsBtn.classList.remove("hide")
    } else {
        commentsEl.classList.remove("hide-comments")
        showCommentsBtn.classList.add("hide")
    }
}

showHideComments()
window.addEventListener("resize", () => showHideComments())