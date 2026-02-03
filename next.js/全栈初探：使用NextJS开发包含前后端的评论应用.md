# 全栈初探：使用NextJS开发包含前后端的评论应用

## 引言

Next.js是一个构建于Node.js 之上的开源Web 开发框架，支持基于React 的Web 应用程序功能，例如服器端渲染和生成静态网站。相较于传统React项目，其有如下特点：

1.  支持服务端渲染（零配置）
2.  文件系统路由：将组件放入 pages 目录下即可自动创建对应路由，无需手动配置
3.  API Routes：Next.js 允许您在同一应用程序中创建后端 API 路由

本文将介绍如何使用NextJS开发一个全栈应用。NextJS支持开发包含后端接口的React应用，在项目启动时会同时启动前端项目和后端API服务，前端页面可通过基于文件系统的路由访问到后端接口。项目数据库采用MongoDB这一非关系型数据库。

![image.png](https://qiniucloud.qishilong.space/images/ba19e43f62cd435bb6c3b6617ebef43f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 实现步骤

### 部署MongoDB数据库

评论数据使用MongoDB存储，MongoDB提供了功能丰富的npm包用于操作MongoDB。使用`Docker`可以轻松的实现数据库的部署，只需要执行如下命令：

```sh
sh
复制代码docker run -d --name mongoContainer -v ~/database/mongodb:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=****** -e MONGO_INITDB_ROOT_PASSWORD=******  --privileged=true mongo:4
```

命令解释：
`-v` 指定挂载目录，将MongoDB数据挂载到宿主机的:`~/database/mongodb`目录 `-p` 指定端口映射，前面为宿主机端口，后面为容器端口
`-e` 指定环境变量，这里主要是指定数据库访问用户名和密码
`-privileged` 是否为特权模式（拥有root权限）

启动完成数据库以后，可以使用如下NodeJS脚本验证数据库是否可以正确连接：

```js
js
复制代码const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://your username:your password@your ip adress:27017";
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```

运行脚本后，如果看到如下打印内容，则证明数据库部署成功。 ![image.png](https://qiniucloud.qishilong.space/images/6a47bffd58224ce4b4ac606aa9b229e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 初始化Nextjs项目

前置说明：截止此文时间，Nextjs的最新版本是13.4.4 (2023年5月25日)。如果实际版本与该版本差距较大，可能需要根据Nextjs官网介绍做相应调整。

执行如下命令初始化项目：

```lua
lua
复制代码npx create-next-app@latest
```

交互式CLI会提示配置可选项，可参考如下配置

```vbnet
vbnet
复制代码What is your project named? nextjs-comments-app
Would you like to use TypeScript with this project? Yes
Would you like to use ESLint with this project? Yes
Would you like to use Tailwind CSS with this project? No
Would you like to use `src/` directory with this project? No
Use App Router (recommended)? Yes
Would you like to customize the default import alias? No
```

完成项目初始化后，使用`npm run dev`启动项目，接下来开发后端接口及前端页面，这里先从后端API开始介绍。

### 后端API接口开发

#### 1. 封装MongoDB公共方法

为了便于对MongoDB的操作，可以将操作MongoDB的方法封装成单独文件以供调用，这里将连接数据库、插入数据库、查询数据库的方法封装到了`utils/dbUtils.ts`目录中，具体代码如下：

```ts
ts
复制代码import { MongoClient, Sort } from "mongodb";

// 连接MongoDB数据库
export async function connectDatabase() {
  // 需要替换为自己的用户名和密码
  const client = await MongoClient.connect("mongodb://username:password@your ip:27017");

  return client;
}

// 插入数据到名为comments的collection
export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: any
) {
  const db = client.db('comments');

  const result = await db.collection(collection).insertOne(document);

  return result;
}

// 查询名为comments的collection中所有数据
export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort
) {
  const db = client.db('comments');

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
```

#### 2. 评论相关API开发

创建`/app/api/comments/route.ts`文件，`/app/api/apiname`(apiname可替换)路径是Nextjs约定的文件存放路径，对应的路由访问地址是`projecturl:port/api/apiname`，而route.ts则是接口的入口文件，在该文件中可实现POST、GET等方法。

```typescript
typescript
复制代码import {
    connectDatabase,
    getAllDocuments,
    insertDocument,
  } from "@/utils/dbUtils";
  import { NextRequest, NextResponse } from "next/server";
  
  /* 新增Comment方法 */
  export async function POST(request: NextRequest) {
    let client;
  
    try {
      client = await connectDatabase();
    } catch (error) {
      return NextResponse.json(
        { message: "Connecting to the database failed!" },
        {
          status: 500,
        }
      );
    }
    const { email, name, text, articleId } = await request.json();
  
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      client.close();
      return NextResponse.json(
        { message: "Invalid input." },
        {
          status: 422,
        }
      );
    }
  
    const newComment: any = {
      email,
      name,
      text,
      articleId,
    };
  
    let result;
  
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      return NextResponse.json(
        { message: "Added comment.", comment: newComment },
        {
          status: 201,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Inserting comment failed!" },
        {
          status: 500,
        }
      );
    }
  }
  
  /* 获取Comments方法 */
  export async function GET() {
    let client;
  
    try {
      client = await connectDatabase();
    } catch (error) {
      return NextResponse.json(
        { message: "Connecting to the database failed!" },
        {
          status: 500,
        }
      );
    }
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      return NextResponse.json(
        { comments: documents },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Getting comments failed." },
        {
          status: 500,
        }
      );
    }
  }
  
```

#### 3. 测试接口可访问性

`Thunder Client`是Vscode的一个Rest API客户端插件，使用该插件可以在Vscode内快速的执行API接口测试，无需安装单独的客户端（如Postman）。在Vscode插件标签页搜索`Thunder Client`即可安装。

![image.png](https://qiniucloud.qishilong.space/images/80a531d027b848c9acf1e628bea4fe29~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

-   测试新增Comment方法（POST）
    在地址栏填写接口地址`http://localhost:3000/api/comments`，切换到Body标签页，输入新增评论内容的JSON对象。 ![image.png](https://qiniucloud.qishilong.space/images/cfe73a1ac8684a979318a98645ae7c52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 除此之外，还需要在Headers标签页中，增加请求头：Content-Type: application/json ![image.png](https://qiniucloud.qishilong.space/images/6a23493790b84cb99f43387ce05c8e04~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 点击`Send`按钮，请求成功返回后，可以在右侧看到返回的JSON对象。
-   测试获取评论方法（GET）
    获取评论方法的参数配置相对简单，只需要将请求方法设置为GET，并输入请求地址即可。 [http://localhost:3000/api/comments](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcomments) ![image.png](https://qiniucloud.qishilong.space/images/ed169cb27cdc4e1e89e207911c3c6eb9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 开发前端页面

在根目录下创建`components`目录，在该目录中存放评论应用的React组件，`components`目录中文件列表如下：

![image.png](https://qiniucloud.qishilong.space/images/39b9e8535ed64f60918a663501fe4304~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 限于篇幅，css样式文件不在文中展示可以访问github查看。

#### 1. 开发新增评论组件

```ts
ts
复制代码// NewComment.tsx
"use client";
import { FormEvent, useRef, useState } from "react";

import styles from "./NewComment.module.css";

function NewComment(props: {
  onAddComment: ({
    email,
    name,
    text,
  }: {
    email: string;
    name: string;
    text: string;
    articleId: string;
  }) => void;
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredComment = commentInputRef.current!.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
      articleId: 'article1',
    });
  }

  return (
    <form className={styles.form} onSubmit={sendCommentHandler}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">邮箱地址</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">姓名</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="comment">评论内容</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>请输入一个有效的邮箱!</p>}
      <button className={styles.btn}>提交</button>
    </form>
  );
}

export default NewComment;
```

新增评论组件使用了原生form表单，接收姓名、邮箱、评论内容三个参数，并将输入内容与useRef绑定。在新增评论时，从useRef对象上获取输入的内容。

#### 2. 开发评论列表组件

```ts
ts
复制代码// CommentList.tsx
import styles from "./CommentList.module.css";

function CommentList(props: {
  isLoading: boolean;
  items: {
    _id: string;
    text: string;
    name: string;
  }[];
}) {
  const { items, isLoading } = props;

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <ul className={styles.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
```

评论列表逻辑也比较简单，只是负责将拿到的评论数据，使用map遍历并渲染到前端。

#### 3. 开发评论根应用

```ts
ts
复制代码// Comments.ts
"use client";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import Image from "next/image";

import styles from "./Comments.module.css";

function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestContent();
  }, []);

  const fetchLatestContent = () => {
    fetch("/api/comments/")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setComments(data.comments);
      });
  };

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
    articleId: string;
  }) {
    setIsLoading(true);
    fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        fetchLatestContent();
        console.log(data);
      });
  }

  return (
    <>
      <div className="header">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          className="logo"
          width={100}
          height={24}
          priority
        />
        <div>Mini Comments</div>
      </div>
      <section className={styles.comments}>
        <NewComment onAddComment={addCommentHandler} />
        <CommentList isLoading={isLoading} items={comments} />
      </section>
    </>
  );
}

export default Comments;
```

评论根组件负责处理请求评论逻辑，同时负责处理新增评论逻辑。在根组件中，为评论应用增加了标题和logo。

#### 4. 挂载评论组件到Nextjs应用入口

使用Nextjs 13版本初始化工具初始化项目的应用入口位于`app/page.tsx`，在该组件中挂载Comment组件，即可在网页中访问评论应用：

```ts
ts
复制代码
import Comments from "@/components/Comments";

export default function Home() {
  return <Comments />;
}
```

访问[http://localhost:3000/](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A3000%2F)

![image.png](https://qiniucloud.qishilong.space/images/7a6298f8c607475582f3a56033de7522~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)