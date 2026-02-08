const express = require('express');
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

const router = express.Router();

// POST /api/projects - Create a new project
router.post('/', (req, res) => {
  const { templateId } = req.body;

  if (!templateId) {
    return res.status(400).json({ success: false, error: 'templateId requis' });
  }

  const project = {
    id: uuidv4(),
    templateId,
    photos: {},
    texts: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: false,
    shareLink: null,
  };

  store.projects.set(project.id, project);
  res.status(201).json({ success: true, data: project });
});

// GET /api/projects/:id - Get a project
router.get('/:id', (req, res) => {
  const project = store.projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Projet introuvable' });
  }
  res.json({ success: true, data: project });
});

// PUT /api/projects/:id - Update a project
router.put('/:id', (req, res) => {
  const project = store.projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Projet introuvable' });
  }

  const { photos, texts } = req.body;

  if (photos) project.photos = { ...project.photos, ...photos };
  if (texts) project.texts = { ...project.texts, ...texts };
  project.updatedAt = new Date().toISOString();

  store.projects.set(project.id, project);
  res.json({ success: true, data: project });
});

// POST /api/projects/:id/publish - Publish a project and generate share link
router.post('/:id/publish', (req, res) => {
  const project = store.projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Projet introuvable' });
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  project.published = true;
  project.shareLink = `${frontendUrl}/love/${project.id}`;
  project.updatedAt = new Date().toISOString();

  store.projects.set(project.id, project);
  res.json({ success: true, data: { shareLink: project.shareLink, project } });
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', (req, res) => {
  if (!store.projects.has(req.params.id)) {
    return res.status(404).json({ success: false, error: 'Projet introuvable' });
  }

  store.projects.delete(req.params.id);
  res.json({ success: true, message: 'Projet supprimé' });
});

// GET /api/projects - List all projects (for admin/debug)
router.get('/', (req, res) => {
  const projects = Array.from(store.projects.values());
  res.json({ success: true, data: projects });
});

module.exports = router;
