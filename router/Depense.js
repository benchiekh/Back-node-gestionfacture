const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const Depense = require('../models/Depense');// Adjust the path as needed

// POST route to add a new depense for a user
router.post('/:userId/add', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { Categorie,Date_paie, Etat_paie, Prix  } = req.body;

        // Create the depense
        const newDepense = new Depense({
            Categorie,
            Date_paie,
            Etat_paie,
            Prix
        });

        // Save the depense
        const savedDepense = await newDepense.save();

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the depense ID to the user's depense array
        user.depense.push(savedDepense._id);

        // Save the updated user with the depense reference
        await user.save();

        res.status(201).json(savedDepense);
    } catch (error) {
        console.error("Error adding depense for user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET depense by ID
router.get('/:depenseId', async (req, res) => {
    try {
        const depenseId = req.params.depenseId;

        // Find the depense by ID
        const depense = await Depense.findById(depenseId);

        if (!depense) {
            return res.status(404).json({ message: "Depense not found" });
        }

        res.status(200).json(depense);
    } catch (error) {
        console.error("Error fetching Depense by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// PUT route to update a depense by ID
router.put('/:depenseId', async (req, res) => {
    try {
        const depenseId = req.params.depenseId;
        const { Categorie,Date_paie, Etat_paie, Prix } = req.body;

        // Update the depense using findOneAndUpdate
        const updatedDepense = await Depense.findOneAndUpdate(
            { _id: depenseId },
            { $set: { 
                Categorie,
                Date_paie,
                Etat_paie,
                Prix
            }},
            { new: true }
        );

        if (!updatedDepense) {
            return res.status(404).json({ message: "Depense not found" });
        }

        res.status(200).json(updatedDepense);
    } catch (error) {
        console.error("Error updating depense by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE route to delete a depense by ID
router.delete('/:depenseId', async (req, res) => {
    try {
        const depenseId = req.params.depenseId;

        // Find the depense by ID and delete it
        const deletedDepense = await Depense.findByIdAndDelete(depenseId);

        if (!deletedDepense) {
            return res.status(404).json({ message: "Depense not found" });
        }

        res.status(200).json({ message: "Depense deleted successfully" });
    } catch (error) {
        console.error("Error deleting article by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;