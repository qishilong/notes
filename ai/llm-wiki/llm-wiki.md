# LLM 维基

一种利用大语言模型构建个人知识库的模式

这是一个思路文件，旨在复制粘贴到你自己的大语言模型智能体（例如 OpenAI Codex、Claude Code、OpenCode / Pi 等）中使用。它的目的是传达核心思路，而你的智能体将与你协作，完善具体细节。

## 核心思路

大多数人对大语言模型（LLM）和文档的使用体验都与检索增强生成（RAG）类似：上传一系列文件后，大语言模型会在查询时检索相关的文本片段，再生成答案。这种方式可行，但大语言模型在回答每个问题时都要从零开始重新挖掘知识，不存在知识的积累。如果提出一个需要综合五份文档的复杂问题，大语言模型每次都得找到并拼接相关片段，不会形成任何知识沉淀。NotebookLM、ChatGPT 文件上传功能以及大多数检索增强生成系统都是这样运作的。

这里的思路有所不同。不再只是在查询时从原始文档中检索，LLM 会**逐步构建并维护一个持久的维基**——这是一个结构化、相互关联的 Markdown 文件集合，介于你和原始数据源之间。当你添加新的数据源时，LLM 不会只为其建立索引以备后续检索。它会读取该数据源，提取关键信息，并将其整合到现有维基中——更新实体页面、修订主题摘要、记录新数据与旧结论相矛盾的地方，巩固或完善不断演变的综合内容。这些知识会被一次性整合，之后**保持更新**，而非在每次查询时重新推导。

这就是关键区别：**维基是一种持续累积的成果。**交叉引用已然存在，矛盾之处也已标注，综合内容也体现了你读过的所有信息。每添加一个来源、每提出一个问题，维基的内容就会变得更加丰富。

你自己永远不会（或极少会）亲自撰写这个维基——所有内容都由大模型来撰写和维护。你负责信息溯源、探索以及提出恰当的问题。大模型则承担所有繁琐的工作——汇总、交叉引用、归档和记录，这些工作能让知识库随着时间的推移真正发挥作用。实际操作中，我会一边打开大模型智能体，另一边打开 Obsidian。大模型根据我们的对话进行编辑，我则实时浏览结果——点击链接、查看图谱视图、阅读更新后的页面。Obsidian 是集成开发环境，大模型是程序员，而维基则是代码库。

这一方法可应用于多种不同场景。以下是几个例子：

- **个人**：追踪你自己的目标、健康、心理状态、自我提升——整理日记条目、文章、播客笔记，并逐步构建关于你自己的结构化画像。
- **研究**：在数周或数月的时间里深入钻研一个主题——阅读论文、文章和报告，并逐步构建一份主题不断深化的综合性维基。
- **阅读一本书**：在阅读过程中为每一章做记录，为人物、主题、情节线索以及它们之间的关联创建页面。读完后，你会拥有一个内容丰富的配套维基。可以参考[托尔金门户](https://tolkiengateway.net/wiki/Main_Page)这类粉丝维基——数千个相互关联的页面涵盖了人物、地点、事件、语言，由志愿者社区历时多年打造而成。你在阅读时也可以亲自打造类似的内容，由大语言模型完成所有的交叉引用和维护工作。
- **业务/团队**：这是一个由大语言模型维护的内部维基，其数据来源于 Slack 对话、会议纪要、项目文档和客户通话记录。可能会有人员参与审核更新流程。这个维基能保持内容最新，是因为大语言模型承担了团队成员都不愿做的维护工作。
- **竞争分析、尽职调查、行程规划、课程笔记、爱好深度研究**——所有需要长期积累知识且希望将其整理有序而非零散存放的事情。

## 架构

分为三个层级：

**原始来源**——你精心整理的源文档集合。包括文章、论文、图片、数据文件。这些内容是不可更改的——大模型从中读取信息但不会对其进行修改。这是你的事实依据。

**维基**——一个由大语言模型生成的 Markdown 文件目录。包含摘要、实体页面、概念页面、对比内容、整体概述与综合梳理。这一层次完全由大语言模型主导。它会创建页面，在有新来源信息时进行更新，维护页面间的交叉引用，并确保所有内容保持一致。你负责阅读，由大语言模型负责撰写。

**架构方案**——是一份文档（例如用于 Claude Code 的 CLAUDE.md 或用于 Codex 的 AGENTS.md），它会告知大语言模型（LLM）维基的结构、约定规则，以及在整合资料、回答问题或维护维基时需遵循的工作流程。这是核心配置文件——正是它让大语言模型成为训练有素的维基维护者，而非普通的聊天机器人。随着你摸索出适合自身领域的方法，你会和大语言模型共同完善这份架构方案。

## 操作流程

**录入。**你将一个新的数据源放入原始集合中，并让大语言模型对其进行处理。一个示例流程如下：大语言模型读取数据源、与你探讨核心要点、在维基中撰写总结页面、更新索引、修改维基中相关的实体和概念页面，并在日志中添加一条记录。一个数据源可能会涉及10到15个维基页面。就我个人而言，我更倾向于逐个录入数据源并全程参与——我会阅读总结、检查更新，并指导大语言模型突出重点内容。不过，你也可以在较少监督的情况下批量录入多个数据源。你可以自行制定符合自己习惯的工作流程，并将其记录在模式中，以便后续使用时参考。

**查询。**你向维基提出问题。大语言模型会搜索相关页面，阅读并整合出带有引用的答案。答案的形式会根据问题有所不同——可以是Markdown页面、对比表格、演示幻灯片（Marp）、图表（matplotlib）或画布。关键要点是：**优质答案可以作为新页面归档回维基中。**你要求的对比、分析、发现的关联——这些内容都很有价值，不应消失在聊天记录里。这样一来，你的探索内容会像导入的资料一样，在知识库中不断积累。

**清理维护。**定期让大语言模型对维基进行健康检查。重点排查以下问题：页面间存在的矛盾、被新资料取代的过时表述、没有入站链接的孤立页面、已提及但无专属页面的重要概念、缺失的交叉引用、可通过网络搜索补充的数据空白。大语言模型擅长提出需要进一步探究的新问题以及需要查找的新资料来源。这能让维基在不断扩充的过程中保持健康。

## 索引与日志记录

有两个特殊文件可以帮助大语言模型（LLM）以及你在维基不断扩充时进行导航。它们有着不同的用途：

index.md</b> 以内容为导向。它是维基中所有内容的目录——每个页面都附带链接、一行摘要以及可选的元数据（如日期或来源数量）。按类别（实体、概念、来源等）进行组织。大语言模型会在每次数据摄入时更新它。回答查询时，大语言模型会先阅读索引以找到相关页面，再深入查看这些页面。在中等规模（约100个来源、数百个页面）下，这种方式效果出奇地好，且无需基于嵌入的检索增强生成（RAG）基础设施。

**log.md** 按时间顺序排列。它是一份仅追加的记录，记录了发生的事件及时间——包括数据摄入、查询、语法检查通过情况。一个实用技巧：如果每条记录都以一致的前缀开头（例如 `## [2026-04-02] ingest | Article Title`），那么这份日志就能通过简单的 Unix 工具解析——`grep "^## \[" log.md | tail -5` 可以获取最后 5 条记录。这份日志能为你呈现维基的演变时间线，还能帮助大语言模型了解近期完成的工作。

## 可选：命令行界面工具

在某些时候，你可能想要开发一些小型工具，帮助大语言模型更高效地操作维基。维基页面的搜索引擎是最显而易见的选择——在规模较小时，索引文件就足够使用，但随着维基的扩展，你就需要专业的搜索功能了。[qmd](https://github.com/tobi/qmd) 是一个不错的选择：它是一款面向 Markdown 文件的本地搜索引擎，结合了混合 BM25/向量搜索和大语言模型重排序，所有功能都可在设备本地运行。它既提供命令行界面（大语言模型可以通过命令行调用它），也提供模型通信协议服务器（大语言模型可以将其作为原生工具使用）。你也可以自行开发更简单的工具——大语言模型可以在有需要时，帮你快速编写一个简易的搜索脚本。

## 技巧与窍门

- **Obsidian 网页剪辑器**是一款可将网页文章转换为 Markdown 格式的浏览器扩展程序。它非常适合快速将资料来源收录到你的原始素材库中。
- 在本地下载图片。</b>在 Obsidian 设置 → 文件和链接中，将“附件文件夹路径”设置为固定目录（例如 `raw/assets/`）。然后在设置 → 快捷键中，搜索“下载”找到“为当前文件下载附件”，并为其绑定快捷键（例如 Ctrl+Shift+D）。截取文章后，按下该快捷键，所有图片都会下载到本地磁盘。这一步是可选的，但很实用——它能让大语言模型直接查看和引用图片，而非依赖可能失效的网址。需要注意的是，大语言模型无法一次性原生读取包含内嵌图片的 Markdown 文件——解决办法是让大语言模型先读取文本，再单独查看部分或全部引用的图片，以获取额外上下文。这种方法虽略显繁琐，但效果足够好。
- **Obsidian 的图谱视图**是查看你的知识库结构的最佳方式——可以看到内容间的关联关系、哪些页面是核心节点、哪些是孤立页面。
- **Marp**是一种基于Markdown的幻灯片格式。Obsidian为其提供了一款插件。非常适合直接从维基内容生成演示文稿。
- **Dataview** 是一款用于对页面前置元数据执行查询的 Obsidian 插件。如果你的大语言模型向维基页面添加了 YAML 前置元数据（标签、日期、来源计数），Dataview 就能生成动态表格和列表。
- 这个维基本质上就是一个存放 Markdown 文件的 Git 仓库。你可以免费获得版本历史、分支管理和协作功能。

## 为何这一方法可行

维护知识库最繁琐的部分并非阅读或思考，而是记账式的琐碎工作。更新交叉引用、让摘要保持最新、标注新数据与旧结论相矛盾的地方、在数十个页面间维持内容一致，这些都是耗时费力的琐事。人类之所以放弃使用维基，是因为维护的负担增长速度远超其带来的价值。而大语言模型不会感到厌烦，不会忘记更新交叉引用，还能一次性处理15个文件。正因维护成本近乎为零，维基才能一直得到维护。

人类的工作是筛选来源、指导分析、提出优质问题，并思考所有信息的意义。大语言模型的工作则是完成其他所有任务。

这个想法在精神上与万尼瓦尔·布什的记忆扩展器（1945年）相关——这是一个个人化、精心整理的知识库，文档之间存在关联路径。布什的愿景与网络的实际发展方向更为接近：它是私人的、由人主动整理的，文档之间的连接与文档本身同样具有价值。他当时无法解决的问题是谁来负责维护，而大语言模型（LLM）则解决了这一问题。

## 注意

本文档刻意保持抽象。它阐述的是核心思路，而非具体实现。具体的目录结构、架构约定、页面格式、工具链——所有这些都将取决于你的业务领域、个人偏好以及所选的大语言模型。上述所有内容均为可选且模块化的——取其有用者，弃其无用者。例如：你的数据源可能仅包含文本，因此完全不需要图像处理功能；你的维基规模可能很小，仅需索引文件即可，无需搜索引擎；你可能对幻灯片演示不感兴趣，只想要 Markdown 页面；你也可能希望采用完全不同的输出格式组合。使用本文档的正确方式是将其分享给你的大语言模型智能体，共同协作生成一个符合你需求的版本。本文档的唯一作用是传递该模式，其余部分交由你的大语言模型来完成即可。





# 原文

> https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

# LLM Wiki

A pattern for building personal knowledge bases using LLMs.

This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to communicate the high level idea, but your agent will build out the specifics in collaboration with you.

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then *kept current*, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

This can apply to a lot of different contexts. A few examples:

- **Personal**: tracking your own goals, health, psychology, self-improvement — filing journal entries, articles, podcast notes, and building up a structured picture of yourself over time.
- **Research**: going deep on a topic over weeks or months — reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.
- **Reading a book**: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki. Think of fan wikis like [Tolkien Gateway](https://tolkiengateway.net/wiki/Main_Page) — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that personally as you read, with the LLM doing all the cross-referencing and maintenance.
- **Business/team**: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents, customer calls. Possibly with humans in the loop reviewing updates. The wiki stays current because the LLM does the maintenance that no one on the team wants to do.
- **Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives** — anything where you're accumulating knowledge over time and want it organized rather than scattered.

## Architecture

There are three layers:

**Raw sources** — your curated collection of source documents. Articles, papers, images, data files. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.

## Operations

**Ingest.** You drop a new source into the raw collection and tell the LLM to process it. An example flow: the LLM reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages. Personally I prefer to ingest sources one at a time and stay involved — I read the summaries, check the updates, and guide the LLM on what to emphasize. But you could also batch-ingest many sources at once with less supervision. It's up to you to develop the workflow that fits your style and document it in the schema for future sessions.

**Query.** You ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Answers can take different forms depending on the question — a markdown page, a comparison table, a slide deck (Marp), a chart (matplotlib), a canvas. The important insight: **good answers can be filed back into the wiki as new pages.** A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way your explorations compound in the knowledge base just like ingested sources do.

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for: contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps that could be filled with a web search. The LLM is good at suggesting new questions to investigate and new sources to look for. This keeps the wiki healthy as it grows.

## Indexing and logging

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes:

**index.md** is content-oriented. It's a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category (entities, concepts, sources, etc.). The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.

**log.md** is chronological. It's an append-only record of what happened and when — ingests, queries, lint passes. A useful tip: if each entry starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`), the log becomes parseable with simple unix tools — `grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently.

## Optional: CLI tools

At some point you may want to build small tools that help the LLM operate on the wiki more efficiently. A search engine over the wiki pages is the most obvious one — at small scale the index file is enough, but as the wiki grows you want proper search. [qmd](https://github.com/tobi/qmd) is a good option: it's a local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking, all on-device. It has both a CLI (so the LLM can shell out to it) and an MCP server (so the LLM can use it as a native tool). You could also build something simpler yourself — the LLM can help you vibe-code a naive search script as the need arises.

## Tips and tricks

- **Obsidian Web Clipper** is a browser extension that converts web articles to markdown. Very useful for quickly getting sources into your raw collection.
- **Download images locally.** In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then in Settings → Hotkeys, search for "Download" to find "Download attachments for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey and all images get downloaded to local disk. This is optional but useful — it lets the LLM view and reference images directly instead of relying on URLs that may break. Note that LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view some or all of the referenced images separately to gain additional context. It's a bit clunky but works well enough.
- **Obsidian's graph view** is the best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans.
- **Marp** is a markdown-based slide deck format. Obsidian has a plugin for it. Useful for generating presentations directly from wiki content.
- **Dataview** is an Obsidian plugin that runs queries over page frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists.
- The wiki is just a git repo of markdown files. You get version history, branching, and collaboration for free.

## Why this works

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.


## Note

This document is intentionally abstract. It describes the idea, not a specific implementation. The exact directory structure, the schema conventions, the page formats, the tooling — all of that will depend on your domain, your preferences, and your LLM of choice. Everything mentioned above is optional and modular — pick what's useful, ignore what isn't. For example: your sources might be text-only, so you don't need image handling at all. Your wiki might be small enough that the index file is all you need, no search engine required. You might not care about slide decks and just want markdown pages. You might want a completely different set of output formats. The right way to use this is to share it with your LLM agent and work together to instantiate a version that fits your needs. The document's only job is to communicate the pattern. Your LLM can figure out the rest.