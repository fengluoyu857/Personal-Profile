# 个人作品集网站

一个用于展示个人品牌与作品的单页网站模板，适合独立设计师、前端工程师或创意工作者使用。深色主题、视频背景、滚动揭示动画与响应式布局，可直接替换内容后作为个人数字名片部署。

## 功能

- **视频背景轮播** — Hero 区域可在多个背景视频之间切换
- **作品集展示** — 网格卡片呈现案例，含分类、年份、描述与标签
- **服务介绍** — 列出服务项目及其具体内容
- **关于页面** — 个人简介、从业数据与技能专长
- **联系表单** — 姓名、邮箱、项目类型与项目简述
- **滚动揭示动画** — 元素进入视口时渐入上滑
- **响应式布局** — 适配桌面与移动端，移动端使用汉堡菜单
- **实时时钟** — 导航栏显示当前时间

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架与构建 | React 19 + Vite 7 |
| 样式 | Tailwind CSS 3 |
| 图标 | Lucide React |
| 字体 | Figtree（本地自托管）+ 系统中文字体 |

## 开始使用

需要 Node.js 20.19+ 或 22.12+（Vite 7 要求）。

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器 http://localhost:5173
npm run build   # 构建到 dist/
npm run preview # 预览构建结果
```

## 项目结构

```
├── index.html                # HTML 入口
├── public/
│   ├── fonts/                # 自托管字体
│   ├── posters/              # 视频封面图
│   └── favicon.svg
├── src/
│   ├── main.jsx              # React 入口
│   ├── App.jsx               # 页面组件
│   ├── data/content.js       # 文案、作品、服务与视频源
│   └── styles.css            # Tailwind、字体与自定义动画
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 自定义

大部分文案与数据集中在 `src/data/content.js`：

| 修改内容 | 位置 |
| --- | --- |
| 背景视频（地址、标签、封面） | `src/data/content.js` — `videos` |
| 导航菜单 | `src/data/content.js` — `navItems` |
| 作品数据 | `src/data/content.js` — `worksData` |
| 服务内容 | `src/data/content.js` — `servicesData` |
| 品牌名称 | `src/App.jsx` — 搜索品牌名替换 |
| 联系邮箱 | `src/App.jsx` — 搜索邮箱地址替换 |
| 关于文案与技能 | `src/App.jsx` — `About` 组件 |
| 页面标题与描述 | `index.html` |

### 替换背景视频

`videos` 中每个条目包含三个字段：

```js
{
  label: "水波涟漪",
  url: "https://example.com/videos/water-ripple-720.mp4",        // 桌面端
  mobileUrl: "https://example.com/videos/water-ripple-360.mp4",  // 移动端
  poster: "/posters/water-ripple.webp",                          // 加载前的封面
}
```

视频切换时只加载当前选中的那一个，并按视口宽度选择清晰度；加载失败会自动尝试另一个清晰度，仍失败则保留封面图。

### 接入联系表单

当前表单只在提交时弹出提示，不会真正发送数据。上线前请接入自己的提交方式，例如在 `Contact` 组件的 `onSubmit` 中调用邮件服务或后端接口：

```js
onSubmit={async (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  await fetch("https://your-api.example.com/contact", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(data)),
    headers: { "Content-Type": "application/json" },
  });
}}
```

## 部署

`npm run build` 生成的 `dist/` 是纯静态文件，可部署到任意静态托管服务（Vercel、Netlify、GitHub Pages、对象存储静态网站等）。

## 许可

MIT。示例视频素材来自 [Mixkit](https://mixkit.co/)，遵循其免费许可（可商用、无需署名，但不可作为素材再分发）。
