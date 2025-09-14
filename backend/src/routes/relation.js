import { Router } from 'express';
import mongoose from 'mongoose';
import { Relation } from '../models/Relation.js';

const router = Router();

router.get('/getAll', async (req, res) => {
  try {
    const data = await Relation.find().populate('from to').sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch relations' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { from, to, relation } = req.body || {};
    if (!from || !to || !relation) {
      return res.status(400).json({ message: 'from, to and relation are required' });
    }
    if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).json({ message: 'from/to must be valid Mongo ObjectIds' });
    }
    const created = await Relation.create({ from, to, relation: String(relation).trim() });
    // Populate the user data before returning
    const populated = await Relation.findById(created._id).populate('from to');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating relation:', err);
    res.status(500).json({ message: 'Failed to create relation' });
  }
});

router.post('/get', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body || {};
    if (!user1Id || !user2Id) return res.status(400).json({ message: 'user1Id and user2Id required' });
    if (!mongoose.Types.ObjectId.isValid(user1Id) || !mongoose.Types.ObjectId.isValid(user2Id)) {
      return res.status(400).json({ message: 'user1Id/user2Id must be valid Mongo ObjectIds' });
    }

    // Get all relations to build the graph
    const allRelations = await Relation.find().populate('from to');

    // Build adjacency list and user map
    const graph = {};
    const userMap = {};

    allRelations.forEach(relation => {
      const fromId = relation.from._id.toString();
      const toId = relation.to._id.toString();

      // Build user map
      userMap[fromId] = relation.from.name;
      userMap[toId] = relation.to.name;

      // Initialize graph nodes if they don't exist
      if (!graph[fromId]) graph[fromId] = [];
      if (!graph[toId]) graph[toId] = [];

      // Add bidirectional connections
      graph[fromId].push(toId);
      graph[toId].push(fromId);
    });

    // DFS to find all paths between two users (as per original implementation)
    const findAllPaths = (start, end) => {
      const paths = [];
      const maxDepth = 5; // Prevent infinite loops
      const maxPaths = 5; // Return top 5 paths as per original

      const dfs = (current, target, path, visited) => {
        // If we reached the destination, add this path
        if (current === target) {
          paths.push([...path]);
          return;
        }

        // Prevent paths that are too long
        if (path.length >= maxDepth) {
          return;
        }

        // Limit to top 5 paths
        if (paths.length >= maxPaths) {
          return;
        }

        // Get neighbors of current node
        const neighbors = graph[current] || [];
        for (const neighbor of neighbors) {
          // Only add if the neighbor is not already in the path (avoid cycles)
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            path.push(neighbor);
            dfs(neighbor, target, path, visited);
            path.pop();
            visited.delete(neighbor);
          }
        }
      };

      const visited = new Set([start]);
      dfs(start, end, [start], visited);

      return paths;
    };

    const paths = findAllPaths(user1Id, user2Id);

    // Convert paths to user names
    const namedPaths = paths.map(path =>
      path.map(userId => userMap[userId] || 'Unknown User')
    );

    console.log('Searching from:', userMap[user1Id], 'to:', userMap[user2Id]);
    console.log('Found paths:', namedPaths);
    res.json(namedPaths);
  } catch (err) {
    console.error('Error finding relation paths:', err);
    res.status(500).json({ message: 'Failed to fetch relation paths' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'invalid relation id' });
    }
    const deleted = await Relation.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'relation not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete relation' });
  }
});

export default router;


