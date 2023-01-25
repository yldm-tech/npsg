export default {
  '/microservice/': getMicroServiceSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar(),
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

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        {
          text: '配置',
          link: '/components/1-configuration',
        },
        {
          text: '字段验证',
          link: '/components/2-validation',
        },
        {
          text: '缓存',
          link: '/components/3-caching',
        },
        {
          text: '多版本API',
          link: '/components/4-versioning',
        },

        {
          text: '定时任务',
          link: '/components/5-task-scheduling',
        },
        {
          text: '队列',
          link: '/components/6-queues',
        },
        {
          text: '日志',
          link: '/components/7-logger',
        },
        {
          text: '事件推送',
          link: '/components/8-events',
        },
        {
          text: '文件上传',
          link: '/components/9-file-upload',
        },
        {
          text: 'Http',
          link: '/components/10-http',
        },
        {
          text: 'Session',
          link: '/components/11-session',
        },
        {
          text: '服务器推送',
          link: '/components/12-sse',
        },
        {
          text: '认证',
          link: '/components/13-authentication',
        },
        {
          text: '授权',
          link: '/components/14-authorization',
        },
        {
          text: 'CORS',
          link: '/components/15-cors',
        },
        {
          text: 'CSRF',
          link: '/components/16-csrf',
        },
        {
          text: '速率限制',
          link: '/components/17-rate-limiting',
        },
        {
          text: 'WebSocket',
          link: '/components/18-websocket',
        },
      ],
    },
  ];
}

function getGuideSidebar() {
  return [
    {
      text: '组成',
      items: [
        {
          text: 'Nestjs',
          link: '/guide/1-nestjs',
        },
        {
          text: 'Prisma',
          link: '/guide/2-prisma',
        },
        {
          text: 'Swagger',
          link: '/guide/3-swagger',
        },
        {
          text: 'GraphQL',
          link: '/guide/4-graphql',
        },
      ],
    },
  ];
}
