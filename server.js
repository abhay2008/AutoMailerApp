const express = require("express")
const app = express()
const server = require("http").Server(app)
app.use(express.json())

let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    auth: {
        user: 'imaginediscorduto@gmail.com',
        pass: 'xlpo qvyw xsxb bdha'
    },
    host: "smtp.gmail.com",
})

app.post("/send-mail", (req, res) => {
    const to = req.body.to
    const amount = req.body.amount
    const date = req.body.date
    const name = req.body.name
    const mailData = {
        from: "",
        to: to,
        subject: "Why can't you pay your payments?",
        html: ` <p>
                    What is your problem ${name}?
                </p>
                <p>
                    This is an order to pay your payment of amount - ${amount} which is due - ${date}
                </p>
                <p>
                    If you don't make the payment I will sue you.
                </p>
                <p>
                    Waiting for suing you,
                        PassionFruit
                </p>`
    }
    transporter.sendMail(mailData, (error, info) => {
        if (error) {return console.log(error)}
        res.status(200).send({ message: "Order sent!", message_id: info.messageId })
    })
})

server.listen(process.env.PORT || 3030)