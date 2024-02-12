
import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import admin from 'firebase-admin'
import Joi from 'joi'
import debug from 'debug'
import { validateRegister } from '../helpers/validator.js'


const authController = {
    
    createUser: async (req, res) => {

        const {error, value} = validateRegister(req.body)
        if (error){
            res.status(400).send(error.details[0].message);
            return;
        }


        const user = req.body;

        try {
            await admin.auth().getUserByEmail(user.email);

            res.status(400).json({ message: "Email already registered" })
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                try {
                    
                    const userResponse = await admin.auth().createUser({
                        email: user.email,
                        password: user.password,
                        emailVerified: false,
                        disabled: false
                    })
                    
                    const newUser = new User({
                        username: user.username,
                        email: user.email,
                        address: user.address,
                        password: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString(),
                        uid: userResponse.uid,
                        userType: 'Client'
                    })

                    await newUser.save() 
                   
                    res.status(201).json({ 
                        status: true, 
                    message: "Registration successful" })
                  
                } catch (error) {
                    res.status(500).json({ status: false, error: "Error creating user" })
                }
            }

        }

    },

    loginUser: async (req, res) => {

        try {
            const user = await User.findOne({email: req.body.email}, {__v:0, updatedAt: 0, createdAt: 0, email: 0})
            !user && res.status(401).json("Wrong credentwials")

            const decryptedpassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
            const decrypted = decryptedpassword.toString(CryptoJS.enc.Utf8);

            decrypted != req.body.password && res.status(401).json("Wrong password")

            const userToken = jwt.sign({
                id: user._id, userType:user.userType, email: user.email 
            }, process.env.JWT_SEC, {expiresIn: '21d'});

            const {password, email, ...others} = user._doc;

            res.status(200).json({...others, userToken});
        } catch(error) {

            res.status(500).json({status: false, error: error.message})

        }

    }
};

export default authController;