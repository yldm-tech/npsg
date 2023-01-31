#### [返回功能介绍](/feature/)
---
# 即时聊天

使用了`ejs`作用前端界面来进行交互,如果开多个聊天窗口，消息会在多个聊天窗口中实时同步显示。
![chat](/feature/chat/chat.png)

## ChatController
`chat`会重定向到`ejs`的`chat.ejs`文件中，然后在`chat.ejs`中调用`api/chat`从数据库中获取所有消息。

## ChatGateway

在`ChatGateway`中通过`@WebSocketServer`命令实例化了一个`websocket`，并实现了`OnGatewayInit(afterInit)`, `OnGatewayConnection(handleConnection)`, `OnGatewayDisconnect(handleDisconnect)`三个接口用来监听`websocket`的生命周期，用于在用户连接时、连接后、断开时进行一些的逻辑处理。

通过`@SubscribeMessage('sendMessage')`订阅了`sendMessage`，并通过前端`emit`后进行接收

```typescript
function sendMessage(message) {
  socket.emit('sendMessage', message);
}
```

如果有用户发送了消息之后，在服务器进行反向`emit`

```typescript
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: ChatEntity): Promise<void> {
    await this.chatService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }
```

然后在前端进行监听，并将收到的消息推送到消息列表

```typescript
socket.on('recMessage', (message) => {
  messages.push(message);
  loadDate(messages);
});
```

如果一来就可以进行实时的聊天了




## ChatService

- 创建消息，在服务器收到客户端的`emit`之后调用
- 获取消息列表，在用户进入服务器初始化的时候进行调用



## 代码目录结构

```tsx
├── chat.controller.ts
├── chat.gateway.ts
├── chat.module.ts
├── chat.service.ts
└── entities
    └── chat.entity.ts
```

