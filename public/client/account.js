const accountDetailsEl = document.querySelector(".account-details")
const dropDownEl = document.querySelector(".account-dropdown-container")
const changeIconEl = document.querySelector(".change-icon-button")
const changeIconFormEl = document.querySelector(".sub-dropdown-container")
const arrowIconDown = document.querySelector(".fa-caret-down")
const arrowIconUp = document.querySelector(".fa-caret-up")

const showDropdown = () => {
    dropDownEl.classList.toggle("hide")
    dropDownEl.classList.toggle("show")

    arrowIconUp.classList.toggle("hidden")
    arrowIconUp.classList.toggle("show")
    arrowIconDown.classList.toggle("hidden")
    arrowIconDown.classList.toggle("show")
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
    var dropdowns = document.getElementsByClassName("dropdown-container");
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

// Account icon image help switch and popup window
const imageHostingGuideEl = document.body.querySelector(".icon-image-guide-container")
const wrapper = document.body.querySelector(".wrapper")
const closeAccountHelp = document.body.querySelector(".close-account-help")

const accountHelpEl = document.body.querySelector(".account-help")

const showImageHostingGuide = () => {
    imageHostingGuideEl.classList.toggle("hide")
    wrapper.classList.toggle("hidden")
    console.log("clicked");
}

accountHelpEl.addEventListener("click", showImageHostingGuide)
closeAccountHelp.addEventListener("click", showImageHostingGuide)



console.log(imageHostingGuideEl);
console.log(accountHelpEl);