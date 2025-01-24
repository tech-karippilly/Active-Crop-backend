import { Role, User } from "../../models/index.js"

export const createCustomerPage = (req, res) => {
    console.log(working)
    try{

        res.status(200).render('admin/customers/create', { alertMessage: '', alertType: '', redirectUrl: '' })
    }catch(error){
        console.log(error)
        res.status(200).render('admin/customers/create', { alertMessage: '', alertType: '', redirectUrl: '' })
    }
   
}

export const customerPage = (req, res) => {
    res.status(200).render('admin/customers/index', { alertMessage: '', alertType: '', redirectUrl: '' })
}
export const updateCustomerPage = (req, res) => {
    res.status(200).render('admin/customers/update', { alertMessage: '', alertType: '', redirectUrl: '' })
}


export const getCoustomers = async (req, res) => {
    try {
        const users = await  User.find({})
        res.status(200).render('admin/customers/index', { alertMessage: '', alertType: '', redirectUrl: '',customers:users })
    } catch (error) {
        res.status(500).render('admin/customers/index', { alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '',users:users })
    }
}

export const getCustomerDetails = async (req, res) => {
    try {
        const user_id = req.params.id
        const users = await  User.findById(user_id)
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

export const createCustomer = async (req, res) => {
    const { firstName, lastName, email, password, userName, phone } = req.body

    try {
        const userRole = await Role.findOne({ roleName: 'User' });

        const filePath = JSON.parse(JSON.stringify(req.file))

        const fileName = `${process.env.HOST_URL}/${filePath.path}`
        const user = {
            firstName,
            lastName,
            email,
            phone,
            password,
            userName,
            isBlocked: false,
            role: userRole._id,
            profileImage: fileName
        }


        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

        if (existingUser) {
            return res.status(400).render('admin/customers/create', { alertMessage: 'Username or email already exists', alertType: 'warnning', redirectUrl: '' })
        }


        const newUser = new User(user);
        await newUser.save();
        res.status(201).render('admin/customers/create', { alertMessage: 'User created successfully', alertType: 'scuccess', redirectUrl: '/api/customer' })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).render('admin/customers/create', { alertMessage: 'Internal server error', alertType: 'danger', redirectUrl: '' })
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const user_id = req.params.id
        const { firstName, lastName, email, password, userName, phone } = req.body

        try {
            const userRole = await Role.findOne({ roleName: 'User' });

            const filePath = JSON.parse(JSON.stringify(req.file))

            const fileName = `${process.env.HOST_URL}/${filePath.path}`

            const existingUser = await User.findById(user_id);

            if (existingUser) {
                existingUser.firstName = firstName
                existingUser.email = email
                existingUser.lastName = lastName
                existingUser.phone = phone
                existingUser.password = password
                existingUser.userName = userName
                existingUser.isBlocked = false
                existingUser.role = userRole._id,
                    existingUser.profileImage = fileName

                await existingUser.save();
                return res.status(200).render('admin/customers/update', { alertMessage: 'User Updated successfully', alertType: 'success', redirectUrl: '/api/customer' })
            }

            res.status(404).render('admin/customers/update', { alertMessage: 'User Not found', alertType: 'success', redirectUrl: '' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).render('admin/customers/update', { alertMessage: 'Internal server error', alertType: 'success', redirectUrl: '' });
        }
    } catch (error) {
        res.status(500).render('admin/customers/update', { alertMessage: 'Internal server error', alertType: 'success', redirectUrl: '' });
    }
}

export const toggleUserBlockStatus = async (req, res) => {
    try {
        const user_id = req.params.id
        const { status } = req.body
        const user = await User.findById(user_id);

        if (user) {
            user.isBlocked = status
            user.save()
            return res.status(200).render('admin/customers/index', { alertMessage: 'User Status Updated successfully', alertType: 'success', redirectUrl: '',users:users })
        }
        res.status(404).render('admin/customers/index', { alertMessage: 'User Not found', alertType: 'warnning', redirectUrl: '',users:users })
    } catch (error) {
        res.status(500).render('admin/customers/index', { alertMessage: 'Internal Server Error', alertType: 'danger', redirectUrl: '',users:users })
    }
}


export const deleteCustomer = async (req, res) => {
    try {
        const user_id = req.params.id
        const user = await User.findById(user_id);
        if (user) {
            const delte = await User.deleteOne({_id:user_id})
            return res.status(200).json({ message: 'User Deleted successfully', });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}