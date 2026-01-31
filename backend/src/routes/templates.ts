import { Router, Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get all templates
router.get('/', async (req: Request, res: Response) => {
  try {
    // TODO: Fetch from database
    res.json({
      templates: [
        {
          id: '1',
          name: 'React App',
          description: 'A basic React application',
          language: 'javascript',
          framework: 'react',
          category: 'web',
        },
        {
          id: '2',
          name: 'Express API',
          description: 'A RESTful API with Express',
          language: 'javascript',
          framework: 'express',
          category: 'api',
        },
        {
          id: '3',
          name: 'Python Flask',
          description: 'A Flask web application',
          language: 'python',
          framework: 'flask',
          category: 'web',
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Get template by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Fetch from database
    res.json({
      id,
      name: 'Sample Template',
      files: [],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch template' });
  }
});

// Create template (authenticated users only)
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, language, framework, category, files } = req.body;
    // TODO: Save to database
    res.status(201).json({
      id: 'new-template-id',
      name,
      description,
      authorId: req.user?.id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

export default router;
