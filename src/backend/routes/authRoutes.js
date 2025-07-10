const express = require('express');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();

// Kullanıcı kayıt (register) endpoint'i
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  // Basit veri doğrulama
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
  }
  try {
    // Kullanıcı mevcut mu kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Bu e-posta ile zaten kayıt olunmuş.' });
    }
    // Kullanıcıyı kaydet
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Kayıt başarılı!' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
});

module.exports = router; 