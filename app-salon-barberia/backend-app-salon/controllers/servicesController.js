import  Services from '../models/Services.js' 
import colors from 'colors'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createService = async (req, res) => {
   if(Object.values(req.body).includes('')){
    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({
        msg: error.message
    })
   }
   try {
        const service = new Services(req.body)
        await service.save()
        res.json({
            msg: 'El Servicio se creo correctamente'
        })   
    } catch {
        console.log(colors.red(error))
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async (req, res) => {
    const { id } = req.params
    //Validar un object id 
    if(validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }
    //Mostrar el servicio
    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params
    //Validar un object id 
    if(validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }

    //Escribimos en el objeto los valores nuevos
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price
    service.description = req.body.description || service.description

    try {
        await service.save()
        res.json({
            msg: 'El servicio se actualizo correctamente'
        })
    } catch (error) {
        console.log(colors.red(error))
    }
}


const deleteService = async (req, res) => {
    const { id } = req.params
    //Validar un object id 
    if(validateObjectId(id, res)) return
    //Validar que exista
    const service = await Services.findById(id)
    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }

    try {
        await service.deleteOne()
        res.json({
            msg: "El servicio se eliminó correctamente"
        })

    } catch(error){
        console.log(colors.red(error))
    }
}


export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
}