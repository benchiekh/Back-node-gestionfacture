const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const Facture = require('../models/Facture'); // Adjust the path as needed

// POST route to add a new facture for a user
router.post('/:userId/add', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { amount, Date_fact, Date_paie, Type_paie, Etat_paie, Nom_fourniseur } = req.body;

        // Create the facture
        const newFacture = new Facture({
            amount,
            Date_fact,
            Date_paie,
            Type_paie,
            Etat_paie,
            Nom_fourniseur
        });

        // Save the facture
        const savedFacture = await newFacture.save();

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the facture ID to the user's facture array
        user.facture.push(savedFacture._id);

        // Save the updated user with the facture reference
        await user.save();

        res.status(201).json(savedFacture);
    } catch (error) {
        console.error("Error adding facture for user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
