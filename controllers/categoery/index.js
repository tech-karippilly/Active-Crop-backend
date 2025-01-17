import { Categoery } from '../../models/index.js'
import dotenv from 'dotenv';
dotenv.config();

const getCategoery = async (req, res) => {
    try {

        const catagoery = await Categoery.find({})
        res.status(200).json({ catagoery, message: "Sucess", status: 200 })
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).json({ message: "Internal Server Error", status: 500 })
    }
}

const createCategoery = async (req, res) => {

    try {

        const { cataName, description } = req.body

        const cataDetails = await Categoery.findOne({ catagoery_name: cataName })

        if (cataDetails) {
            return res.status(409).json({ message: 'Categoery Already Exists', status: 409 })
        }

        const filePath = JSON.parse(JSON.stringify(req.file))

        const fileName = `${process.env.HOST_URL}/${filePath.path}`
        const catagoery = new Categoery({ catagoery_name: cataName, description: description, image: fileName })
        await catagoery.save()
        res.status(201).json({ message: "Categoery Created Successfully", status: 201 })
    } catch (error) {
        console.log("Error Catergoery create", error.message)
        res.status(500).json({ message: "Internal Server Error", status: 500 })
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
           return res.status(200).json({ message: "Categoery Updated Successfully", status: 200 })
        }
        res.status(404).json({ message: 'Catagoery not found', statis: 404 })
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

export { createCategoery, getCategoery, updateCategoery, deletCategoery }