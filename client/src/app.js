import { getRandomNumber } from '/shared/src/index.js'

console.log(getRandomNumber(1, 10))

const socket = io('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})

socket.on('ping', (message) => {
  const messagesDiv = document.getElementById('messages')
  const newMessage = document.createElement('div')
  newMessage.className = 'message'
  newMessage.textContent = message
  messagesDiv.appendChild(newMessage)

  // Scroll to the bottom
  messagesDiv.scrollTop = messagesDiv.scrollHeight
})
