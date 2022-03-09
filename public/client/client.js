let socket = io();

let userId = new Date().getTime();

document.body.addEventListener('scroll',(userId)=>{
    
    const scrollBuffer = 200
    if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - scrollBuffer){
        const setup = () => {
            socket = io.connect()
        }
        setup()

        const dataNumber = window.innerHeight + document.body.scrollTop - document.body.scrollHeight
        console.log(dataNumber);
        const data = dataNumber + " from bottom, more content to be loaded";

        console.log(document.querySelectorAll(".article"));
        const articles = document.querySelectorAll(".article").length
        console.log(data);

        socket.emit('windowEnd', userId)
    } else {
        // console.log(window.innerHeight + document.body.scrollTop - document.body.scrollHeight - scrollBuffer + " to go");
    }
})

socket.on('message', message => {
    console.log(message);
})

socket.on('privateMessage', message => {
    console.log(message);

    const node = document.querySelectorAll(".article")[0]
    const clone = node.cloneNode(true)

    document.querySelector(".articles-container").appendChild(clone)    
})



  



