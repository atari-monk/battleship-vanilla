const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from Node.js server!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})