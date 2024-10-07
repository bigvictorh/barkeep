// app.js
const { swaggerUi, swaggerDocs } = require('./swagger');
const express = require('express');
require('dotenv').config(); //load environment variables
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const recipeIngredientRoutes = require('./routes/recipe-ingredients');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001', // Only allow requests from this origin
}));


// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/recipes', authMiddleware, recipeRoutes);
app.use('/api/ingredients', authMiddleware, ingredientRoutes);
app.use('/api/recipe-ingredients', authMiddleware, recipeIngredientRoutes);

// Swagger API Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use((req, res, next) => {
  console.log('Request received: ', req.method, req.url);
  console.log('CORS headers: ', res.get('Access-Control-Allow-Origin'));
  next();
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

module.exports = app;
