// 控制面板组件
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Space, Select, Divider, Tag, Typography } from 'antd';
import { 
  AudioOutlined, 
  PauseOutlined, 
  SaveOutlined,
  TranslationOutlined 
} from '@ant-design/icons';
import { RootState } from '../store';
import { 
  startRecording, 
  pauseRecording, 
  resumeRecording, 
  stopRecording,
  setLanguage 
} from '../store/recordingSlice';

const { Option } = Select;
const { Text } = Typography;

export const ControlPanel = () => {
  const dispatch = useDispatch();
  // 从 Redux store 获取录音状态
  const { isRecording, isPaused, language } = useSelector(
    (state: RootState) => state.recording
  );

  // 处理录音按钮点击
  const handleRecordingClick = () => {
    if (!isRecording) {
      dispatch(startRecording());
    } else if (isPaused) {
      dispatch(resumeRecording());
    } else {
      dispatch(pauseRecording());
    }
  };

  // 处理语言切换
  const handleLanguageChange = (value: 'chinese' | 'english') => {
    dispatch(setLanguage(value));
  };

  return (
    <Card 
      title="控制面板" 
      className="control-panel"
      extra={
        <Tag color={isRecording ? (isPaused ? 'warning' : 'success') : 'blue'}>
          {isRecording ? (isPaused ? '已暂停' : '录音中') : '已就绪'}
        </Tag>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 语言选择区域 */}
        <div>
          <Text type="secondary" style={{ marginBottom: 8, display: 'block' }}>
            <TranslationOutlined /> 识别语言
          </Text>
          <Select 
            value={language}
            onChange={handleLanguageChange}
            style={{ width: '100%' }}
            disabled={isRecording}
          >
            <Option value="chinese">中文</Option>
            <Option value="english">English</Option>
          </Select>
        </div>
        
        <Divider style={{ margin: '12px 0' }} />
        
        {/* 控制按钮区域 */}
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Button 
            type={isRecording && !isPaused ? 'default' : 'primary'}
            icon={isRecording && !isPaused ? <PauseOutlined /> : <AudioOutlined />}
            onClick={handleRecordingClick}
            block
          >
            {isRecording ? (isPaused ? '继续录音' : '暂停') : '开始录音'}
          </Button>
          {isRecording && (
            <Button 
              danger 
              icon={<SaveOutlined />}
              onClick={() => dispatch(stopRecording())}
              block
            >
              结束录音
            </Button>
          )}
        </Space>
      </Space>
    </Card>
  );
};