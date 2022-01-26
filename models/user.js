const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
      },
      job: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (value.length < 2) throw new Error("Invalid job.");
        },
    },
}, {collection : 'users_list'});

module.exports = UserSchema;