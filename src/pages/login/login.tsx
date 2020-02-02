import React, { FC, FormEvent, useEffect } from 'react';
import { Layout, Form, Icon, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from 'store/auth';
import { createAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/dist/client/router';

const actions = {
  login: createAction(LOGIN, (payload: { token: string }) => ({ payload })),
};

const useLogin = () => {
  const isLogined = useSelector(
    (state: StoreState) => !!state.auth.response?.user,
  );
  const dispatch = useDispatch();

  const login = (token: string) => {
    dispatch(actions.login({ token }));
  };
  return {
    login,
    isLogined,
  };
};

const Login = () => {
  const { login, isLogined } = useLogin();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login('some-token-from-google');
  };
  const router = useRouter();

  useEffect(() => {
    if (isLogined) {
      router.push('/');
    }
  }, [isLogined, router]);

  return (
    <Template>
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: 400, margin: 'auto', padding: 40 }}
      >
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          <Icon type="google" style={{ color: 'white' }} />
          Signin with google
        </Button>
      </Form>
    </Template>
  );
};

const Template: FC = ({ children }) => {
  return (
    <Layout>
      <Layout.Header>Login</Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default Login;
