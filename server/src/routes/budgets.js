const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all budgets for user
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId: req.user.id },
      include: {
        category: { select: { name: true, color: true, type: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(budgets);
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single budget
router.get('/:id', auth, async (req, res) => {
  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        category: true
      }
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create budget
router.post('/', auth, async (req, res) => {
  try {
    const { amount, period, startDate, endDate, categoryId } = req.body;

    if (!amount || !period || !startDate || !endDate || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['monthly', 'yearly'].includes(period)) {
      return res.status(400).json({ error: 'Period must be either monthly or yearly' });
    }

    // Verify category belongs to user
    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId: req.user.id }
    });

    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const budget = await prisma.budget.create({
      data: {
        amount: parseFloat(amount),
        period,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categoryId,
        userId: req.user.id
      },
      include: {
        category: { select: { name: true, color: true, type: true } }
      }
    });

    res.status(201).json(budget);
  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update budget
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, period, startDate, endDate, categoryId } = req.body;

    const budget = await prisma.budget.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: req.params.id },
      data: {
        amount: amount !== undefined ? parseFloat(amount) : budget.amount,
        period: period || budget.period,
        startDate: startDate ? new Date(startDate) : budget.startDate,
        endDate: endDate ? new Date(endDate) : budget.endDate,
        categoryId: categoryId || budget.categoryId
      },
      include: {
        category: { select: { name: true, color: true, type: true } }
      }
    });

    res.json(updatedBudget);
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete budget
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await prisma.budget.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get budget progress
router.get('/:id/progress', auth, async (req, res) => {
  try {
    const budget = await prisma.budget.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        category: true
      }
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    // Calculate spent amount in budget period
    const spent = await prisma.transaction.aggregate({
      where: {
        userId: req.user.id,
        categoryId: budget.categoryId,
        type: 'expense',
        date: {
          gte: budget.startDate,
          lte: budget.endDate
        }
      },
      _sum: {
        amount: true
      }
    });

    const spentAmount = spent._sum.amount || 0;
    const remaining = budget.amount - spentAmount;
    const progress = (spentAmount / budget.amount) * 100;

    res.json({
      budget,
      spent: spentAmount,
      remaining,
      progress: Math.min(progress, 100),
      isOverBudget: spentAmount > budget.amount
    });
  } catch (error) {
    console.error('Get budget progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 