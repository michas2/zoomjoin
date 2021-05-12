const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
//app.use(bodyParser.text({type: '*/*'}));

app.get('/', (req, res) => {
  console.log("get")
  console.log(req.headers)
  res.send('Welcome!!')
})

app.post('/notification', (req, res) => {
  if (!req.is('application/json')) {
    console.log("not json");
    console.log(req.headers)
    res.send(400);
  } else if (!req.headers['authorization'] == "CNHwZ_Z6RKqj9ymYwmp0Og") {
    console.log("not authorized");
    console.log(req.headers)
    res.send(400);
  } else {
    console.log("all is well");
    console.log(req.headers)
    console.log(req.body)
    console.log("=======================")
    console.log(req.body.event)
    console.log(req.body.payload.object.participant.user_name)
    console.log(req.body.payload.object.participant.join_time)
    console.log(req.body.payload.object.participant.leave_time)
    console.log("+++++++++++++++++++++++")
  }
  res.send('Chat received')
})


app.listen(port, () => console.log(`Listening on port ${port}!`))
