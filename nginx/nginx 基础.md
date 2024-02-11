# nginx 基础

## 引言

早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增长，就会造成线上频繁宕机的现象发生，最终导致系统瘫痪无法继续处理用户的请求。

从上面的描述中，主要存在两个问题：

①单体结构的部署方式无法承载日益增长的业务流量。

②当后端节点宕机后，整个系统会陷入瘫痪，导致整个项目不可用。

因此在这种背景下，引入负载均衡技术可带来的收益：

-   **「系统的高可用：」** 当某个节点宕机后可以迅速将流量转移至其他节点。
-   **「系统的高性能：」** 多台服务器共同对外提供服务，为整个系统提供了更高规模的吞吐。
-   **「系统的拓展性：」** 当业务再次出现增长或萎靡时，可再加入/减少节点，灵活伸缩。

OK~，既然引入负载均衡技术可给我们带来如此巨大的好处，那么又有那些方案可供选择呢？主要有两种负载方案，**「「硬件层面与软件层面」」** ，比较常用的硬件负载器有`A10、F5`等，但这些机器动辄大几万乃至几十万的成本，因此一般大型企业会采用该方案，如银行、国企、央企等。而成本有限，但依旧想做负载均衡的项目，那么可在软件层面实现，如典型的`Nginx`等，软件层的负载也是本文的重点，毕竟`Boss`们的准则之一就是：**「「能靠技术实现的就尽量不花钱。」」**

## 一、性能怪兽-Nginx概念深入浅出

`Nginx`是目前负载均衡技术中的主流方案，几乎绝大部分项目都会使用它，`Nginx`是一个轻量级的高性能`HTTP`反向代理服务器，同时它也是一个通用类型的代理服务器，支持绝大部分协议，如`TCP、UDP、SMTP、HTTPS`等。

`Nginx`与Redis相同，都是基于多路复用模型构建出的产物，因此它与`Redis`同样具备 **「「资源占用少、并发支持高」」** 的特点，在理论上单节点的`Nginx`同时支持`5W`并发连接，而实际生产环境中，硬件基础到位再结合简单调优后确实能达到该数值。

先来看看`Nginx`引入前后，客户端请求处理流程的对比：

![image-20240211222711722](https://qiniucloud.qishilong.space/images/image-20240211222711722.png)

原本客户端是直接请求目标服务器，由目标服务器直接完成请求处理工作，但加入`Nginx`后，所有的请求会先经过`Nginx`，再由其进行分发到具体的服务器处理，处理完成后再返回`Nginx`，最后由`Nginx`将最终的响应结果返回给客户端。

了解了`Nginx`的基本概念后，再来快速搭建一下环境，以及了解一些`Nginx`的高级特性，如动静分离、资源压缩、缓存配置、`IP`黑名单、高可用保障等。

## 二、Nginx环境搭建

首先创建`Nginx`的目录并进入：

```shell
[root@localhost]# mkdir /soft && mkdir /soft/nginx/  
[root@localhost]# cd /soft/nginx/
```

下载`Nginx`的安装包，可以通过`FTP`工具上传离线环境包，也可通过`wget`命令在线获取安装包：

```shell
[root@localhost]# wget https://nginx.org/download/nginx-1.21.6.tar.gz
```

没有`wget`命令的可通过`yum`命令安装：

```shell
[root@localhost]# yum -y install wget
```

解压`Nginx`的压缩包：

```shell
[root@localhost]# tar -xvzf nginx-1.21.6.tar.gz
```

下载并安装`Nginx`所需的依赖库和包：

```shell
[root@localhost]# yum install --downloadonly --downloaddir=/soft/nginx/ gcc-c++  
[root@localhost]# yum install --downloadonly --downloaddir=/soft/nginx/ pcre pcre-devel4  
[root@localhost]# yum install --downloadonly --downloaddir=/soft/nginx/ zlib zlib-devel  
[root@localhost]# yum install --downloadonly --downloaddir=/soft/nginx/ openssl openssl-devel
```

也可以通过`yum`命令一键下载（推荐上面哪种方式）：

```shell
[root@localhost]# yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

执行完成后，然后`ls`查看目录文件，会看一大堆依赖：

![640](https://qiniucloud.qishilong.space/images/640.jpeg)

紧接着通过`rpm`命令依次将依赖包一个个构建，或者通过如下指令一键安装所有依赖包：

```shell
[root@localhost]# rpm -ivh --nodeps *.rpm
```

进入解压后的`nginx`目录，然后执行`Nginx`的配置脚本，为后续的安装提前配置好环境，默认位于`/usr/local/nginx/`目录下（可自定义目录）：

```shell
[root@localhost]# cd nginx-1.21.6  
[root@localhost]# ./configure --prefix=/soft/nginx/
```

编译并安装`Nginx`：

```shell
[root@localhost]# make && make install
```

最后回到前面的`/soft/nginx/`目录，输入`ls`即可看见安装`nginx`完成后生成的文件。

修改安装后生成的`conf`目录下的`nginx.conf`配置文件：

```shell
[root@localhost]# vi conf/nginx.conf  
    修改端口号：listen    80;  
 修改IP地址：server_name  你当前机器的本地IP(线上配置域名);
```

制定配置文件并启动`Nginx`：

```shell
[root@localhost]# sbin/nginx -c conf/nginx.conf  
[root@localhost]# ps aux | grep nginx
```

`Nginx`其他操作命令：

```shell
sbin/nginx -t -c conf/nginx.conf # 检测配置文件是否正常  
sbin/nginx -s reload -c conf/nginx.conf # 修改配置后平滑重启  
sbin/nginx -s quit # 优雅关闭Nginx，会在执行完当前的任务后再退出  
sbin/nginx -s stop # 强制终止Nginx，不管当前是否有任务在执行
```

开放`80`端口，并更新防火墙：

```shell
[root@localhost]# firewall-cmd --zone=public --add-port=80/tcp --permanent  
[root@localhost]# firewall-cmd --reload  
[root@localhost]# firewall-cmd --zone=public --list-ports
```

在`Windows/Mac`的浏览器中，直接输入刚刚配置的`IP`地址访问`Nginx`：

最终看到如上的`Nginx`欢迎界面，代表`Nginx`安装完成。

## 三、Nginx反向代理-负载均衡

首先通过`SpringBoot+Freemarker`快速搭建一个`WEB`项目：springboot-web-nginx，然后在该项目中，创建一个`IndexNginxController.java`文件，逻辑如下：

```java
@Controller  
public class IndexNginxController {  
    @Value("${server.port}")  
    private String port;  
  
    @RequestMapping("/")  
    public ModelAndView index(){  
        ModelAndView model = new ModelAndView();  
        model.addObject("port", port);  
        model.setViewName("index");  
        return model;  
    }  
}
```

在该`Controller`类中，存在一个成员变量：`port`，它的值即是从`application.properties`配置文件中获取`server.port`值。当出现访问`/`资源的请求时，跳转前端`index`页面，并将该值携带返回。

前端的`index.ftl`文件代码如下：

```html
<html>  
    <head>  
        <title>Nginx演示页面</title>  
        <link href="nginx_style.css" rel="stylesheet" type="text/css"/>  
    </head>  
    <body>  
        <div style="border: 2px solid red;margin: auto;width: 800px;text-align: center">  
            <div  id="nginx_title">  
                <h1>欢迎来到熊猫高级会所，我是竹子${port}号！</h1>  
            </div>  
        </div>  
    </body>  
</html>
```

从上可以看出其逻辑并不复杂，仅是从响应中获取了`port`输出。

OK~，前提工作准备就绪后，再简单修改一下`nginx.conf`的配置即可：

```nginx
upstream nginx_boot{  
   # 30s内检查心跳发送两次包，未回复就代表该机器宕机，请求分发权重比为1:2  
   server 192.168.0.000:8080 weight=100 max_fails=2 fail_timeout=30s;   
   server 192.168.0.000:8090 weight=200 max_fails=2 fail_timeout=30s;  
   # 这里的IP请配置成你WEB服务所在的机器IP  
}  
  
server {  
    location / {  
        root   html;  
        # 配置一下index的地址，最后加上index.ftl。  
        index  index.html index.htm index.jsp index.ftl;  
        proxy_set_header Host $host;  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        # 请求交给名为nginx_boot的upstream上  
        proxy_pass http://nginx_boot;  
    }  
}
```

至此，所有的前提工作准备就绪，紧接着再启动`Nginx`，然后再启动两个`web`服务，第一个`WEB`服务启动时，在`application.properties`配置文件中，将端口号改为`8080`，第二个`WEB`服务启动时，将其端口号改为`8090`。

最终来看看效果：

![640](https://qiniucloud.qishilong.space/images/640.gif)

因为配置了请求分发的权重，`8080、8090`的权重比为`2:1`，因此请求会根据权重比均摊到每台机器，也就是`8080`一次、`8090`两次、`8080`一次......

### Nginx请求分发原理

客户端发出的请求`192.168.12.129`最终会转变为：`http://192.168.12.129:80/`，然后再向目标`IP`发起请求，流程如下：

![](https://qiniucloud.qishilong.space/images/1.jpeg)

-   由于`Nginx`监听了`192.168.12.129`的`80`端口，所以最终该请求会找到`Nginx`进程；
-   `Nginx`首先会根据配置的`location`规则进行匹配，根据客户端的请求路径`/`，会定位到`location /{}`规则；
-   然后根据该`location`中配置的`proxy_pass`会再找到名为`nginx_boot`的`upstream`；
-   最后根据`upstream`中的配置信息，将请求转发到运行`WEB`服务的机器处理，由于配置了多个`WEB`服务，且配置了权重值，因此`Nginx`会依次根据权重比分发请求。

## 四、Nginx动静分离

动静分离应该是听的次数较多的性能优化方案，那先思考一个问题：**「「为什么需要做动静分离呢？它带来的好处是什么？」」** 其实这个问题也并不难回答，当你搞懂了网站的本质后，自然就理解了动静分离的重要性。先来以淘宝为例分析看看：

![](https://qiniucloud.qishilong.space/images/taobao-index.jpeg)

当浏览器输入`www.taobao.com`访问淘宝首页时，打开开发者调试工具可以很明显的看到，首页加载会出现`100+`的请求数，而正常项目开发时，静态资源一般会放入到`resources/static/`目录下：

![](https://qiniucloud.qishilong.space/images/taobao-source.jpeg)

在项目上线部署时，这些静态资源会一起打成包，那此时思考一个问题：**「「假设淘宝也是这样干的，那么首页加载时的请求最终会去到哪儿被处理？」」** 答案毋庸置疑，首页`100+`的所有请求都会来到部署`WEB`服务的机器处理，那则代表着一个客户端请求淘宝首页，就会对后端服务器造成`100+`的并发请求。毫无疑问，这对于后端服务器的压力是尤为巨大的。

但此时不妨分析看看，首页`100+`的请求中，是不是至少有`60+`是属于`*.js、*.css、*.html、*.jpg.....`这类静态资源的请求呢？答案是`Yes`。

既然有这么多请求属于静态的，这些资源大概率情况下，长时间也不会出现变动，那为何还要让这些请求到后端再处理呢？能不能在此之前就提前处理掉？当然`OK`，因此经过分析之后能够明确一点：**「「做了动静分离之后，至少能够让后端服务减少一半以上的并发量。」」** 到此时大家应该明白了动静分离能够带来的性能收益究竟有多大。

OK~，搞清楚动静分离的必要性之后，如何实现动静分离呢？其实非常简单，实战看看。

先在部署`Nginx`的机器，`Nginx`目录下创建一个目录`static_resources`：

```shell
mkdir static_resources
```

