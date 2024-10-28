// 笔录显示面板组件
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, List, Typography, Tag, Space } from 'antd';
import { RootState } from '../store';

const { Text } = Typography;

export const TranscriptPanel = () => {
  // 从 Redux store 获取笔录消息和录音状态
  const { messages } = useSelector((state: RootState) => state.transcript);
  const { isRecording, isPaused } = useSelector(
    (state: RootState) => state.recording
  );

  return (
    <Card 
      title="实时笔录" 
      className="transcript-panel"
      style={{ height: '100%' }}
      extra={
        <Tag color={isRecording ? (isPaused ? 'warning' : 'success') : 'blue'}>
          {isRecording ? (isPaused ? '已暂停' : '实时记录中') : '待开始'}
        </Tag>
      }
    >
      {/* 笔录消息列表 */}
      <List
        className="transcript-list"
        itemLayout="vertical"
        dataSource={messages}
        renderItem={(message) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Space>
                  <Tag color={message.speaker === '警官' ? 'blue' : 'green'}>
                    {message.speaker}
                  </Tag>
                  <Text type="secondary">{message.timestamp}</Text>
                </Space>
              }
              description={
                <Text style={{ fontSize: 16, marginTop: 8 }}>
                  {message.content}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};