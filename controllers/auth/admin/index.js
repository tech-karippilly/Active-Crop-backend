
async function adminLogin(req,res){
    console.log('working')
    res.status(200).send('working')
}

async function adminLogout(req,res){
    res.status(200).send('working')
}


export {adminLogin,adminLogout}