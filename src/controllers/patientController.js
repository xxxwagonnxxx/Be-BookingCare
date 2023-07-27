import patientService from '../services/patientServices';

let postBookAppointmnet = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointmnet(req.body);
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
let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await paitentService.postVerifyBookAppointment(req.body);
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
    postBookAppointmnet: postBookAppointmnet,
    postVerifyBookAppointment: postVerifyBookAppointment
}