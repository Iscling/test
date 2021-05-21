
new Event('event_name')
new CustomEvent('event_name', {
  detail: {
    // 将需要传递的参数放到这里
		// 可以在监听的回调函数中获取到：event.detail
  }
})
let myEvent = document.createEvent('CustomEvent') // 还有个initCustomEvent()
myEvent.initEvent(
  // 1. event_name: 事件名称
	// 2. canBubble: 是否冒泡
	// 3. cancelable: 是否可以取消默认行为
)


// 1，用户输入url并回车
// 2，浏览器进程检查url，组装协议，构成完整的url
// 3，浏览器进程通过进程间通信（IPC）把url请求发送给网络进程
// 4，网络进程接收到url请求后检查本地缓存是否缓存了该请求资源，如果有则将该资源返回给浏览器进程
// 5，如果没有，网络进程向web服务器发起http请求（网络请求），请求流程如下：
//     5.1 进行DNS解析，获取服务器ip地址，端口（端口是通过dns解析获取的吗？这里有个疑问）
//     5.2 利用ip地址和服务器建立tcp连接
//     5.3 浏览器端构建请求头信息
//     5.4 发送请求头信息
//     5.5 服务器响应后，网络进程接收响应头和响应信息，并解析响应内容
// 6，网络进程解析响应流程；
//     6.1 检查状态码，如果是301/302，则需要重定向，从Location字段中读取地址，重新进行第4步
//         （301/302跳转也会读取本地缓存吗？这里有个疑问），如果是200，则继续处理请求。
//     6.2 200响应处理：
//         检查响应类型Content-Type，如果是字节流类型，则将该请求提交给下载管理器，该导航流程结束，不再进行
//         后续的渲染，如果是html则通知浏览器进程准备渲染进程准备进行渲染。
// 7，准备渲染进程
//     7.1 浏览器进程检查当前url是否和之前打开的渲染进程根域名是否相同，如果相同，则复用原来的进程，如果不同，则开启新的渲染进程
// 8. 传输数据、更新状态
//     8.1 渲染进程准备好后，浏览器向渲染进程发起“提交文档”的消息，渲染进程接收到消息和网络进程建立传输数据的“管道”
//     8.2 渲染进程接收完数据后，向浏览器发送“确认提交”
//     8.3 浏览器进程接收到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web页面。


console.log('start');
setTimeout(()=> {
    console.log('timer1');
    new Promise(function(resolve, rejected) {
        console.log('promise1');
        resolve();
    }).then(res => {
        console.log('promise2');
    })
}, 0);
console.log('log1');
setTimeout(() =>{
    console.log('timer2');
    Promise.resolve().then(function() {
        console.log('promise3');
    })
},
0);
new Promise(function(resolve, rejected) {
    console.log('promise4');
    resolve();
}).then(res =>{
    console.log('promise5');
})
console.log('end')
