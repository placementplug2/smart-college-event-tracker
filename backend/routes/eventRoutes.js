const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// GET /api/events
router.get('/', async (req, res, next) => {
  try {
    const { department, search } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// POST /api/events
router.post('/', async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

// PUT /api/events/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
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
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json({ message: 'Event removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
