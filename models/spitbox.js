const mongoose = require('mongoose');

const Spitbox = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
    },
    mode: {
        type: String,
    },
    host: {
        type: String
    },
    participants: {
        type: Array,
    },
    battle: {
        started: {
            type: Boolean,
            default: false
        },
        round: {
            current: {
                type: Number
            },
            round1: {
                progress: {
                    type: Boolean,
                    default: false
                },
                winner: {
                    type: String,
                }
            },
            round2: {
                progress: {
                    type: Boolean,
                    default: false,
                },
                winner: {
                    type: String,
                }
            },
            round3: {
                progress: {
                    type: Boolean,
                    default: false,
                },
                winner: {
                    type: String,
                }
            },
        },
    },
    messages: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model("Spitbox", Spitbox);