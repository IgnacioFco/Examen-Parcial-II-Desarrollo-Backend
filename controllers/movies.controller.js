const Movie = require('../models/movie');

// Obtener todas
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'No encontrado' });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido o error: ' + err.message });
  }
};

// Crear nueva
exports.createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const saved = await newMovie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar
exports.updateMovie = async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrar
exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: `Película ${deleted.title} eliminada` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
