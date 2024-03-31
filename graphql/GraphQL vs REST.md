# GraphQL vs REST

通常，GraphQL是一种革命性的思考api的新方式。您可以发送查询以在一个请求中准确获取要查找的数据，而不是使用严格的服务器定义的端点。这是真的-GraphQL在组织中被采用时可以是变革性的，使前端和后端团队比以往任何时候都更顺畅地协作。但在实践中，这两种技术都涉及发送HTTP请求并接收一些结果，并且GraphQL内置了REST模型的许多元素。

那么，在技术层面上真正的交易是什么？这两种API范例之间有什么相似之处和不同之处？在本文的最后，我的观点是，GraphQL和REST并没有那么不同，但是GraphQL有一些小的变化，这些变化对开发人员构建和使用API的体验产生了很大的影响。

所以让我们直接跳进去。我们将确定API的一些属性，然后讨论GraphQL和REST如何处理它们。

##  资源

REST的核心思想是资源。每个资源都由一个URL标识，您可以通过向该URL发送 `GET` 请求来检索该资源。你可能会得到一个JSON响应，因为这是大多数api正在使用的这些天。所以它看起来像:

```javascript
// GET /books/1 

{
  "title": "Black Hole Blues",
  "author": { 
    "firstName": "Janna",
    "lastName": "Levin"
  }
  // ... more fields here
}
```

*注意: 在上面的示例中，一些REST api会将 “author” 作为单独的资源返回。*

在REST中需要注意的一点是，资源的类型或形状与获取该资源的方式是耦合的。当您在REST文档中讨论上述内容时，您可以将其称为 “book endpoint”。

GraphQL在这方面有很大的不同，因为在GraphQL中这两个概念是完全分开的。在您的模式中，您可能有 `Book` 和 `Author` 类型:

```graphql
type Book {
  id: ID
  title: String
  published: Date
  price: String
  author: Author
}

type Author {
  id: ID
  firstName: String
  lastName: String
  books: [Book]
}
```

请注意，我们已经描述了可用的数据类型，但是此描述并没有告诉您有关如何从客户端获取这些对象的任何信息。这是REST和GraphQL之间的一个核心区别-特定资源的描述与您检索它的方式无关。

为了能够实际访问特定的书籍或作者，我们需要在我们的模式中创建一个 `Query` 类型:

```graphql
type Query {
  book(id: ID!): Book
  author(id: ID!): Author
}
```

现在，我们可以发送一个类似于上面的REST请求的请求，但是这次使用GraphQL:

```javascript
// GET /graphql?query={ book(id: "1") { title, author { firstName } } }

{
  "title": "Black Hole Blues",
  "author": {
    "firstName": "Janna",
  }
}
```

很好，现在我们有所进展了!我们可以立即看到关于GraphQL的一些与REST完全不同的东西，即使两者都可以通过URL请求，并且都可以返回相同形状的JSON响应。

首先，我们可以看到带有GraphQL查询的URL指定了我们要求的资源以及我们关心的字段。此外，不是服务器作者为我们决定需要包括相关的 `author` 资源，而是API的使用者决定。

但最重要的是，资源的身份，书籍和作者的概念与获取方式无关。我们可以通过许多不同类型的查询和不同的字段集检索同一本书。

###  结论

我们已经确定了一些相似之处和差异:

- 类似: 两者都有资源的概念，并且可以为这些资源指定id。
- 类似: 两者都可以通过带有URL的HTTP GET请求获取。
- 类似: 两者都可以在请求中返回JSON数据。
- 不同: 在REST中，您调用的端点是该对象的标识。在GraphQL中，身份与获取它的方式是分开的。
- 不同: 在REST中，资源的形状和大小由服务器决定。在GraphQL中，服务器声明哪些资源是可用的，客户端询问它当时需要什么。

好吧，如果你已经使用GraphQL和/或REST，这是非常基本的。如果你以前没有使用过GraphQL，你可以在Launchpad上玩一个类似于上面的例子，这是一个在浏览器中建立和探索GraphQL示例的工具。

## URL路由vs GraphQL架构

如果API是不可预测的，那么它就没有用处。当你使用一个API时，你通常是作为某个程序的一部分来做的，这个程序需要知道它可以调用什么，以及它应该期望收到什么结果，这样它就可以对这个结果进行操作。

因此，API最重要的部分之一是对可以访问的内容的描述。这是您在阅读API文档时所了解的内容，并且使用GraphQL内省和REST API模式系统 (如Swagger)，可以通过编程方式检查此信息。

在今天的REST API中，API通常被描述为端点列表:

```
GET /books/:id
GET /authors/:id
GET /books/:id/comments
POST /books/:id/comments
```

所以你可以说API的 “形状” 是线性的 -- 有一个你可以访问的东西的列表。当您检索数据或保存某些内容时，要问的第一个问题是 “我应该调用哪个端点”？

在GraphQL中，正如我们上面提到的，您不使用url来识别API中可用的内容。相反，您使用GraphQL模式:

```graphql
type Query {
  book(id: ID!): Book
  author(id: ID!): Author
}

type Mutation {
  addComment(input: AddCommentInput): Comment
}

type Book { ... }
type Author { ... }
type Comment { ... }
input AddCommentInput { ... }
```

与类似数据集的其余路由相比，这里有一些有趣的地方。首先，GraphQL不是将不同的HTTP动词发送到相同的URL来区分读取与写入，而是使用不同的初始类型-突变与查询。在GraphQL文档中，您可以使用关键字选择要发送的操作类型:

```graphql
query { ... }
mutation { ... }
```

有关查询语言的所有详细信息，请阅读我之前的文章 “GraphQL查询的剖析”。

您可以看到 `Query` 类型上的字段与上面的其余路由非常匹配。这是因为这种特殊类型是我们数据的入口点，所以这是GraphQL中与端点URL最等效的概念。

从GraphQL API获取初始资源的方式与REST非常相似-您传递名称和一些参数-但主要区别在于您可以从哪里开始。在GraphQL中，您可以发送一个复杂的查询，该查询根据模式中定义的关系获取其他数据，但在REST中，您必须通过多个请求执行此操作，将相关数据构建到初始响应中，或者在URL中包含一些特殊参数以修改响应。

###  结论

在REST中，可访问数据的空间被描述为端点的线性列表，而在GraphQL中，它是具有关系的模式。

- 类似: REST API中的端点列表类似于GraphQL API中的 `Query` 和 `Mutation` 类型上的字段列表。它们都是数据的入口点。
- 类似: 两者都可以区分API请求是读取数据还是写入数据。
- 不同: 在GraphQL中，您可以在单个请求中按照模式中定义的关系从入口点遍历到相关数据。在REST中，您必须调用多个端点来获取相关资源。
- 不同: 在GraphQL中， `Query` 类型上的字段与任何其他类型上的字段之间没有区别，只是在查询的根目录中只能访问查询类型。例如，您可以在查询的任何字段中使用参数。在REST中，没有嵌套URL的头等概念。
- 不同: 在REST中，您可以通过将HTTP动词从 `GET` 更改为其他内容 (如 `POST` ) 来指定写入。在GraphQL中，您可以更改查询中的关键字。

由于上述相似之处列表中的第一点，人们经常开始将 `Query` 类型的字段称为GraphQL “端点” 或 “查询”。虽然这是一个合理的比较，但它可能会导致一种误导性的看法，即查询类型的工作方式与其他类型明显不同，但事实并非如此。

## 路由处理程序与解析器

那么，当你真正调用API时会发生什么呢？嗯，通常它在收到请求的服务器上执行一些代码。该代码可能会进行计算，从数据库加载数据，调用不同的API，或者真正做任何事情。整个想法是你不需要从外面知道它在做什么。但是REST和GraphQL都有非常标准的方法来实现该API的内部，比较它们以了解这些技术的不同之处是很有用的。

在这个比较中，我将使用JavaScript代码，因为这是我最熟悉的，但当然你可以用几乎任何编程语言实现REST和GraphQL api。我还将跳过设置服务器所需的任何样板，因为它对概念并不重要。

让我们看一下express的hello world示例，express是Node的一个流行API库:

```javascript
app.get('/hello', function (req, res) {
  res.send('Hello World!')
})
```

这里我们创建了一个 `/hello` 端点，它返回字符串 `'Hello World!'` 。从这个例子中，我们可以看到一个HTTP请求在REST API服务器的生命周期:

1. 服务器接收请求并检索HTTP动词 (在本例中为 `GET` ) 和URL路径
2. API库将动词和路径与服务器代码注册的函数进行匹配
3. 该函数执行一次，并返回一个结果
4. API库序列化结果，添加适当的响应代码和标头，并将其发送回客户端

GraphQL的工作方式非常相似，对于同一个hello world示例，它几乎是相同的:

```javascript
const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!';
    },
  },
};
```

正如您所看到的，我们提供了一个与类型上的特定字段匹配的函数，而不是为特定URL提供函数，在本例中为 `Query` 类型上的 `hello` 字段。在GraphQL中，实现字段的函数称为解析器。

要发出请求，我们需要一个查询:

```javascript
query {
  hello
}
```

因此，当我们的服务器收到GraphQL请求时，会发生以下情况:

1. 服务器接收请求，并检索GraphQL查询
2. 遍历查询，并为每个字段调用适当的解析器。在这种情况下，只有一个字段 `hello` ，它位于 `Query` 类型
3. 该函数被调用，并返回一个结果
4. GraphQL库和服务器将该结果附加到与查询形状匹配的响应

所以你会回来:

```javascript
{ "hello": "Hello, world!" }
```

但这里有一个技巧，我们实际上可以调用字段两次!

```graphql
query {
  hello
  secondHello: hello
}
```

在这种情况下，与上述相同的生命周期发生了，但是由于我们使用别名请求了同一字段两次，因此 `hello` 解析器实际上被调用了两次。这显然是一个人为的示例，但重点是可以在一个请求中执行多个字段，并且可以在查询中的不同点多次调用同一字段。

如果没有 “嵌套” 解析器的示例，这将是不完整的:

```javascript
{
  Query: {
    author: (root, { id }) => find(authors, { id: id }),
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
}
```

这些解析器将能够完成一个查询，如:

```graphql
query {
  author(id: 1) {
    firstName
    posts {
      title
    }
  }
}
```

因此，即使解析器集实际上是平坦的，因为它们附加到各种类型，您可以将它们构建到嵌套查询中。阅读更多关于GraphQL执行如何工作的文章 “GraphQL解释”。

[*看到一个完整的例子，并运行不同的查询来测试这个!*](https://launchpad.graphql.com/1jzxrj179)

![img](https://apollographql.wpengine.com/wp-content/uploads/2020/03/1_qpyJSVVPkd5c6ItMmivnYg.png)

艺术家对使用多个REST往返与一个GraphQL请求获取资源的解释

###  结论

归根结底，REST和GraphQL api只是通过网络调用函数的奇特方式。如果您熟悉构建REST API，那么实现GraphQL API不会有太大的不同。但是GraphQL有很大的优势，因为它可以让你调用几个相关的函数，而无需多次往返。

- 类似: REST中的端点和GraphQL中的字段都最终调用服务器上的函数。
- 类似: REST和GraphQL通常都依赖于框架和库来处理细节网络样板。
- 不同: 在REST中，每个请求通常只调用一个路由处理函数。在GraphQL中，一个查询可以调用多个解析器来构建包含多个资源的嵌套响应。
- 不同: 在REST中，您自己构造响应的形状。在GraphQL中，响应的形状由GraphQL执行库构建，以匹配查询的形状。

从本质上讲，您可以将GraphQL视为在一个请求中调用许多嵌套端点的系统。几乎就像一个多路复用的休息。

------

## 这一切意味着什么？

在这篇特别的文章中，我们有很多事情没有空间去讨论。例如，对象识别、超媒体或缓存。也许这将是以后的话题。但我希望您同意，当您查看基础知识时，REST和GraphQL使用的是基本相似的概念。

我认为其中一些差异对GraphQL有利。特别是，我认为这真的很酷，你可以实现你的API作为一组小解析函数，然后有能力发送一个复杂的查询，检索多个资源一次以可预测的方式。这使API实施者不必创建具有特定形状的多个端点，并使API使用者能够避免获取他们不需要的额外数据。

另一方面，GraphQL还没有像REST那样多的工具和集成。例如，您无法像使用REST结果那样有效地使用HTTP缓存来缓存GraphQL结果。但是，有一些工具可以帮助解决这个问题。例如，您可以使用Apollo Client、urql和Relay在前端缓存GraphQL结果。在服务器端，RESTDataSource可以帮助缓存从REST端点获取的GraphQL结果。