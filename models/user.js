const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    activated: {
        type: Boolean,
        default: false
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: String,
        default: 'member'
    },
    type: {
        type: String,
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps: true});

// Virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Methods
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("SHA256", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model("User", userSchema);