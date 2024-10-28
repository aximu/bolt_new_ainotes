// 录音状态管理的 Redux slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义录音状态接口
interface RecordingState {
  isRecording: boolean;  // 是否正在录音
  isPaused: boolean;     // 是否暂停
  currentTime: number;   // 当前时间戳
  language: 'chinese' | 'english';  // 识别语言
}

// 初始状态
const initialState: RecordingState = {
  isRecording: false,
  isPaused: false,
  currentTime: 0,
  language: 'chinese',
};

// 创建 Redux slice
const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    // 开始录音
    startRecording: (state) => {
      state.isRecording = true;
      state.isPaused = false;
    },
    // 暂停录音
    pauseRecording: (state) => {
      state.isPaused = true;
    },
    // 继续录音
    resumeRecording: (state) => {
      state.isPaused = false;
    },
    // 停止录音
    stopRecording: (state) => {
      state.isRecording = false;
      state.isPaused = false;
      state.currentTime = 0;
    },
    // 更新时间戳
    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    // 设置识别语言
    setLanguage: (state, action: PayloadAction<'chinese' | 'english'>) => {
      state.language = action.payload;
    },
  },
});

export const {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  updateTime,
  setLanguage,
} = recordingSlice.actions;

export default recordingSlice.reducer;