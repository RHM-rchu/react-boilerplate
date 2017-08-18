import express from "express"
import fs from "fs"
import dotenv from "dotenv"
// import mysql from "mysql"
const app = express()

dotenv.config({
    silent: true
})

app.set('port', (process.env.API_SERVER_PORT || 3002))

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'))
  })
}

app.use(function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Headers', req.headers.origin);
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Content-Type', 'application/json')
  // res.setHeader('Access-Control-Allow-Headers', 'http://localhost:3002')
  res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  // res.setHeader('charset', 'utf-8')
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.get('/api/users', (req, res) => {
  let clinics = []
  for (let i=1; i<=67; i++) {
    clinics.push({
      clinicUid: i,
      clinic: `GRP-${i}`,
      email: `test${i}@test.com`,
      rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    })
  }

  const COLUMNS = [
    'clinicUid',
    'clinic',
    'email',
    'rand',
  ]

  res.json(
    clinics.map((entry) => {
      const e = {}
      COLUMNS.forEach((c) => {
        e[c] = entry[c]
      })
      return e
    })
  )
})




app.listen(app.get('port'), () => {
  console.log(`Running: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
