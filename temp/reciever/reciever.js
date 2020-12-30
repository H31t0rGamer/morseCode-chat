const socket = io()

const rd = document.querySelector("#mensagemRecebida")

let id;

new URLSearchParams(window.location.search).forEach((value, name) => {
    if(name == "id"){
        id = value;
        socket.emit("enter", id)

        socket.on("reciever", (data) => {
            if(data == "\b"){
                const rdList = rd.innerText.split("")

                rdList[rdList.lenght-1] = "";

                rd.innerText = "";

                rdList.map(d => {
                    rd.innerText += d;
                })
                
            } else {
                rd.innerText += data;
            }
        })
    }
})
