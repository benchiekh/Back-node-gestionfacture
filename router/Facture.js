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
// GET facture by ID
router.get('/:factureId', async (req, res) => {
    try {
        const factureId = req.params.factureId;

        // Find the facture by ID
        const facture = await Facture.findById(factureId);

        if (!facture) {
            return res.status(404).json({ message: "Facture not found" });
        }

        res.status(200).json(facture);
    } catch (error) {
        console.error("Error fetching facture by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// PUT route to update a facture by ID
router.put('/:factureId', async (req, res) => {
    try {
        const factureId = req.params.factureId;
        const { amount, Date_fact, Date_paie, Type_paie, Etat_paie, Nom_fourniseur } = req.body;

        // Update the facture using findOneAndUpdate
        const updatedFacture = await Facture.findOneAndUpdate(
            { _id: factureId },
            { $set: { 
                amount, 
                Date_fact,
                Date_paie,
                Type_paie,
                Etat_paie,
                Nom_fourniseur 
            }},
            { new: true }
        );

        if (!updatedFacture) {
            return res.status(404).json({ message: "Facture not found" });
        }

        res.status(200).json(updatedFacture);
    } catch (error) {
        console.error("Error updating facture by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// DELETE route to delete a facture by ID
router.delete('/:factureId', async (req, res) => {
    try {
        const factureId = req.params.factureId;

        // Find and delete the facture by ID
        const deletedFacture = await Facture.findByIdAndDelete(factureId);

     
        // Update the users who have this facture
        await User.updateMany(
            { facture: factureId },
            { $pull: { facture: factureId } }
        );

        res.status(200).json({ message: "Facture deleted successfully" });
    } catch (error) {
        console.error("Error deleting facture by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
