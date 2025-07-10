const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Route dosyalarını import et
const cartRoutes = require('./routes/cartRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware'ler
app.use(cors());
app.use(express.json());

// Route'ları kullan
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/auth', authRoutes);

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/aeteknoloji', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB\'ye başarıyla bağlandı.'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
// Temel bir test rotası (API endpoint)
app.get('/', (req, res) => {
  res.send('MERN Backend Sunucusu Çalışıyor!');
});
