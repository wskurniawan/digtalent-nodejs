import nodemailer from 'nodemailer'

export function sendMailNotification(text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  
  transporter.sendMail({
    from: process.env.EMAIL,
    to: 'wisnu.kurniawan@mail.ugm.ac.id',
    subject: 'Notifikasi',
    text: text
  }, (err, info) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(info)
  })
}