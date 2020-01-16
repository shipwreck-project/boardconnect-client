const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
);

const setAntdConfig = config => {
  const antStyles = /antd\/.*?\/style.*?/;
  const origExternals = [...config.externals];
  config.externals = [
    (context, request, callback) => {
      /*
        https://github.com/zeit/next.js/blob/9f6fdb95f27c1b4d8d6d54d5d338903962fd9998/packages/next/build/webpack-config.ts#L494
        위 코드를 보면 next 기본 웹팩 external 설정에서 서버일경우(클라는 external 설정이 없다) 초기 필요한 데이터를 제외하고는
        전부 external 로드 (runtime에 로드) 하도록 넘긴다. (callback() - 번들, callback(undefined, `commonjs ~~`) - external)
        antd를 각 컴포넌트 별 모듈로 사용할 경우 less파일을 임포트하는 index.js파일을 임포트하도록 하는데, 서버일 경우 less파일은 런타임에 빌드가 안된다.
        그럴 경우, 당연히 less를 파싱하지 못하므로, 에러가 발생한다. 서버일경우 css-loader를 모듈로 사용하지 않는 이상 스타일을 컴파일 할 이유가 없다.
        아래 코드는 antd.~~.style.js 파일을 임포트 하는 경우 런타임에 로드하는게 아니라, 밑에 `null-loader`로 무시해버리는 코드다.
        그러면 클라이언트 번들할때 chunk파일로로 쪼개서 링크로 넣어준다.
      */
      if (request.match(antStyles)) return callback();
      if (typeof origExternals[0] === 'function') {
        origExternals[0](context, request, callback);
      } else {
        callback();
      }
    },
    ...(typeof origExternals[0] === 'function' ? [] : origExternals),
  ];

  config.module.rules.unshift({
    test: antStyles,
    use: 'null-loader',
  });
};

const setTsPathConfig = config => {
  if (config.resolve.plugins) {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
  } else {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
  }
};

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      setAntdConfig(config);
    }
    setTsPathConfig(config);

    return config;
  },
});
