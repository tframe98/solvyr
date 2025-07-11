const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all categories for user
router.get('/', auth, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.user.id },
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single category
router.get('/:id', auth, async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 10
        },
        budgets: true
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create category
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        type,
        color: color || '#3B82F6',
        icon,
        userId: req.user.id
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update category
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const category = await prisma.category.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: req.params.id },
      data: {
        name: name || category.name,
        type: type || category.type,
        color: color || category.color,
        icon: icon !== undefined ? icon : category.icon
      }
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete category
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await prisma.category.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 