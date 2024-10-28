// 录音相关的自定义 Hook
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTime } from '../store/recordingSlice';
import { addMessage } from '../store/transcriptSlice';

export const useRecording = () => {
  const dispatch = useDispatch();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { isRecording, isPaused, language } = useSelector(
    (state: RootState) => state.recording
  );

  useEffect(() => {
    let timer: number;

    // 开始录音的异步函数
    const startRecording = async () => {
      try {
        // 请求麦克风权限并创建音频流
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        
        // 处理音频数据
        mediaRecorder.current.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            // TODO: 将音频数据发送到后端进行处理
            // 目前使用模拟数据
            dispatch(addMessage({
              id: Date.now(),
              speaker: Math.random() > 0.5 ? '警官' : '当事人',
              content: '这是一段示例转写文本...',
              timestamp: new Date().toLocaleTimeString(),
            }));
          }
        };

        // 每秒获取一次音频数据
        mediaRecorder.current.start(1000);
        timer = window.setInterval(() => {
          dispatch(updateTime(Date.now()));
        }, 1000);
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    };

    // 停止录音的函数
    const stopRecording = () => {
      if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
        mediaRecorder.current.stop();
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
      clearInterval(timer);
    };

    // 根据录音状态控制录音过程
    if (isRecording && !isPaused) {
      startRecording();
    } else {
      stopRecording();
    }

    // 清理函数
    return () => {
      stopRecording();
    };
  }, [isRecording, isPaused, language, dispatch]);
};