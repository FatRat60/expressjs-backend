const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Imp!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined || job != undefined){
        let result;
        if (name != undefined && job != undefined){
            result = findUserByNameJob(name, job);
        }
        else if (name != undefined){
            result = findUserByName(name);
        }
        else{
            result = findUserByJob(job);
        }
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByJob = (job) => {
    return users['users_list'].filter( (user) => user['job'] === job);
}

const findUserByNameJob = (name, job) => {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; 
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else{
        result = {users_list: result};
        res.send(result);
    }
});

function idGen(length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function findUserById(id){
    return users['users_list'].find( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const id = idGen(6);
    userToAdd.id = id;
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    if (id != undefined){
        let result = findUserById(id);
        if (result === undefined || result.length == 0)
            res.status(404).send("User not found.");
        else{
            let index = users['users_list'].indexOf(result);
            users['users_list'].splice(index, 1);
            res.status(204).send("User deleted.");
        }
    }
    else{
        res.status(404).send("User not found.");
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});