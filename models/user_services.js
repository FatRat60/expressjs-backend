const mongoose = require('mongoose');
const UserSchema = require("./user");

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection("", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function getUsers(id, name, job){
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (id === undefined && name === undefined && job === undefined){
        result = await userModel.find();
    }
    else if (id && !name && !job){
        result = await findUserById(id);
    }
    else if (!id && name && !job){
        result = await findUserByName(name);
    }
    else if (!id && !name && id){
        result = await findUserByJob(job);
    }
    return result;
}

async function addUser(user){
    // userModel is a Model, a subclass of mongoose.Model
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        // You can use a model to create a new documents using 'new' and
        // passing the JSON conten of the document
        const usertoAdd = new userModel(user);
        const savedUser = await usertoAdd.save();
        return savedUser;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

async function findUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'id':id});
}

async function findUserByName(name){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'name':name});
}

async function findUserByJob(job){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'job':job});
}

exports.getUsers = getUsers;
exports.addUser = addUser;