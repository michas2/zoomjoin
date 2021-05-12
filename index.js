const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

const logs = []

app.use(bodyParser.json())
//app.use(bodyParser.text({type: '*/*'}));

app.get('/', (req, res) => {
  console.log("get")
  console.log(req.headers)
  res.write("current log:\n")
  res.write('========\n')
  logs.forEach(([type,name,time])=> res.write(`${type}\t${time}\t${name}`))
  res.write('========\n')
  res.end()
})

app.post('/notification', (req, res) => {
  if (!req.is('application/json')) {
    console.log("not json")
    console.log(req.headers)
    res.send(400)
  } else if (!req.headers['authorization'] == "CNHwZ_Z6RKqj9ymYwmp0Og") {
    console.log("not authorized")
    console.log(req.headers)
    res.send(400);
  } else {
    console.log("all is well")
    console.log(req.headers)
    console.log(req.body)
    if(req.body.event == "meeting.participant_joined") {
      const participant = req.body.payload.object.participant
      console.log("======== join =========")
      console.log(participant.user_name)
      console.log(participant.join_time)
      console.log("+++++++++++++++++++++++")
      logs.push(["join", participant.user_name, participant.join_time])
    } else if(req.body.event == "meeting.participant_left") {
      const participant = req.body.payload.object.participant
      console.log("======== leave ========")
      console.log(participant.user_name)
      console.log(participant.leave_time)
      console.log("+++++++++++++++++++++++")
      logs.push(["left", participant.user_name, participant.leave_time])
    } else {
      console.log("unexpected type: " + req.body.event)
    }
  }
  res.send('Chat received')
})


app.listen(port, () => console.log(`Listening on port ${port}!`))
