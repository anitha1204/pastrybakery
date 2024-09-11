const Form = require('../model/Form'); // Adjust the path if necessary
const nodemailer = require('nodemailer');

// Submit form handler
exports.submitForm = async (req, res) => {
  try {
    const { fullName, mobileNumber, emailAddress, message, course, timeSlot } = req.body;

    // Validate that all required fields are present in the request
    if (!fullName || !mobileNumber || !emailAddress || !message || !course || !timeSlot) {
      return res.status(400).json({
        message: 'Validation Error: All fields are required.',
        error: 'One or more required fields are missing.'
      });
    }

    // Create and save the new form entry
    const newForm = new Form(req.body);
    await newForm.save();

    // Send email
    await send(fullName, emailAddress, mobileNumber, course, message, timeSlot);

    res.status(201).json({ message: 'Form submitted successfully', form: newForm });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error: error.message });
  }
};

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching forms', error: error.message });
  }
};

// Function to send email
const send = async (fullName, emailAddress, mobileNumber, course, message, timeSlot) => {
    try {
      console.log("data", fullName, emailAddress, mobileNumber, course, message, timeSlot);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'selvam12042003@gmail.com',
          pass: 'jxjj csdq qked wrku', // Replace with your app password
        },
      });
  
      const mailOptions = {
        from: 'selvam12042003@gmail.com',
        to: [emailAddress, 'anithas12042003@gmail.com'],
        subject: 'Form Submission Confirmation',
        text: `
          Full Name: ${fullName}
          Email Address: ${emailAddress}
          Mobile Number: ${mobileNumber}
          Course: ${course}
          Time Slot: ${timeSlot}
          Message: ${message}`
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Mail sent successfully");
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  };
