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
    let token = generateToken(result)
    res.send(token)
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

app.get('/bye', verifyToken, (req, res) => {
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

const jwt = require('jsonwebtoken');
function generateToken(userData) 
{
  const token = jwt.sign
  (
    userData,
     'inipassword'
  );
    return token
}

function generateToken(userData)
{
  const Token = jwt.sign
  (
    userData,
    'inipassword',
    {expiresIn: 60}
  );
  return Token
}

function verifyToken(req, res, next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err) {
      res.send("Invalid Token")  
  }

  req.user = decoded
  next()
  });
}