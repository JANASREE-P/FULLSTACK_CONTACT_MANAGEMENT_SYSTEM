const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

router.post('/contacts', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();

        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.put('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { contactId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.json(contact);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.json({
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;