let socket;



// const setup = () => {
//     socket = io.connect('http://localhost:4000')
// }
// setup()

// let dataa = "test"
// socket.emit('mouse', dataa)

document.body.addEventListener('scroll',()=>{
    const setup = () => {
        socket = io.connect('http://localhost:4000')
    }
    setup()
    
    const scrollBuffer = 0
    if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - scrollBuffer){
        // loadImages();
        const data = window.innerHeight + document.body.scrollTop - document.body.scrollHeight + " from bottom, more content to be loaded";

        
        console.log(data);

        socket.emit('windowEnd', data)

        

        // console.log("scrolled to bottom");
        // console.log("visible height: " + window.innerHeight);
        // console.log("scollY: " + document.body.offsetTop);
        // console.log("scroll top: " + document.body.scrollTop)
        // console.log("total height: " + document.body.scrollHeight);
    } else {
        console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
    }
})



