export const createCustomerPage = (req,res)=>{
    res.status(200).render('admin/customers/create',{ alertMessage: '', alertType: '', redirectUrl: '' })
}

export const customerPage =(req,res)=>{
    res.status(200).render('admin/customers/index',{ alertMessage: '', alertType: '', redirectUrl: '' }) 
}
export const updateCustomerPage =(req,res)=>{
    res.status(200).render('admin/customers/update',{ alertMessage: '', alertType: '', redirectUrl: '' }) 
}
