import { Router, Request, Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';
import { config } from '../config';
import { AIProvider } from '@vivecode/shared';

const router = Router();

// AI Chat/Completion endpoint
router.post('/chat', async (req: AuthRequest, res: Response) => {
  try {
    const { provider, prompt, context, model } = req.body;

    // TODO: Check user's AI prompt usage limit
    
    let response;
    switch (provider as AIProvider) {
      case AIProvider.OPENAI:
        response = await callOpenAI(prompt, context, model);
        break;
      case AIProvider.GEMINI:
        response = await callGemini(prompt, context, model);
        break;
      case AIProvider.PERPLEXITY:
        response = await callPerplexity(prompt, context, model);
        break;
      case AIProvider.OPENROUTER:
        response = await callOpenRouter(prompt, context, model);
        break;
      case AIProvider.EDEN_AI:
        response = await callEdenAI(prompt, context, model);
        break;
      case AIProvider.LONGCAT_AI:
        response = await callLongcatAI(prompt, context, model);
        break;
      default:
        return res.status(400).json({ error: 'Invalid AI provider' });
    }

    // TODO: Track usage in database
    
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'AI request failed' });
  }
});

// Get user's AI usage stats
router.get('/usage', async (req: AuthRequest, res: Response) => {
  try {
    // TODO: Fetch from database
    res.json({
      promptsUsed: 0,
      promptsLimit: config.ai.promptLimitPerWeek,
      weekStartDate: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage stats' });
  }
});

// Helper functions for each AI provider
async function callOpenAI(prompt: string, context?: string, model?: string) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: model || 'gpt-4',
      messages: [
        ...(context ? [{ role: 'system', content: context }] : []),
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${config.ai.openai.apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return {
    provider: AIProvider.OPENAI,
    response: response.data.choices[0].message.content,
    tokensUsed: response.data.usage.total_tokens,
  };
}

async function callGemini(prompt: string, context?: string, model?: string) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-pro'}:generateContent?key=${config.ai.gemini.apiKey}`,
    {
      contents: [{
        parts: [{
          text: context ? `${context}\n\n${prompt}` : prompt,
        }],
      }],
    }
  );
  return {
    provider: AIProvider.GEMINI,
    response: response.data.candidates[0].content.parts[0].text,
    tokensUsed: 0,
  };
}

async function callPerplexity(prompt: string, context?: string, model?: string) {
  const response = await axios.post(
    'https://api.perplexity.ai/chat/completions',
    {
      model: model || 'pplx-7b-chat',
      messages: [
        ...(context ? [{ role: 'system', content: context }] : []),
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${config.ai.perplexity.apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return {
    provider: AIProvider.PERPLEXITY,
    response: response.data.choices[0].message.content,
    tokensUsed: response.data.usage?.total_tokens || 0,
  };
}

async function callOpenRouter(prompt: string, context?: string, model?: string) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: model || 'openai/gpt-3.5-turbo',
      messages: [
        ...(context ? [{ role: 'system', content: context }] : []),
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        'Authorization': `Bearer ${config.ai.openrouter.apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return {
    provider: AIProvider.OPENROUTER,
    response: response.data.choices[0].message.content,
    tokensUsed: response.data.usage?.total_tokens || 0,
  };
}

async function callEdenAI(prompt: string, context?: string, model?: string) {
  // Eden AI implementation
  return {
    provider: AIProvider.EDEN_AI,
    response: 'Eden AI response (implementation needed)',
    tokensUsed: 0,
  };
}

async function callLongcatAI(prompt: string, context?: string, model?: string) {
  // Longcat AI implementation
  return {
    provider: AIProvider.LONGCAT_AI,
    response: 'Longcat AI response (implementation needed)',
    tokensUsed: 0,
  };
}

export default router;
