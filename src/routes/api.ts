import express from "express"

import {
    destroy,
    getAll, showById,
    store, update
} from "../controllers/EmployeeController";


const api = express.Router()

api.get('/employee', getAll)

api.get('/employee/:id', showById)

api.post('/employee', store)

api.put('/employee/:id', update)

api.delete('/employee/:id', destroy)

api.get('/test', (req, res) => {
    let text = "1,2,3,4"
    let arr = text.split(',')

    res.send(arr)

})

export default api