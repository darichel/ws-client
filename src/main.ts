import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client!</h2>
    <input id="jwtToken" placeholder="JWT Token" />
    <button id="connectBtn">Connect</button>
    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input 
        id="message-input"
      />
    </form>

    </h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;
const connectBtn = document.querySelector<HTMLButtonElement>('#connectBtn')!;

connectBtn.addEventListener('click', () => {
  let token = jwtToken.value.trim();
  if (token.length <= 0) {
    alert('Please enter a JWT token');
    return;
  }

  connectToServer(token);
})




//connectToServer();


