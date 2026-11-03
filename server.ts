import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route for lead submissions
  app.post('/api/lead', async (req: Request, res: Response) => {
    try {
      const { name, phone, service, date } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Имя должно содержать от 2 символов' });
      }

      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, error: 'Укажите номер телефона' });
      }

      if (!service || typeof service !== 'string') {
        return res.status(400).json({ success: false, error: 'Выберите услугу' });
      }

      if (!date || typeof date !== 'string') {
        return res.status(400).json({ success: false, error: 'Выберите дату' });
      }

      const botToken = process.env.BOT_TOKEN;
      const chatId = process.env.CHAT_ID;

      if (botToken && chatId) {
        const text = `Новая заявка с сайта ГРАДЪ:\nИмя: ${name.trim()}\nТелефон: ${phone}\nУслуга: ${service}\nДата: ${date}`;

        try {
          const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text,
            }),
          });

          if (!tgResponse.ok) {
            const errData = await tgResponse.text();
            console.error('Telegram API error response:', errData);
          }
        } catch (tgErr) {
          console.error('Failed to dispatch telegram notification:', tgErr);
        }
      } else {
        console.log('[Demo Mode] Lead received (BOT_TOKEN or CHAT_ID not configured):', {
          name: name.trim(),
          phone,
          service,
          date,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Заявка принята. Перезвоним в течение 15 минут.',
      });
    } catch (error) {
      console.error('Error handling /api/lead:', error);
      return res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ГРАДЪ Barbershop' });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
