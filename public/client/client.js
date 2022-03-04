document.body.addEventListener('scroll',()=>{
    const scrollBuffer = 200
    if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - scrollBuffer){
        // loadImages();
        console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight + " from bottom, more content to be loaded");
        // console.log("scrolled to bottom");
        // console.log("visible height: " + window.innerHeight);
        // console.log("scollY: " + document.body.offsetTop);
        // console.log("scroll top: " + document.body.scrollTop)
        // console.log("total height: " + document.body.scrollHeight);
    } else {
        console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
    }
})