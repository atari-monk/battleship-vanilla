const messageBox = document.getElementById('message-box')

export const messageType = {
  info: 'info',
  error: 'error',
}

export function showMessage(message, type = 'info', duration = 0) {
  messageBox.className = `message-box ${type}`
  messageBox.textContent = message
  messageBox.style.display = 'block'

  if (duration === 0) return
  setTimeout(() => {
    messageBox.style.display = 'none'
  }, duration)
}
