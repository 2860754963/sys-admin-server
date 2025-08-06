sys-admin-server/
├── bin/ www # 启动文件
├── public/ 公共数据文件夹
├── src/
│ ├── controllers/ # 控制器层，处理业务逻辑
│ ├── middlewares/ # 中间件，处理请求前后逻辑
│ ├── models/ # 数据模型
│ ├── routes/ # 路由层，定义接口路径
│ ├── services/ # 服务层，处理与数据库交互等
│ ├── utils/ # 工具类
│ └── app.js # 应用主文件
├── .env # 环境变量配置
└──package.json

本地创建 .env.development 、.env.production 两个文件，分别配置开发环境和生产环境的环境变量。
.env.development 文件
PORT=8989
NODE_ENV=development
JWT_SECRET=login_secret_key
JWT_EXPIRE_TIME=10h
SESSION_SECRET=session_secret_key
CODE_EXPIRE_TIME=60000

DBPOOL_HOST=127.0.0.1
DBPOOL_PORT=3306
DBPOOL_USER=root
DBPOOL_PASSWORD=root
DBPOOL_DATABASE=node_sys_admin
DBPOOL_LIMIT=10000
DBPOOL_TIMEOUT=30000

.editorconfig 文件 用于统一定义代码风格，如缩进、空格、换行符等，需 vscode 下载对应插件与 npm 依赖包支持。

.nvmrc 文件用于在已安装 nvm node 版本管理工具下使用 nvm use 切换到指定版本。

.npmrc 文件用于配置 npm 包管理器的默认行为，如 registry、always-auth、cafile、strict-ssl 等。engine-strict = true 用于指定 npm 包管理器的最低版本要求。该版本最低要求位于 package.json 文件中。

dotenv 包 用于管理环境变量，如数据库连接信息、第三方 API 密钥等。需安装 dotenv 包，并在项目根目录下创建 .env 文件，在其中配置环境变量。
"dev": "dotenv -e .env.development supervisor ./bin/www", // 开发环境启动命令
"prod": "dotenv -e .env.production supervisor ./bin/www" // 生产环境启动命令

supervisor 包 用于管理 Node.js 进程，如自动重启进程、监控进程状态等。需安装 supervisor 包，并在 package.json 文件中配置 scripts 字段。
"start": "supervisor ./bin/www" // 启动命令
默认监控所有文件夹和文件，一旦变化就会重启

readme 文件 用于说明项目的基本信息，如项目名称、项目描述、项目依赖、项目启动命令等。
