export default {
  '/components/': getComponentsSidebar(),
  '/feature/': getFeaturesSidebar(),
  '/deploy/': getDeploySidebar(),
};

function getMicroServiceSidebar() {
  return [
    {
      text: '微服务',
      items: [
        {
          text: 'Redis',
          link: '/microservice/1-redis',
        },
        {
          text: 'MQTT',
          link: '/microservice/2-mqtt',
        },
        {
          text: 'RabbitMQ',
          link: '/microservice/3-rabbitmq',
        },
        {
          text: 'kafka',
          link: '/microservice/4-kafka',
        },
        {
          text: 'gRPC',
          link: '/microservice/5-grpc',
        },
        {
          text: 'NATS',
          link: '/microservice/6-nats',
        },
      ],
    },
  ];
}

function getFeaturesSidebar() {
  return [
    {
      text: '功能介绍',
      items: [
        {
          text: '认证授权',
          link: '/feature/1-auth',
        },
        {
          text: '即时聊天',
          link: '/feature/2-chat',
        },
        {
          text: '定时任务',
          link: '/feature/3-cron',
        },
        {
          text: '文件上传下载',
          link: '/feature/4-file',
        },

        {
          text: '健康检查',
          link: '/feature/5-health',
        },
        {
          text: '文章增删改查',
          link: '/feature/6-posts',
        },
        {
          text: '数据库Prisma',
          link: '/feature/7-prisma',
        },
        {
          text: '消息队列',
          link: '/feature/8-queue',
        },
        {
          text: '用户管理',
          link: '/feature/9-user',
        },
      ],
    },
  ];
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        {
          text: '配置',
          link: '/feature/1-configuration',
        },
        {
          text: '字段验证',
          link: '/feature/2-validation',
        },
        {
          text: '缓存',
          link: '/feature/3-caching',
        },
        {
          text: '多版本API',
          link: '/feature/4-versioning',
        },

        {
          text: '定时任务',
          link: '/feature/5-task-scheduling',
        },
        {
          text: '队列',
          link: '/feature/6-queues',
        },
        {
          text: '日志',
          link: '/feature/7-logger',
        },
        {
          text: '事件推送',
          link: '/feature/8-events',
        },
        {
          text: '文件上传',
          link: '/feature/9-file-upload',
        },
        {
          text: 'Http',
          link: '/feature/10-http',
        },
        {
          text: 'Session',
          link: '/feature/11-session',
        },
        {
          text: '服务器推送',
          link: '/feature/12-sse',
        },
        {
          text: '认证',
          link: '/feature/13-authentication',
        },
        {
          text: '授权',
          link: '/feature/14-authorization',
        },
        {
          text: 'CORS',
          link: '/feature/15-cors',
        },
        {
          text: 'CSRF',
          link: '/feature/16-csrf',
        },
        {
          text: '速率限制',
          link: '/feature/17-rate-limiting',
        },
        {
          text: 'WebSocket',
          link: '/feature/18-websocket',
        },
      ],
    },
  ];
}

function getDeploySidebar() {
  return [
    {
      text: '部署',
      items: [
        {
          text: '本地开发',
          link: '/deploy/1-local',
        },
        {
          text: '线上部署',
          link: '/deploy/2-prod',
        },
      ],
    },
  ];
}
