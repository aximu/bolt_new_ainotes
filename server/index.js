// 导入必要的模块
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

// 配置 CORS 和中间件
app.use(cors());
app.use(express.json());

// 设置 Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// WebSocket 连接处理
io.on('connection', (socket) => {
  console.log('Client connected');

  // 处理音频数据
  socket.on('audioData', (data) => {
    // TODO: 实现语音识别逻辑
    // 这里应该集成实际的语音识别服务
    socket.emit('transcription', {
      id: Date.now(),
      speaker: '系统',
      content: '收到音频数据，等待处理...',
      timestamp: new Date().toLocaleTimeString()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST API 端点
app.post('/api/transcripts', (req, res) => {
  // TODO: 保存笔录到数据库
  res.json({ message: '笔录已保存' });
});

app.get('/api/transcripts', (req, res) => {
  // TODO: 从数据库获取笔录列表
  res.json([]);
});

// 启动服务器
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});