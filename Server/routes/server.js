const express = require('express');
const router = express.Router();
const Contact = require('../model/models');
router.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  
    if (!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const existingContact = await Contact.findOne({ email });
      if (existingContact) {
        return res.status(400).json({ message: 'Email already exist' });
      }
  
      const newContact = new Contact({
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle
      });
  

      await newContact.save();
      res.status(201).json({ message: 'Contact added success', contact: newContact });
    } catch (err) {
      console.error('Error saving contact:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  router.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).send('Error retrieving contacts: ' + err.message);
    }
  });
  
 
  router.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName,lastName, email, phoneNumber } = req.body;
  
    try {
      if (!firstName || !lastName  || !email || !phoneNumber) {
        return res.status(400).send('All fields are required.');
      }
  
      const updatedContact = await Contact.findByIdAndUpdate(id, {firstName, lastName, email, phoneNumber }, { new: true });
      if (!updatedContact) {
        return res.status(404).send('Contact not found.');
      }
  
      res.status(200).send('Contact updated succes.');
    } catch (err) {
      res.status(500).send('Error updating contact: ' + err.message);
    }
  });

  router.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
           const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
           return res.status(404).send('Contacts not ound.');
      }
  
       res.status(200).send('Contact deleted success');
    } catch (err) {
           res.status(500).send('Error deleting: ' + err.message);
    }
  });
  module.exports = router;