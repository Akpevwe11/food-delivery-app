import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    uid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: Array, required: false},
    phone: {type: String, required: false},
    userType: {type: String, required: true, default: "Client", enum: ['Admin', 'Agent', 'Client', 'Landlord']},
    profile: {
        type: String, 
        required: true, 
        default: 'https://picsum.photos/200/300'
    }
}, {timestamps: true});

export default model('User', UserSchema)