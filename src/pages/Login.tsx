import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [form] = Form.useForm();

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendVerification = async () => {
    try {
      const phone = await form.validateFields(['phone']);
      setLoading(true);
      // TODO: Implement API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      message.success('验证码已发送');
      setVerificationSent(true);
      startCountdown();
    } catch (error) {
      message.error('请先输入有效的手机号');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: { phone: string; code: string }) => {
    try {
      setLoading(true);
      // TODO: Implement API call to verify code and login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      message.success('登录成功');
      onLogin();
    } catch (error) {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录您的账户
          </h2>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          className="mt-8 space-y-6"
          size="large"
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input
              prefix={<MobileOutlined />}
              placeholder="手机号"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div className="flex space-x-2">
              <Input
                prefix={<LockOutlined />}
                placeholder="验证码"
                maxLength={6}
              />
              <Button
                type="primary"
                onClick={handleSendVerification}
                disabled={countdown > 0}
                loading={loading}
              >
                {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
} 