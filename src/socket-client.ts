import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");

  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatuslabel = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;
 const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
 const messageInput = document.querySelector<HTMLInputElement>("#message-input")!;

  socket.on("connect", () => {
    serverStatuslabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatuslabel.innerHTML = "Offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientHtml = '';
    clients.forEach( clientId => {
      clientHtml += `<li>${ clientId }</li>`;
    })
    clientsUl.innerHTML = clientHtml;
  });

  messageForm.addEventListener('submit',  (event) => {
    event.preventDefault();
    if(messageInput.value.trim().length <= 0) return;

    //console.log({ id: 'Yo', message: messageInput.value });

    socket.emit('message-front-client', { id: 'Yo', message: messageInput.value });

    messageInput.value = '';
  })


};
