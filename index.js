const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(
      req.body.username,
      req.body.password
    )

    res.send(result)
 })

app.post('/register', (req, res) => {
  let result = register(
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email
  )

  res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hello Mael!')
})

app.get('/bye', (req, res) => {
    res.send('Bye Bye mael!')
})

app.post('/register', (req, res) => {
   res.send('Account Create!')
})
  
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
      username: "mael",
      password: "12345",
      name: "el",
      email: "syamaail@utem.edu.my"
  },
  {
      username: "malik",
      password: "23456",
      name: "lik",
      email: "malik@utem.edu.my"
  },
  {
      username: "abu",
      password: "34567",
      name: "bu",
      email: "abu@utem.edu.my"
  }
]

function login(reqUsername, reqPassword){
  let matchUser = dbUsers.find(user => user.username == reqUsername)
  if (!matchUser) return "User Not Found!"
  if (matchUser.password == reqPassword)
  {
      return matchUser
  }
  else
  {
      return "Invalid Password"
  }
}

function register(reqUsername, reqPassword, reqName, reqEmail){
    dbUsers.push({
        username: reqUsername,
        password: reqPassword,
        name: reqName,
        email: reqEmail
    })
}