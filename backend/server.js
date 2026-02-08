const express = require('express');
const cors = require('cors');
const path = require('path');
const templatesRouter = require('./routes/templates');
const projectsRouter = require('./routes/projects');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/templates', templatesRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/orders', ordersRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LovePage API is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`LovePage API running on http://localhost:${PORT}`);
});
