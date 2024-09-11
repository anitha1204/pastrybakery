const Form = require('../model/Form');

exports.submitForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully', form: newForm });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error: error.message });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching forms', error: error.message });
  }
};