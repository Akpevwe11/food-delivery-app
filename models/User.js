const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    uid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: Array, required: false},
    phone: {type: String, required: false},
    userType: {type: String, required: true, default: "Client", enum: ['Admin', 'Agent', 'Client', 'Landlord']},
    profile: {
        type: String, required: true, default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema)