import { useState } from 'react';
import { Upload, Button, Timeline, Card, message } from 'antd';
import { UploadOutlined, FileTextOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  summary?: string;
}

export default function UserCenter() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: '血常规检查报告',
      type: '检验报告',
      date: '2024-03-15',
      summary: '各项指标正常，血红蛋白略低'
    },
    {
      id: '2',
      title: '胸部CT检查',
      type: '影像报告',
      date: '2024-03-10',
      summary: '双肺未见明显异常'
    }
  ]);

  const handleUpload = async (file: File) => {
    try {
      // TODO: Implement file upload to backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      const newDocument: Document = {
        id: Date.now().toString(),
        title: file.name,
        type: '上传文件',
        date: new Date().toISOString().split('T')[0],
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      message.success('文件上传成功');
      return false; // Prevent default upload behavior
    } catch (error) {
      message.error('文件上传失败');
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card title="文档上传" className="mb-6">
        <Upload
          beforeUpload={handleUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>上传新文档</Button>
        </Upload>
      </Card>

      <Card title="文档时间线">
        <Timeline
          items={documents.map(doc => ({
            color: 'blue',
            children: (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} - {doc.date}
                    </p>
                  </div>
                  <Button type="link" icon={<FileTextOutlined />}>
                    查看详情
                  </Button>
                </div>
                {doc.summary && (
                  <p className="mt-2 text-gray-600">{doc.summary}</p>
                )}
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
} 