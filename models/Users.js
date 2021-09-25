const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: "Please, provide your username",
        trim: true
    },
    email: {
        type: String,
        required: "Please, provide valid email",
        unique: true,
        //regular expression to verify email address 
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

// to count friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// to create user
const Users = model('Users', UsersSchema);

module.exports = Users;

