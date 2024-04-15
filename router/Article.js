const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const Article = require('../models/Article');// Adjust the path as needed

// POST route to add a new article for a user
router.post('/:userId/add', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { Prix_Unitaire_HT,Description, Quantite, Total_HT  } = req.body;

        // Create the article
        const newArticle = new Article({
            Prix_Unitaire_HT,
            Description,
            Quantite,
            Total_HT
        });

        // Save the article
        const savedArticle = await newArticle.save();

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the article ID to the user's article array
        user.article.push(savedArticle._id);

        // Save the updated user with the article reference
        await user.save();

        res.status(201).json(savedArticle);
    } catch (error) {
        console.error("Error adding article for user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
