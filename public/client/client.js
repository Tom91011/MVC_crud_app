const articlesEl = document.querySelectorAll(".article-container-inner")

console.log(articlesEl)

articlesEl.forEach(article => {
    article.addEventListener("mouseover", (e) => {
        const currentArticle = e.currentTarget
        const articlePreview = currentArticle.querySelector(".article-preview")
        articlePreview.classList.remove("none")
    })

    article.addEventListener("mouseout", (e) => {
        const currentArticle = e.currentTarget
        const articlePreview = currentArticle.querySelector(".article-preview")
        articlePreview.classList.add("none")
    })

        


})

// articlesEl.addEventListener("mouseover", (e) => {
//    console.log(e.target);
// })