// 站点内容集中在这里，改文案 / 换视频只需要动这一个文件。

// 背景视频使用在线素材（Mixkit 免费商用，无需署名）。
// 每个条目：
//   url         桌面端 720p
//   mobileUrl   移动端 360p（体积约为 720p 的 1/5）
//   poster      首帧封面，视频加载完成前先显示，避免黑屏
// 想换成国内对象存储：把 url / mobileUrl 替换成你自己的 OSS / COS 地址即可。
export const videos = [
  {
    label: "水波涟漪",
    url: "https://assets.mixkit.co/videos/47282/47282-720.mp4",
    mobileUrl: "https://assets.mixkit.co/videos/47282/47282-360.mp4",
    poster: "/posters/water-ripple.webp",
  },
  {
    label: "格浪潮动",
    url: "https://assets.mixkit.co/videos/31497/31497-720.mp4",
    mobileUrl: "https://assets.mixkit.co/videos/31497/31497-360.mp4",
    poster: "/posters/grid-wave.webp",
  },
  {
    label: "光隧道",
    url: "https://assets.mixkit.co/videos/34317/34317-720.mp4",
    mobileUrl: "https://assets.mixkit.co/videos/34317/34317-360.mp4",
    poster: "/posters/light-tunnel.webp",
  },
];

// 导航项：label 是显示文字，href 对应页面中 section 的 id。
export const navItems = [
  { label: "作品", href: "#works" },
  { label: "服务", href: "#services" },
  { label: "关于", href: "#about" },
  { label: "联系", href: "#contact" },
];

export const worksData = [
  {
    title: "极光品牌重塑",
    category: "品牌设计",
    year: "2025",
    desc: "为一家北欧科技公司打造全新视觉识别系统，涵盖 Logo 设计、色彩体系与品牌规范手册。",
    tags: ["品牌策略", "VI 系统", "Logo 设计"],
  },
  {
    title: "浪潮电商平台",
    category: "UI/UX 设计",
    year: "2025",
    desc: "从零到一构建电商小程序，以流畅的交互动效与极简视觉语言提升转化率 40%。",
    tags: ["小程序", "交互设计", "设计系统"],
  },
  {
    title: "森海音乐 App",
    category: "产品设计",
    year: "2024",
    desc: "一款沉浸式音乐流媒体应用，以自然景观为灵感，打造独特的听觉视觉双重体验。",
    tags: ["移动端", "动效设计", "品牌延展"],
  },
  {
    title: "智云 SaaS 后台",
    category: "B 端设计",
    year: "2024",
    desc: "企业级数据管理后台，复杂信息架构下的清晰导航与高效操作体验设计。",
    tags: ["B端产品", "数据可视化", "组件库"],
  },
];

export const servicesData = [
  {
    icon: "01",
    title: "品牌设计",
    desc: "从品牌策略到视觉识别系统，帮你建立独特、统一的品牌形象，让品牌自带辨识度。",
    highlights: ["品牌定位与策略", "Logo 与 VI 设计", "品牌规范手册"],
  },
  {
    icon: "02",
    title: "网站与交互设计",
    desc: "以用户为中心的网页与小程序设计，兼顾美感与可用性，让每个像素都有意义。",
    highlights: ["响应式网站", "小程序 UI", "交互原型"],
  },
  {
    icon: "03",
    title: "动效与 3D 视觉",
    desc: "通过精心编排的动效与三维场景，为产品注入生命力，打造难以忘怀的视觉体验。",
    highlights: ["微交互动效", "3D 场景渲染", "视频后期"],
  },
  {
    icon: "04",
    title: "设计咨询",
    desc: "提供专业的设计评审与策略咨询，帮助团队建立设计系统，提升整体设计品质。",
    highlights: ["设计系统搭建", "可用性评审", "团队培训"],
  },
];
