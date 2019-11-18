console.log('hello world')
var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/hello', function (req, res) {
    res.send({message: "Hello World!!!"})
})

let users = [
    {username: 'alice', password: 'alice', id: '123'},
    {username: 'po', password: 'po', id: '234'},
    {username: 'bob', password: 'bob', id: '345'}
]

const findAllUsers = (req, res) =>
    res.json(users)

app.get('/api/users', findAllUsers);

const badLogin = (req, res) => {
    const username = req.params['username'];
    const password = req.params['password'];
    for(const u in users) {
        if(users[u].username === username && users[u].password === password) {
            res.json(users[u]);
            return;
        }
    }
    res.sendStatus(404).send(null)
}

app.get('/login/:username/:password', badLogin)

const goodLogin = (req, res) => {
    const username = req.body['username']
    const password = req.body['password']
    console.log(username, password)
    for(const u in users) {
        if(users[u].username === username && users[u].password === password) {
            res.json(users[u]);
            return;
        }
    }
    res.sendStatus(404).send(null)
}

app.post('/login', goodLogin);


const deleteUser = (req, res) => {
    const userId = req.params.id;
    users = users.filter(user => user.id != userId);
    res.json(users);
}

app.delete('/api/users/:id', deleteUser)

app.listen('4000')
