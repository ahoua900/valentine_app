const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

const router = express.Router();

const PRODUCTS = {
  book: { name: "Livre d'Amour", price: 29.99 },
  calendar: { name: 'Calendrier Personnalisé', price: 19.99 },
  frame: { name: 'Cadre Photo', price: 24.99 },
  poster: { name: 'Poster Grand Format', price: 14.99 },
};

// POST /api/orders - Create a new order
router.post('/', (req, res) => {
  const { projectId, productId, shipping } = req.body;

  if (!projectId || !productId || !shipping) {
    return res.status(400).json({
      success: false,
      error: 'projectId, productId et shipping requis',
    });
  }

  const product = PRODUCTS[productId];
  if (!product) {
    return res.status(400).json({ success: false, error: 'Produit invalide' });
  }

  const project = store.projects.get(projectId);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Projet introuvable' });
  }

  const { name, email, address, city, zip, country } = shipping;
  if (!name || !email || !address || !city || !zip) {
    return res.status(400).json({
      success: false,
      error: 'Informations de livraison incomplètes',
    });
  }

  const order = {
    id: uuidv4(),
    projectId,
    productId,
    productName: product.name,
    price: product.price,
    shipping: { name, email, address, city, zip, country: country || 'France' },
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  store.orders.set(order.id, order);
  res.status(201).json({ success: true, data: order });
});

// GET /api/orders/:id - Get an order
router.get('/:id', (req, res) => {
  const order = store.orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Commande introuvable' });
  }
  res.json({ success: true, data: order });
});

// GET /api/orders - List all orders
router.get('/', (req, res) => {
  const orders = Array.from(store.orders.values());
  res.json({ success: true, data: orders });
});

module.exports = router;
