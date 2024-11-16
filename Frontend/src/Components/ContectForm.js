import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from "@mui/material";

function ContactForm({ onAddContact, editingContact, onUpdateContact }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (editingContact) {
      setContact(editingContact);
    }
  }, [editingContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      onUpdateContact(contact);
    } else {
      onAddContact(contact);
    }
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <Box
    component="form"
    onSubmit={handleFormSubmit}
    sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      {editingContact ? "Edit Contact" : "Add Contact"}
    </Typography>

    <TextField
      label="First Name"
      name="firstName"
      value={contact.firstName}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Last Name"
      name="lastName"
      value={contact.lastName}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Email"
      name="email"
      value={contact.email}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Phone Number"
      name="phoneNumber"
      value={contact.phoneNumber}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Company"
      name="company"
      value={contact.company}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Job Title"
      name="jobTitle"
      value={contact.jobTitle}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
    />

    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
      {editingContact ? "Update Contact" : "Add Contact"}
    </Button>
  </Box>
  );
}

export default ContactForm;