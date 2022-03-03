const articlesEl = document.querySelectorAll(".teaser")

articlesEl.forEach(article => {
    console.log(article);
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