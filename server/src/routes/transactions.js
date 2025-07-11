const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all transactions for user
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, accountId, categoryId, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      userId: req.user.id,
      ...(accountId && { accountId }),
      ...(categoryId && { categoryId }),
      ...(startDate && endDate && {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          account: { select: { name: true, type: true } },
          category: { select: { name: true, color: true, type: true } }
        },
        orderBy: { date: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit)
      }),
      prisma.transaction.count({ where })
    ]);

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        account: true,
        category: true
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const { amount, type, description, date, accountId, categoryId } = req.body;

    if (!amount || !type || !description || !accountId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' });
    }

    // Verify account and category belong to user
    const [account, category] = await Promise.all([
      prisma.account.findFirst({
        where: { id: accountId, userId: req.user.id }
      }),
      prisma.category.findFirst({
        where: { id: categoryId, userId: req.user.id }
      })
    ]);

    if (!account || !category) {
      return res.status(400).json({ error: 'Invalid account or category' });
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        description,
        date: new Date(date),
        accountId,
        categoryId,
        userId: req.user.id
      },
      include: {
        account: { select: { name: true, type: true } },
        category: { select: { name: true, color: true, type: true } }
      }
    });

    // Update account balance
    const balanceChange = type === 'income' ? amount : -amount;
    await prisma.account.update({
      where: { id: accountId },
      data: { balance: { increment: balanceChange } }
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, type, description, date, accountId, categoryId } = req.body;

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Revert old balance change
    const oldBalanceChange = transaction.type === 'income' ? -transaction.amount : transaction.amount;
    await prisma.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: oldBalanceChange } }
    });

    // Apply new balance change
    const newAmount = amount || transaction.amount;
    const newType = type || transaction.type;
    const newBalanceChange = newType === 'income' ? newAmount : -newAmount;
    await prisma.account.update({
      where: { id: accountId || transaction.accountId },
      data: { balance: { increment: newBalanceChange } }
    });

    // Update transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: req.params.id },
      data: {
        amount: parseFloat(newAmount),
        type: newType,
        description: description || transaction.description,
        date: date ? new Date(date) : transaction.date,
        accountId: accountId || transaction.accountId,
        categoryId: categoryId || transaction.categoryId
      },
      include: {
        account: { select: { name: true, type: true } },
        category: { select: { name: true, color: true, type: true } }
      }
    });

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Revert balance change
    const balanceChange = transaction.type === 'income' ? -transaction.amount : transaction.amount;
    await prisma.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: balanceChange } }
    });

    await prisma.transaction.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 