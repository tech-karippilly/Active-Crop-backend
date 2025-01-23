import { Categoery } from '../../models/index.js'
import dotenv from 'dotenv';
dotenv.config();

export const createCatagoeryPage = (req,res)=>{
    res.status(200).render('admin/categoery/create',{ alertMessage: '', alertType: '', redirectUrl: '',data:[] })
}

export const catagoeryPage =(req,res)=>{
    res.status(200).render('admin/categoery/index',{ alertMessage: '', alertType: '', redirectUrl: '',data:[] }) 
}


const getCategoery = async (req, res) => {
    try {
        console.log('working')

        const catagoery = await Categoery.find({})
       
        res.status(200).render('admin/categoery/index',{ alertMessage: '', alertType: '', redirectUrl: '',data:catagoery }) 
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).render('admin/categoery/index',{ alertMessage: 'Internal Server Error', alertType: '', redirectUrl: '',data:catagoery }) 
    }
}

const createCategoery = async (req, res) => {

    try {

        const { cataName, description } = req.body

        const cataDetails = await Categoery.findOne({ catagoery_name: cataName })

        if (cataDetails) {
            return  res.status(409).render('admin/categoery/create',{ alertMessage: 'Categoery Already Exits', alertType: 'warnning', redirectUrl: '',}) 
        }

        const filePath = JSON.parse(JSON.stringify(req.file))

        const fileName = `${process.env.HOST_URL}/${filePath.path}`
        const catagoery = new Categoery({ catagoery_name: cataName, description: description, image: fileName })
        await catagoery.save()
        res.status(201).render('admin/categoery/create',{ alertMessage: 'Categoery Created Successfully', alertType: 'success', redirectUrl: '/api/categoery', }) 
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).render('admin/categoery/create',{ alertMessage: 'Internal Server error', alertType: 'danger', redirectUrl: '' }) 
    }
}

export const updateCatagoeryPage = async (req,res)=>{
    try{
      
        const {id} = req.params
       
        const catagoery = await Categoery.findById({_id:id})
        console.log('catagoery',catagoery)
        res.status(200).render('admin/categoery/update',{ alertMessage: '', alertType: '', redirectUrl: '',data:catagoery }) 
    }catch(error){
       return res.status(500).render('admin/categoery/update',{ alertMessage: 'Internal server Error', alertType: 'danger', redirectUrl: '',data:[] }) 
    }
    
}

const updateCategoery = async (req, res) => {

    try {
        const cata_id = req.params.id
        const { cataName, description } = req.body

        const cataDetails = await Categoery.findById(cata_id);

        if (cataDetails) {
            const filePath = JSON.parse(JSON.stringify(req.file))
            const fileName = `${process.env.HOST_URL}/${filePath.path}`
            cataDetails.catagoery_name = cataName
            cataDetails.description = description
            cataDetails.image = fileName

            await cataDetails.save()
            
           return res.status(200).json({message:'Catagoery Updated Succssfully ' ,}) 
        }
        res.status(404).render('admin/categoery/update',{ alertMessage: 'Categoery Not  Found', alertType: 'Dnager', redirectUrl: '',data:{} }) 
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

const deletCategoery = async (req, res) => {
    try {
        const cata_id = req.params.id
        const cataDetails = await Categoery.findById(cata_id)
        if (cataDetails) {
            const deleteCatagoery = await Categoery.deleteOne({ _id: cata_id })
            console.log(deleteCatagoery)
            if(deleteCatagoery.deletedCount ===1){
                return res.status(200).json({ message: "Categoery Deleted Successfully", status: 200 })
            }
            return res.status(400).json({ message: "Bad Request", status: 400 })
        }
        res.status(404).json({ message: "Categoery Not Found", status: 204 })
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}
const searchCategoery = async (req,res) =>{
    try{
        const {searchString} = req.query
        console.log(searchString)
        const catagoery = await Categoery.find({catagoery_name:{$regex: searchString, $options: 'i' }})
        res.status(200).render('admin/categoery/index',{ alertMessage: '', alertType: '', redirectUrl: '',data:catagoery }) 
    }catch(error){
        res.status(500).render('admin/categoery/index',{ alertMessage: 'Internal Server Error', alertType: '', redirectUrl: '',data:catagoery }) 
    }
}

export { createCategoery, getCategoery, updateCategoery, deletCategoery ,searchCategoery}