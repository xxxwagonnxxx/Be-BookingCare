require('dotenv').config();
import { reject } from 'lodash';
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, //generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, //generated ethereal password
        },
    });

    // send email with defind transport object
    let info = await transporter.sendMail({
        from: '"trungduc" <nguyentrungduc051100@gmail.com> ',// send address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmali(dataSend),
    });
}

let getBodyHTMLEmali = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin chào ${dataSend.patientName}</h3>
     <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p> 
     <p>Thông tin đặt lịch khám bệnh:</p>
     <div><b>Thời gian: ${dataSend.time}</b></div>
     <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
     <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới
     để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
     </p>
     <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
     <div>Xin chân thành cảm ơn</div>
    `
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Hello ${dataSend.PatientName}</h3>
        <p>You received this email because you booked an online medical appointment on BookingCare</p>
        <p>Information to book an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click the link below
        to confirm and complete the medical appointment booking procedure
        </p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Thank you very much</div>
       `
    }
    return result;
}

let getBodyHTMLEmaliRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p> 
        <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm</p>
        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Hello ${dataSend.PatientName}</h3>
        <p>You received this email because you booked an online medical appointment on BookingCare</p>
        <div>Thank you very much</div>
        `
    }
    return result
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            //create reusable transporter obj using the default SMTP transport
            let transport = nodemailer.createTransport({
                host: 'stmp.gmail.com',
                port: 587,
                secure: false, // true for 465, false other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                }
            });
            // send mail with defined transport obj
            let info = await transporter.sendMail({
                from: '',
                to: dataSend.email, // list of receivers
                subject: 'Kết quả đặt lịch khám bệnh', //Subject line
                html: getBodyHTMLEmaliRemedy(dataSend),
                attachments: [
                    {
                        //encoded string as an attachment
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split('base64,')[1],
                        encoding: 'base64'
                    }
                ]
            })
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}