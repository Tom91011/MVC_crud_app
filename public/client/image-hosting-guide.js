const imageHostingGuideEl = document.body.querySelector(".image-hosting-guide-container")
const wrapper = document.body.querySelector(".wrapper")
const closeHelp = document.body.querySelector(".close")

const helpEl = document.body.querySelector(".help")

const showImageHostingGuide = () => {
    imageHostingGuideEl.classList.toggle("hide")
    wrapper.classList.toggle("hidden")
}

helpEl.addEventListener("click", showImageHostingGuide)
closeHelp.addEventListener("click", showImageHostingGuide)



console.log(imageHostingGuideEl);
console.log(helpEl);