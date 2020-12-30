
const socket = io()

const point = document.querySelector("#point")
const trace = document.querySelector("#trace")
const esp = document.querySelector("#espaço")
const del = document.querySelector("#delete")

let id;

new URLSearchParams(window.location.search).forEach((value, name) => {
    if(name == "id"){
        id = value;


        point.onclick = () => {
            socket.emit("sender", ".", id)
        }

        trace.onclick = () => {
            socket.emit("sender", "-", id)
        }

        esp.onclick = () => {
            socket.emit("sender", "/", id)
        }

        del.onclick = () => {
            socket.emit("sender", "\b", id)
        }

        window.addEventListener("keydown", (e) => {
            const key = e.key;

            switch(key){
                case '.': {
                    socket.emit("sender", ".", id)
                    break;
                }
                case '-': {
                    socket.emit("sender", "-", id)
                    break;
                }
                case '/': {
                    socket.emit("sender", "/", id)
                    break;
                }
                case 'Backspace': {
                    socket.emit("sender", "\b", id)
                    break;
                }
            }
        })
    }
})

