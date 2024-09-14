const Form = require('../model/Form'); // Adjust the path if necessary
const nodemailer = require('nodemailer');

// Submit form handler
exports.submitForm = async (req, res) => {
  try {
    const { fullName, emailAddress, mobileNumber, location, message} = req.body;

    // Validate that all required fields are present in the request
    if (!fullName || !mobileNumber || !emailAddress || !message || !location ) {
      return res.status(400).json({
        message: 'Validation Error: All fields are required.',
        error: 'One or more required fields are missing.'
      });
    }

    // Create and save the new form entry
    const newForm = new Form(req.body);
    await newForm.save();

    // Send email
    await send(fullName, emailAddress, mobileNumber, location, message);

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
// const send = async (fullName, emailAddress, mobileNumber, location, message) => {
//     try {
//       console.log("data", fullName, emailAddress, mobileNumber, location, message);
  
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'Deepalisacademy@gmail.com',
//           pass: 'irwq xzwt kkfq qntq', // Replace with your app password
//         },
//       });
  
//       const mailOptions = {
//         from: 'Deepalisacademy@gmail.com',
//         to: [emailAddress],
//         subject: 'Form Submission Confirmation',
//         text: `
//           Full Name: ${fullName}
//           Email Address: ${emailAddress}
//           Mobile Number: ${mobileNumber}
//           Location: ${location}
//           Message: ${message}`
//       };
  
//       await transporter.sendMail(mailOptions);
//       console.log("Mail sent successfully");
//     } catch (error) {
//       console.error("Error sending email:", error.message);
//     }
//   };



const send = async (fullName, emailAddress, mobileNumber, location, message) => {
  try {
    console.log("data", fullName, emailAddress, mobileNumber, location, message);

    // Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Deepalisacademy@gmail.com',
        pass: 'irwq xzwt kkfq qntq', // Replace with your app password
      },
    });

    // Email 1: Confirmation to the user
    const userMailOptions = {
      from: 'Deepalisacademy@gmail.com',
      to: emailAddress,  // Sending to user's email
      subject: 'Thank You for Submitting the Form',
      text: `Dear ${fullName},\n\nThank you for submitting the form. We have received your details and will get back to you shortly.\n\nBest regards,\nDeepali's Academy`
    };

    // Email 2: Detailed email to Deepalisacademy@gmail.com
    const academyMailOptions = {
      from: 'Deepalisacademy@gmail.com',
      to: 'Deepalisacademy@gmail.com',  // Sending to your academy email
      subject: 'New Form Submission',
      text: `Form Details:\n\n
      Full Name: ${fullName}\n
      Email Address: ${emailAddress}\n
      Mobile Number: ${mobileNumber}\n
      Location: ${location}\n
      Message: ${message}`
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(academyMailOptions);

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

