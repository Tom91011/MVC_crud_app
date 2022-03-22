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