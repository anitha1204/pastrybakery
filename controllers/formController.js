// const Form = require('../model/Form'); // Adjust the path if necessary
// const nodemailer = require('nodemailer');

// // Submit form handler
// exports.submitForm = async (req, res) => {
//   try {
//     const { fullName, emailAddress, mobileNumber, location, message} = req.body;

//     // Validate that all required fields are present in the request
//     if (!fullName || !mobileNumber || !emailAddress || !message || !location ) {
//       return res.status(400).json({
//         message: 'Validation Error: All fields are required.',
//         error: 'One or more required fields are missing.'
//       });
//     }

//     // Create and save the new form entry
//     const newForm = new Form(req.body);
//     await newForm.save();

//     // Send email
//     await send(fullName, emailAddress, mobileNumber, location, message);

//     res.status(201).json({ message: 'Form submitted successfully', form: newForm });
//   } catch (error) {
//     res.status(400).json({ message: 'Error submitting form', error: error.message });
//   }
// };

// // Get all forms
// exports.getForms = async (req, res) => {
//   try {
//     const forms = await Form.find();
//     res.status(200).json(forms);
//   } catch (error) {
//     res.status(400).json({ message: 'Error fetching forms', error: error.message });
//   }
// };

// // Function to send email
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





const Form = require('../model/Form'); // Adjust the path if necessary
const nodemailer = require('nodemailer');

// Submit form handler
exports.submitForm = async (req, res) => {
  try {
    const { fullName, emailAddress, mobileNumber, location, message } = req.body;

    // Validate that all required fields are present in the request
    if (!fullName || !mobileNumber || !emailAddress || !message || !location) {
      return res.status(400).json({
        message: 'Validation Error: All fields are required.',
        error: 'One or more required fields are missing.'
      });
    }

    // Create and save the new form entry
    const newForm = new Form(req.body);
    await newForm.save();

    // Send emails
    await sendConfirmationEmail(fullName, emailAddress, mobileNumber, location, message);
    await sendNotificationEmail(fullName, emailAddress, mobileNumber, location, message);

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

// Create a reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Deepalisacademy@gmail.com',
      pass: 'irwq xzwt kkfq qntq', // Make sure this is the correct app password
    },
  });
};

// Function to send confirmation email to the user
const sendConfirmationEmail = async (fullName, emailAddress, mobileNumber, location, message) => {
  try {
    console.log("data", fullName, emailAddress, mobileNumber, location, message);
  
    const transporter = createTransporter();

    const mailOptions = {
      from: 'Deepalisacademy@gmail.com',
      to: emailAddress, // Send to the user's email address
      subject: 'Thank you for your form submission',
      text: `
            Dear ${fullName},

                 Thank you for submitting the form. We have received the following details:
                 We appreciate your interest and will get back to you soon.

                 Best regards,
                 Deepali's Academy
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};

// Function to send notification email to the predefined email address
const sendNotificationEmail = async (fullName, emailAddress, mobileNumber, location, message) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: 'Deepalisacademy@gmail.com',
      to: 'Deepalisacademy@gmail.com', // The predefined email address
      subject: 'New Form Submission',
      text: `
              Full Name: ${fullName}
              Email Address: ${emailAddress}
              Mobile Number: ${mobileNumber}
              Location: ${location}
              Message: ${message}`
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully");
  } catch (error) {
    console.error("Error sending notification email:", error.message);
  }
};
