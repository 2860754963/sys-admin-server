const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const Dotenv = require('dotenv-webpack'); 

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: './bin/www',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `index${dayjs().format('YYYYMMDDHHmm')}.js`,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.beforeRun.tap('CleanDistBeforeRun', () => {
            const distPath = path.resolve(__dirname, 'dist');
            if (fs.existsSync(distPath)) {
              const files = fs.readdirSync(distPath);
              files.forEach((file) => {
                const filePath = path.join(distPath, file);
                if (fs.statSync(filePath).isFile()) {
                  fs.unlinkSync(filePath); 
                }
              });
            }
          });
        },
      },
      new Dotenv({
        path: isProduction ? './.env.production' : './.env.development',
        systemvars: true, 
      }),
    ],
  };
};
