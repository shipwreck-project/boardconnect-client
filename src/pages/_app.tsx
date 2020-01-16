import React from 'react';
import withRedux, { NextJSAppContext } from 'next-redux-wrapper';
import NextApp from 'next/app';
import { END } from 'redux-saga';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';

// https://github.com/zeit/next-plugins/issues/282
import 'styles/hack.css';
import 'styles/hack.less';

type AppProps = {
  store: any;
};
class App extends NextApp<AppProps> {
  static async getInitialProps(context: any) {
    const { Component, ctx } = context as NextJSAppContext;
    const { store, isServer } = ctx;

    const pageProps = (await Component.getInitialProps?.(ctx)) || {};
    if (isServer) {
      store.dispatch(END);
      await (store as any).sagaTask.toPromise();
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <div
          style={{
            marginTop: 200,
            textAlign: 'center',
          }}
        >
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }
}

export default withRedux(createStore)(App);
