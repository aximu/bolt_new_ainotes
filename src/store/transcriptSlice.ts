// 笔录内容管理的 Redux slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义消息接口
export interface Message {
  id: number;           // 消息唯一标识
  speaker: string;      // 发言人
  content: string;      // 内容
  timestamp: string;    // 时间戳
}

// 定义笔录状态接口
interface TranscriptState {
  messages: Message[];      // 消息列表
  isLoading: boolean;       // 加载状态
  error: string | null;     // 错误信息
}

// 初始状态
const initialState: TranscriptState = {
  messages: [],
  isLoading: false,
  error: null,
};

// 创建 Redux slice
const transcriptSlice = createSlice({
  name: 'transcript',
  initialState,
  reducers: {
    // 添加新消息
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // 设置错误信息
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // 清空笔录
    clearTranscript: (state) => {
      state.messages = [];
      state.error = null;
    },
  },
});

export const {
  addMessage,
  setLoading,
  setError,
  clearTranscript,
} = transcriptSlice.actions;

export default transcriptSlice.reducer;