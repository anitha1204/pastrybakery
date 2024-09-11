const Form = require('../model/Form');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: 'gmail',
  auth: {
    user: 'selvam12042003@gmail.com',
    pass: 'jxjj csdq qked wrku'
  }
});

exports.submitForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();

    // Send email
    await transporter.sendMail({
      from: 'selvam12042003@gmail.com',
      to: req.body.emailAddress,
      subject: 'Form Submission Confirmation',
      text: ` ${req.body.fullName}
               ${req.body. emailAddress}
               ${req.body. mobileNumber}
               ${req.body.  course}
               ${req.body.   date}
               ${req.body. message}`
    });

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error: error.message });
  }
};