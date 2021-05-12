const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

//app.use(bodyParser.json())
app.use(bodyParser.text({type: '*/*'}));

app.get('/', (req, res) => {
  console.log("get")
  console.log(req.headers)
  res.send('Welcome!')
})

app.post('/notification', (req, res) => {
  console.log(req.headers)
  console.log(req.body)
  res.send('Chat received')
})


app.listen(port, () => console.log(`Listening on port ${port}!`))
