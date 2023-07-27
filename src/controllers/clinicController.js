import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error the server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}