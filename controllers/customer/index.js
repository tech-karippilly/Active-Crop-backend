import { Role, User } from "../../models/index.js"

export const createCustomerPage = (req, res) => {
    res.status(200).render('admin/customers/create', { alertMessage: '', alertType: '', redirectUrl: '' })

}

export const customerPage = (req, res) => {
    res.status(200).render('admin/customers/index', { alertMessage: '', alertType: '', redirectUrl: '' })
}
export const updateCustomerPage = async (req, res) => {
    try {
        const { id } = req.params
        const users = await User.findById({ _id: id })
        res.status(200).render('admin/customers/update', { alertMessage: '', alertType: '', redirectUrl: '', user: users })
    } catch (error) {
    }

}


export const getCoustomers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).render('admin/customers/index', { alertMessage: '', alertType: '', redirectUrl: '', customers: users })
    } catch (error) {
        res.status(500).render('admin/customers/index', { alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '', users: users })
    }
}

export const searchCustomers = async (req, res) => {
    try {
        const { searchString } = req.query
        const searchUserCriteria = {
            $or: [
                { firstName: { $regex: searchString, $options: 'i' } },
                { lastName: { $regex: searchString, $options: 'i' } },
                { email: { $regex: searchString, $options: 'i' } },
                { phone: { $regex: searchString, $options: 'i' } }
            ]
        };
        const customers = await User.find(searchUserCriteria);
        res.status(200).render('admin/customers/index', { alertMessage: '', alertType: '', redirectUrl: '', customers: customers })
    } catch (error) {
        res.status(500).render('admin/customers/index', { alertMessage: 'Internal Server Error', alertType: 'Danger', redirectUrl: '', customers: [] })
    }
}

export const getCustomerDetails = async (req, res) => {
    try {
        const user_id = req.params.id
        const users = await User.findById(user_id)
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
        const _id = req.params.id
        const { firstName, lastName, email, password, userName, phone } = req.body
        const userRole = await Role.findOne({ roleName: 'User' });
        
        const filePath = JSON.parse(JSON.stringify(req.file))

        const fileName = `${process.env.HOST_URL}/${filePath.path}`

        const existingUser = await User.findById(_id);

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
            return res.status(200).render('admin/customers/update', { alertMessage: 'User Updated successfully', alertType: 'success', redirectUrl: '/api/customer', user: existingUser })
        }

        res.status(404).render('admin/customers/update', { alertMessage: 'User Not found', alertType: 'warnning', redirectUrl: '', user: existingUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).render('admin/customers/update', { alertMessage: 'Internal server error', alertType: 'success', redirectUrl: '', user: [] });
    }

}

export const toggleUserBlockStatus = async (req, res) => {
    try {
        const user_id = req.params.id
        const status = req.params.status
        const user = await User.findById(user_id);

        if (user) {
            user.isBlocked = status
            user.save()
            return res.status(200).json({ message: "User Status Updated successfully" })
        }
        res.status(404).json({ message: "User Not found" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const deleteCustomer = async (req, res) => {
    try {
        const user_id = req.params.id
        const user = await User.findById(user_id);
        if (user) {
            const delte = await User.deleteOne({ _id: user_id })
            return res.status(200).json({ message: 'User Deleted successfully', redirect: '/api/customer' });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}