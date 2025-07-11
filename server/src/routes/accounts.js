const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all accounts for user
router.get('/', auth, async (req, res) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json(accounts);
  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single account
router.get('/:id', auth, async (req, res) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 10
        }
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create account
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, balance, currency } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' });
    }

    const account = await prisma.account.create({
      data: {
        name,
        type,
        balance: balance || 0,
        currency: currency || 'USD',
        userId: req.user.id
      }
    });

    res.status(201).json(account);
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update account
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, type, balance, currency } = req.body;

    const account = await prisma.account.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const updatedAccount = await prisma.account.update({
      where: { id: req.params.id },
      data: {
        name: name || account.name,
        type: type || account.type,
        balance: balance !== undefined ? balance : account.balance,
        currency: currency || account.currency
      }
    });

    res.json(updatedAccount);
  } catch (error) {
    console.error('Update account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete account
router.delete('/:id', auth, async (req, res) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await prisma.account.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 