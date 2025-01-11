import {Role, User} from '../../../models/index.js'

async function getUser(req,res){
    res.status(200).send('working')
}

async function createUser(req,res){
    const {firstName,lastName,email,password,userName,phone} = req.body

    try{

        const userRole = await Role.findOne({ roleName:'User' });
        const user ={
            firstName,
            lastName,
            email,
            phone,
            password,
            userName,
            isBlocked:false,
            role:userRole._id
        }
         
        
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
          }

          const newUser = new User(user);
          await newUser.save();
          res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function resetPassword(req,res){
    res.status(200).send('working')
}

export {
    getUser,
    createUser,
    resetPassword
}