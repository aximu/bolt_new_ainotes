import React from 'react';
import { Layout } from 'antd';
import { InterviewHeader } from './components/InterviewHeader';
import { TranscriptPanel } from './components/TranscriptPanel';
import { ControlPanel } from './components/ControlPanel';
import { useRecording } from './hooks/useRecording';

const { Content, Sider } = Layout;

function App() {
  useRecording();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <InterviewHeader />
      <Layout style={{ padding: '24px' }}>
        <Content style={{ marginRight: '24px' }}>
          <TranscriptPanel />
        </Content>
        <Sider 
          width={320} 
          style={{ 
            background: 'transparent',
          }}
        >
          <ControlPanel />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default App;