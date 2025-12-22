const express = require('express');
const {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../models/eventModel');

const router = express.Router();

// GET /api/events
router.get('/', async (req, res, next) => {
  try {
    const { department, search } = req.query;
    const events = await listEvents({ department, search });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res, next) => {
  try {
    const ev = await getEventById(req.params.id);
    if (!ev) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(ev);
  } catch (err) {
    next(err);
  }
});

// POST /api/events
router.post('/', async (req, res, next) => {
  try {
    const ev = await createEvent(req.body);
    res.status(201).json(ev);
  } catch (err) {
    next(err);
  }
});

// PUT /api/events/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await updateEvent(req.params.id, req.body);
    if (!updated) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/events/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteEvent(req.params.id);
    if (!ok) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json({ message: 'Event removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
