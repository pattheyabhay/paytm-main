const express =  require('express');
const zod  = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account }  = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const router = express.Router();

// SIGNUP BODY
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post('/signup', async (req, res) =>{
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email Already Taken || incorrect inputs !!"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email Already Taken || incorrect inputs !!"
        })
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = User._id; 

    // Creating Account with initial Random balance
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({    //jwt.sign() used to generate JSON web token
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token : token
    })
})

// SIGNIN BODY
const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post("/signin", async (req, res)=> {
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Invalid Inputs || Email Already Taken !!!"
        })
    }

    const user = User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);

        res.status(200).json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message :  "error while loggin in"
    })
})

// UPDATE BODY

const updateBody = zod.object({
    password: zod.string().optional(), 
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } =  updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information!!!"
        })
    }
    await User.updateOne({_id: req.userId}, req.body)
    res.json({
        message: "updated successfully !!!"
    })
})

router.get("/bulk", async (req, res) =>{
    const filter = req.query.filter || "";

    const users = User.find({
        $or: [{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id,
        }))
    })
})


module.exports = router;                                                                                                                                                                                                                                                                                    