import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { ClockCircleOutlined, AudioOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

export const InterviewHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Header className="flex justify-between items-center px-6">
      <Title level={3}>智能笔录系统</Title>
      <Space size="large" className="header-buttons">
        <span className="header-time">
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {time.toLocaleTimeString()}
        </span>
        <Button type="primary" ghost icon={<AudioOutlined />}>
          开始录音
        </Button>
        <Button danger ghost>
          结束会话
        </Button>
      </Space>
    </Header>
  );
};