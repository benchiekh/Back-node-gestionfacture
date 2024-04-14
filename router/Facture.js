const express = require('express');
const router = express.Router();
const  Facture = require('../models/Facture'); 


router.post('/', async (req, res) => {
    try {
        const { amount, contactId } = req.body;
        const facture = new Facture({
            amount: amount,
          
        });
        const savedFacture = await facture.save();
        res.status(201).json(savedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const factures = await Facture.find();
        res.json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id).populate('contact');
        if (!facture) {
            return res.status(404).json({ error: 'Facture not found' });
        }
        res.json(facture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedFacture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFacture = await Facture.findByIdAndDelete(req.params.id);
        res.json(deletedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
