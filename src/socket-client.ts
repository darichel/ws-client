import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");

  addListener(socket);
};

const addListener = (socket: Socket) => {
  const serverStatuslabel = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;

  socket.on("connect", () => {
    serverStatuslabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatuslabel.innerHTML = "Offline";
  });

  //TODO: Listener for "clients-updated"
  socket.on("clients-updated", (clients: string[]) => {
    clientsUl.innerHTML = "";
    clients.forEach((clientId) => {
      const li = document.createElement("li");
      li.innerHTML = clientId;
      clientsUl.appendChild(li);
    });
  });
};
