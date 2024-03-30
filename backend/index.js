const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello My King')
})
app.get('/jxn', (req, res) => {
  res.send('Hello My King')
})

app.use(express.json())     // this is added so that we can use json file as a response 
app.use(cors())

app.use('/api/auth',require('./routes/auth'))     // app.use is used so that we can use other saved file as response rather than wirting all code in same file which makes a big fuss here 
app.use('/api/notes',require('./routes/notes'))   // it is not necessary to use '/api/' everytime we use app.use

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

connectToMongo();