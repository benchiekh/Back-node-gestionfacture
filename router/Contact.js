const express = require('express');
const router = express.Router();
const Contact = require('./models/Contact'); // Adjust the path as needed
const User = require('./models/User'); // Adjust the path as needed

// POST route to add a new contact
router.post('/contacts', async (req, res) => {
    try {
        // Extract contact data from request body
        const { nom, prenom, entreprise, telephone, email, adresse } = req.body;

        // Create a new contact
        const newContact = new Contact({
            nom,
            prenom,
            entreprise,
            telephone,
            email,
            adresse
        });

        // Save the new contact
        const savedContact = await newContact.save();

        // Update user's contacts array
        const userId = req.body.userId; // Assuming userId is sent in the request body
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.contacts.push(savedContact._id);
        await user.save();

        res.status(201).json(savedContact);
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
