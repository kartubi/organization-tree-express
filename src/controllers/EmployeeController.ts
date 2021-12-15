/* IMPORT MODELS */
import Employee from "../models/Employee"
/* IMPORT LIBRARY SEQUELIZE */
import Sequelize from "sequelize";

/* GET ALL DATA */
export const getAll = async (req, res) => {
    try {
        const employee = await Employee.findAll()

        let arr = []
        for (let i = 0; i < employee.length; i++) {

            let directReportId = employee[i]['direct_reports'].split(',')
            var Op = Sequelize.Op

            let obj = {
                'employeeId': employee[i]['id'],
                'name': employee[i]['name'],
                'status': employee[i]['status'] == 1 ? 'active' : 'inactive',
                'manager': await Employee.findByPk(employee[i]['id']),
                'directReports': await Employee.findAll({
                    where: {
                        id: {
                            [Op.in]: directReportId
                        }
                    }
                }),
            }
            arr.push(obj)
        }

        res.json(isSuccess('Success Get Data !', arr))
    } catch (e) {
        res.json(isFailed('Something Wrong !', []))
    }
}


/* GET DATA BY ID*/
export const showById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id)

        if (employee == null) {
            res.status(404);
            res.json(isFailed('Data Not Found !', []))
        }

        let directReportId = employee['direct_reports'].split(',')

        var Op = Sequelize.Op

        let obj = {
            'employeeId': employee['id'],
            'name': employee['name'],
            'status': employee['status'] == 1 ? 'active' : 'inactive',
            'manager': await Employee.findByPk(employee['id']),
            'directReports': await Employee.findAll({
                where: {
                    id: {
                        [Op.in]: directReportId
                    }
                }
            }),
        }

        res.json(isSuccess('Success Get Data !', obj))
    } catch (e) {
        res.json(isFailed('Something Wrong !', []))
    }
}


/* CREATE DATA */
export const store = async (req, res) => {
    try {
        const employee = await Employee.create({
            name: req.body.name,
            manager_id: req.body.manager_id,
            direct_reports: req.body.direct_reports,
            status: req.body.status
        })

        res.json(isSuccess('Success Store Data !', employee))
    } catch (e) {
        res.status(400);
        res.json(isFailed('Something Wrong !', e))
    }
}

/* UPDATE DATA BY ID*/
export const update = async (req, res) => {
    try {
        const employee = await Employee.update({
            name: req.body.name,
            manager_id: req.body.manager_id,
            direct_reports: req.body.direct_reports,
            status: req.body.status
        }, {
            where: {
                id: req.params.id
            }
        })

        if (employee == 0) {
            res.status(404);
            res.json(isFailed('Data Not Found !', []))
        }

        res.json(isSuccess('Success Update Data !', []))
    } catch (e) {
        res.status(404);
        res.json(isFailed('Something Wrong !', e))
    }
}

/* DELETE DATA BY ID */
export const destroy = async (req, res) => {
    try {
        const employee = await Employee.destroy({
            where: {
                id: req.params.id
            }
        })

        if (employee == 0) {
            res.status(404);
            res.json(isFailed('Data Not Found !', []))
        }

        res.json(isSuccess('Success Delete Data !', employee))
    } catch (e) {
        console.log(e)
        res.json(isFailed('Something Wrong !', []))
    }
}


function baseResponse(success, message, data): object {
    return {
        'success': success,
        'message': message,
        'data': data
    }
}

function isSuccess(message, data): object {
    return baseResponse(true, message, data)
}

function isFailed(message, data): object {
    return baseResponse(false, message, data)
}