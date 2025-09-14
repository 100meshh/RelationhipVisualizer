import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name } = req.body || {};
  if (!name || !String(name).trim()) return res.status(400).json({ message: 'name is required' });
  const user = await User.create({ name: String(name).trim() });
  res.status(201).json(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'user not found' });
  res.status(204).end();
});

export default router;


