const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const logs = []

app.get('/', (req, res) => {
  res.write("event log:\n")
  res.write('========\n')
  logs.forEach(([type,name,time]) => res.write(`${type}\t${time}\t${name}\n`))
  res.write('========\n')
  res.end()
})

app.post('/notification', (req, res) => {
  if (req.is('application/json') && req.headers['authorization'] == "CNHwZ_Z6RKqj9ymYwmp0Og" ) {
    switch (req.body.event) {
      case "meeting.participant_joined":
        logs.push(["join", req.body.payload.object.participant.user_name, req.body.payload.object.participant.join_time]);break
      case "meeting.participant_left":
        logs.push(["left", req.body.payload.object.participant.user_name, req.body.payload.object.participant.leave_time]);break
      default:
        console.log("unexpected type: " + req.body.event)
    }
    res.sendStatus(204)
  } else {
    console.log("invalid request")
    console.log(req.headers)
    res.sendStatus(400)
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}!`))
