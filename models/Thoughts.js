const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// schema for reactions
const ReactionsSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    username: {
        type: String,
        required: "Please, enter your username"
    },
    reactionBody: {
        type: String,
        required: "Provide your reaction here",
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
    },
    {
    toJSON: {
        getters: true,
        virtuals: true
    } 
    }
);

// schema for thoughts
const ThoughtsSchema = new Schema(
    {
    username: {
        type: String,
        required: "Please, enter your username"
    },
    thoughtText: {
        type: String,
        required: "You can share here your thoughts",
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
  
    reactions: [ReactionsSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// to count reactions
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// to craete thoughts
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;