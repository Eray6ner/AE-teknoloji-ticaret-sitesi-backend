const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth');

// Favorileri listeleme
router.get('/', authenticateToken, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ user: req.user.userId }).populate('products');
    res.json(favorite ? favorite.products : []);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Favoriye ürün ekleme
router.post('/add', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  try {
    let favorite = await Favorite.findOne({ user: req.user.userId });
    if (!favorite) {
      favorite = new Favorite({ user: req.user.userId, products: [] });
    }
    if (!favorite.products.includes(productId)) {
      favorite.products.push(productId);
      await favorite.save();
    }
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

// Favoriden ürün çıkarma
router.delete('/remove', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  try {
    const favorite = await Favorite.findOne({ user: req.user.userId });
    if (!favorite) return res.status(404).json({ message: 'Favori listesi bulunamadı.' });
    favorite.products = favorite.products.filter(pid => pid.toString() !== productId);
    await favorite.save();
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 