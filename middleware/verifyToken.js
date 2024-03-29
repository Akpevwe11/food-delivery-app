import pkg from 'jsonwebtoken';
const { verify } = pkg;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader){
        const token = authHeader.split('')[1]
        verify(token, process.env.JWTSEC, async (err, user) => {
            if(err){
                res.status(403).json({status: false, message: 'invalid token'});
            }
            req.user = user;
            next();
        })
    }
}

const verifyAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Client" || req.user.userType === "Vendor" || req.user.userType === "Admin" || req.user.userType === "Driver"){
            next();
        }else {
            res.status(403).json({status: false, message:"You are not authorized"});
        }
    })
}

const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Vendor" || req.user.userType === "Admin"){
            next();
        }else {
            res.status(403).json({status: false, message:"You are not authorized"});
        }
    })
}

const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Driver" || req.user.userType === "Admin"){
            next();
        }else {
            res.status(403).json({status: false, message:"You are not authorized"});
        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin"){
            next();
        }else {
            res.status(403).json({status: false, message:"You are not authorized"});
        }
    })
}


export default {verifyToken, verifyAuthorization, verifyVendor, verifyDriver, verifyAdmin}