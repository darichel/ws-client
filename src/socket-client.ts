import { Manager, Socket } from "socket.io-client";

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: `Bearer ${token}`,
    }
  });



  const socket = manager.socket("/")

  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatuslabel = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;
  let messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!; 

  socket.on("connect", () => {
    serverStatuslabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatuslabel.innerHTML = "Offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientHtml = "";
    clients.forEach((clientId) => {
      clientHtml += `<li>${clientId}</li>`;
    });
    clientsUl.innerHTML = clientHtml;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "Yo",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on('message-from-server', (payload: { fullname: string; message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullname}:</strong>
        <span>${payload.message}</span>
      </li>
    `;  
    messagesUl.innerHTML += newMessage;
  });

}