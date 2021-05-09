const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.post('/receive', (req, res) => {
  console.log(req.body)
  res.send('Chat received')
})


app.listen(port, () => console.log(`Listening on port ${port}!`))
