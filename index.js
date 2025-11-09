require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,         
  useUnifiedTopology: true,      
})
.then(() => console.log('✅ Conectado a MongoDB correctamente'))
.catch(err => {
  console.error('Error al conectar con MongoDB:', err.message);
  process.exit(1); // Sale del proceso si no logra conectar
});

const moviesRouter = require('./routes/movies.routes.js');

app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🎬 Bienvenido a la API de películas de terror');
});

// IniciO el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
});
