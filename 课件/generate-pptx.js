const pptxgen = require("pptxgenjs");

// ===========================================
// COLOR PALETTE: Soft Game Theme
// ===========================================
const C = {
  bgSoft: "E8F4F8",
  bgCard: "FFFFFF",
  bgDark: "1E293B",
  bgDarkCard: "1E293B",
  mint: "7FDBCA",
  mintLight: "7FDBCA33",
  coral: "FF6B6B",
  purple: "A855F7",
  yellow: "FBBF24",
  blue: "3B82F6",
  textPrimary: "1E293B",
  textSecondary: "64748B",
  textLight: "F8FAFC",
  textDark: "CBD5E1",
  border: "E2E8F0",
};

// ===========================================
// HELPER FUNCTIONS
// ===========================================
const makeShadow = () => ({
  type: "outer",
  blur: 8,
  offset: 3,
  angle: 135,
  color: "000000",
  opacity: 0.1,
});

const makeShadowDark = () => ({
  type: "outer",
  blur: 10,
  offset: 4,
  angle: 135,
  color: "000000",
  opacity: 0.3,
});

// Section indicator (number + label pill)
function addSectionIndicator(slide, num, label, y = 0.2, dark = false) {
  // Number
  slide.addText(num, {
    x: 0.5, y: y, w: 0.5, h: 0.4,
    fontSize: 22, fontFace: "Arial Black",
    color: dark ? C.textLight : C.purple,
    bold: true,
    margin: 0,
  });
  // Label pill
  slide.addShape("roundedRect", {
    x: 1.05, y: y + 0.05, w: 1.3, h: 0.3,
    fill: { color: dark ? C.textLight : C.purple, transparency: dark ? 85 : 90 },
    rectRadius: 0.15,
  });
  slide.addText(label, {
    x: 1.05, y: y + 0.05, w: 1.3, h: 0.3,
    fontSize: 9, fontFace: "Nunito",
    color: dark ? C.bgDark : C.purple,
    bold: true, align: "center", valign: "middle",
    margin: 0,
  });
}

// Decorative circles (background)
function addDecorCircles(slide, positions) {
  for (const pos of positions) {
    slide.addShape("oval", {
      x: pos.x, y: pos.y, w: pos.w, h: pos.h,
      fill: { color: pos.color, transparency: pos.transparency || 70 },
    });
  }
}

// Main card (white rectangle with shadow)
function addMainCard(slide, x = 0.7, y = 0.7, w = 8.6, h = 4.2) {
  slide.addShape("rectangle", {
    x, y, w, h,
    fill: { color: C.bgCard },
    shadow: makeShadow(),
    rectRadius: 0.2,
  });
}

// Dark main card
function addDarkCard(slide, x = 0.7, y = 0.7, w = 8.6, h = 4.2) {
  slide.addShape("rectangle", {
    x, y, w, h,
    fill: { color: C.bgDark },
    shadow: makeShadowDark(),
  });
}

// Flow box
function addFlowBox(slide, text, x, y, w = 1.3, h = 0.5) {
  slide.addShape("roundedRect", {
    x, y, w, h,
    fill: { color: C.mint },
    rectRadius: 0.1,
  });
  slide.addText(text, {
    x, y, w, h,
    fontSize: 11, fontFace: "Arial",
    color: C.bgDark, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

// Flow arrow
function addFlowArrow(slide, x, y) {
  slide.addText("→", {
    x, y, w: 0.4, h: 0.5,
    fontSize: 20, fontFace: "Arial",
    color: C.purple, align: "center", valign: "middle", margin: 0,
  });
}

// Bullet list helper
function addBulletList(slide, items, x, y, w = 4, h = 3, dark = false) {
  const bulletItems = items.map((item, i) => ({
    text: item,
    options: { bullet: true, breakLine: i < items.length - 1, fontFace: "Nunito" },
  }));
  slide.addText(bulletItems, {
    x, y, w, h,
    fontSize: 13,
    color: dark ? C.textDark : C.textSecondary,
    lineSpacingMultiple: 1.3,
    paraSpaceAfter: 4,
    margin: [4, 0, 4, 0],
  });
}

// ===========================================
// CREATE PRESENTATION
// ===========================================
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI + Phaser Course";
pres.title = "AI + Phaser 游戏开发实战";

// ===========================================
// SLIDE 1: Title Slide
// ===========================================
const slide1 = pres.addSlide();
slide1.background = { color: C.bgSoft };

// Decorative circles
addDecorCircles(slide1, [
  { x: -1, y: -0.5, w: 3, h: 3, color: C.mint },
  { x: 8.5, y: 3.5, w: 2, h: 2, color: C.coral },
  { x: 1, y: 4, w: 1.5, h: 1.5, color: C.purple, transparency: 80 },
]);

// Main card
addMainCard(slide1, 2, 1.0, 6, 3.5);

// Icon circles (decorative)
const icons = [
  { x: 3.2, color: C.mint },
  { x: 3.85, color: C.coral },
  { x: 4.5, color: C.yellow },
];
for (const ic of icons) {
  slide1.addShape("oval", {
    x: ic.x, y: 1.15, w: 0.35, h: 0.35,
    fill: { color: ic.color },
  });
}
slide1.addText("🏰", { x: 3.2, y: 1.15, w: 0.35, h: 0.35, fontSize: 12, align: "center", valign: "middle", margin: 0 });
slide1.addText("👾", { x: 3.85, y: 1.15, w: 0.35, h: 0.35, fontSize: 12, align: "center", valign: "middle", margin: 0 });
slide1.addText("🪙", { x: 4.5, y: 1.15, w: 0.35, h: 0.35, fontSize: 12, align: "center", valign: "middle", margin: 0 });

// Title
slide1.addText([
  { text: "AI + ", options: { fontFace: "Arial Black", fontSize: 34, color: C.textPrimary, bold: true } },
  { text: "Phaser", options: { fontFace: "Arial Black", fontSize: 34, color: C.purple, bold: true } },
  { text: " 游戏开发", options: { fontFace: "Arial Black", fontSize: 34, color: C.textPrimary, bold: true } },
], {
  x: 2, y: 1.7, w: 6, h: 0.7,
  align: "center", valign: "middle", margin: 0,
});

// Subtitle
slide1.addText("塔防游戏实战课件", {
  x: 2, y: 2.5, w: 6, h: 0.5,
  fontSize: 16, fontFace: "Nunito",
  color: C.textSecondary, bold: true,
  align: "center", valign: "middle", margin: 0,
});

// Badge
slide1.addShape("roundedRect", {
  x: 3.5, y: 3.2, w: 3, h: 0.4,
  fill: { color: C.purple, transparency: 90 },
  rectRadius: 0.2,
});
slide1.addText("⏱ 90分钟双节课", {
  x: 3.5, y: 3.2, w: 3, h: 0.4,
  fontSize: 12, fontFace: "Nunito",
  color: C.purple, bold: true,
  align: "center", valign: "middle", margin: 0,
});

// ===========================================
// SLIDE 2: Course Info
// ===========================================
const slide2 = pres.addSlide();
slide2.background = { color: C.bgSoft };
addDecorCircles(slide2, [
  { x: -0.5, y: -0.5, w: 2.5, h: 2.5, color: C.mint },
]);

addSectionIndicator(slide2, "01", "课程信息");
addMainCard(slide2, 0.7, 0.85, 8.6, 4.0);

slide2.addText("课程概览", {
  x: 1.0, y: 1.0, w: 4, h: 0.5,
  fontSize: 22, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

addBulletList(slide2, [
  "目标受众：AI 辅助开发课程学员（已掌握 superpowers 理论）",
  "前置知识：superpowers 工作流、Unity/Unreal 游戏开发经验",
  "课时安排：双节课 90 分钟，连续进行无休息",
  "输出形式：HTML 网页课件（可嵌入代码和游戏演示）",
], 1.0, 1.55, 7.6, 2.2);

// Bottom badge
slide2.addShape("roundedRect", {
  x: 3.2, y: 3.9, w: 3.6, h: 0.4,
  fill: { color: C.mint, transparency: 85 },
  rectRadius: 0.2,
});
slide2.addText("✅ 核心目标：完成塔防游戏原型", {
  x: 3.2, y: 3.9, w: 3.6, h: 0.4,
  fontSize: 12, fontFace: "Nunito",
  color: C.textPrimary, bold: true,
  align: "center", valign: "middle", margin: 0,
});

// ===========================================
// SLIDE 3: Superpowers Review (Dark)
// ===========================================
const slide3 = pres.addSlide();
slide3.background = { color: C.bgSoft };
addDecorCircles(slide3, [
  { x: 7.5, y: 3.5, w: 2, h: 2, color: C.coral, transparency: 80 },
  { x: 1, y: 4.5, w: 1.5, h: 1.5, color: C.purple, transparency: 85 },
]);

addSectionIndicator(slide3, "02", "第一节课 5min", 0.2, true);
addDarkCard(slide3, 0.7, 0.85, 8.6, 4.0);

slide3.addText("superpowers 快速回顾", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textLight, bold: true, margin: 0,
});

// Flow diagram
addFlowBox(slide3, "using-super\npowers", 1.2, 1.7, 1.1, 0.65);
addFlowArrow(slide3, 2.35, 1.7);
addFlowBox(slide3, "brain-\nstorming", 2.8, 1.7, 1.1, 0.65);
addFlowArrow(slide3, 3.95, 1.7);
addFlowBox(slide3, "writing-\nplans", 4.4, 1.7, 1.1, 0.65);
addFlowArrow(slide3, 5.55, 1.7);
addFlowBox(slide3, "executing-\nplans", 6.0, 1.7, 1.1, 0.65);
addFlowArrow(slide3, 7.15, 1.7);
addFlowBox(slide3, "verifi-\ncation", 7.6, 1.7, 1.1, 0.65);

// Bullet points
addBulletList(slide3, [
  "brainstorming：需求分析、方案设计",
  "systematic-debugging：Bug 修复、问题定位",
  "verification：功能验证、完成确认",
], 1.0, 2.6, 7.6, 2.0, true);

// ===========================================
// SLIDE 4: Engine Comparison
// ===========================================
const slide4 = pres.addSlide();
slide4.background = { color: C.bgSoft };
addDecorCircles(slide4, [
  { x: 8, y: 3.5, w: 2, h: 2, color: C.coral },
]);

addSectionIndicator(slide4, "03", "第一节课 15min");
addMainCard(slide4, 0.7, 0.85, 8.6, 4.0);

slide4.addText("Unity/Unreal vs Phaser 对比", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

// Comparison table
const tableRows = [
  [
    { text: "维度", options: { fill: { color: C.mint, transparency: 90 }, bold: true, color: C.textPrimary, fontSize: 12, fontFace: "Nunito" } },
    { text: "Unity/Unreal", options: { fill: { color: C.mint, transparency: 90 }, bold: true, color: C.textPrimary, fontSize: 12, fontFace: "Nunito" } },
    { text: "Phaser", options: { fill: { color: C.mint, transparency: 90 }, bold: true, color: C.textPrimary, fontSize: 12, fontFace: "Nunito" } },
  ],
  [
    { text: "运行平台", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "桌面/移动/主机", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "浏览器（无需安装）", options: { fontSize: 11, color: C.purple, bold: true, fontFace: "Nunito" } },
  ],
  [
    { text: "开发语言", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "C# / C++", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "JavaScript", options: { fontSize: 11, color: C.purple, bold: true, fontFace: "Nunito" } },
  ],
  [
    { text: "学习曲线", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "较陡", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "较平（HTML+JS即可）", options: { fontSize: 11, color: C.purple, bold: true, fontFace: "Nunito" } },
  ],
  [
    { text: "项目规模", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "大型 3D 游戏", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "中小型 2D 游戏", options: { fontSize: 11, color: C.purple, bold: true, fontFace: "Nunito" } },
  ],
  [
    { text: "AI 协作", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "代码量多，协作复杂", options: { fontSize: 11, color: C.textSecondary, fontFace: "Nunito" } },
    { text: "代码精简，迭代快速", options: { fontSize: 11, color: C.purple, bold: true, fontFace: "Nunito" } },
  ],
];

slide4.addTable(tableRows, {
  x: 1.0, y: 1.55, w: 8.0,
  colW: [1.5, 2.8, 3.7],
  rowH: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
  border: { pt: 0.5, color: C.border },
  margin: [3, 4, 3, 4],
});

// ===========================================
// SLIDE 5: Phaser Introduction
// ===========================================
const slide5 = pres.addSlide();
slide5.background = { color: C.bgSoft };
addDecorCircles(slide5, [
  { x: -0.5, y: -0.3, w: 2.5, h: 2.5, color: C.mint },
  { x: 8, y: 3.5, w: 2, h: 2, color: C.coral },
]);

addSectionIndicator(slide5, "04", "Phaser 介绍");
addMainCard(slide5, 0.7, 0.85, 8.6, 4.0);

slide5.addText("什么是 Phaser？", {
  x: 1.0, y: 1.0, w: 4, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

addBulletList(slide5, [
  "轻量级 HTML5 2D 游戏框架，专为浏览器游戏设计",
  "核心能力：游戏循环、精灵渲染、物理引擎、动画、音频",
  "技术栈：HTML + JavaScript + Canvas/WebGL",
  "适合 AI 协作：代码结构简单、单文件可运行、修改即时可见",
], 1.0, 1.55, 7.6, 2.0);

// Icon row
const iconData5 = [
  { x: 2.8, emoji: "🎮", color: C.mint },
  { x: 3.55, emoji: "📱", color: C.coral },
  { x: 4.3, emoji: "⚡", color: C.yellow },
  { x: 5.05, emoji: "🧠", color: C.purple },
];
for (const ic of iconData5) {
  slide5.addShape("oval", {
    x: ic.x, y: 3.7, w: 0.4, h: 0.4,
    fill: { color: ic.color },
  });
  slide5.addText(ic.emoji, {
    x: ic.x, y: 3.7, w: 0.4, h: 0.4,
    fontSize: 12, align: "center", valign: "middle", margin: 0,
  });
}

// ===========================================
// SLIDE 6: game-engine skill (Dark)
// ===========================================
const slide6 = pres.addSlide();
slide6.background = { color: C.bgSoft };
addDecorCircles(slide6, [
  { x: 8, y: 0, w: 2, h: 2, color: C.purple, transparency: 85 },
  { x: 0, y: 4, w: 2, h: 2, color: C.coral, transparency: 85 },
]);

addSectionIndicator(slide6, "05", "第一节课 5min", 0.2, true);
addDarkCard(slide6, 0.7, 0.85, 8.6, 4.0);

slide6.addText("game-engine skill 简介", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textLight, bold: true, margin: 0,
});

addBulletList(slide6, [
  "技能定位：项目特定技能，提供 Phaser 游戏开发知识库",
  "核心内容：游戏循环、物理碰撞、精灵动画、音频处理",
  "模板资源：paddle-game、platform-game 等可直接调用",
  "触发方式：/game-engine 或描述游戏开发需求自动触发",
], 1.0, 1.55, 5.0, 1.8, true);

// Code block
slide6.addShape("rectangle", {
  x: 1.0, y: 3.6, w: 8.0, h: 0.8,
  fill: { color: "0D1117" },
  shadow: { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.2 },
});
slide6.addText([
  { text: "/game-engine", options: { fontFace: "Consolas", fontSize: 13, color: C.coral, bold: true } },
  { text: " ", options: { fontSize: 13 } },
  { text: "create tower-defense game", options: { fontFace: "Consolas", fontSize: 13, color: C.mint } },
], {
  x: 1.1, y: 3.65, w: 7.8, h: 0.7,
  align: "left", valign: "middle", margin: [4, 0, 4, 0],
});

// ===========================================
// SLIDE 7: AI Collaboration Tips
// ===========================================
const slide7 = pres.addSlide();
slide7.background = { color: C.bgSoft };
addDecorCircles(slide7, [
  { x: 8, y: -0.5, w: 2.5, h: 2.5, color: C.mint },
]);

addSectionIndicator(slide7, "06", "第一节课 10min");
addMainCard(slide7, 0.7, 0.85, 8.6, 4.0);

slide7.addText("游戏开发 AI 协作技巧", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

addBulletList(slide7, [
  "提示词范式：\"创建一个塔防游戏，使用 Phaser，包含波次系统\"",
  "分阶段策略：先核心 → 再扩展 → 最后优化",
  "迭代优化：描述具体问题 → AI 定位 → 修改验证",
], 1.0, 1.55, 7.6, 1.4);

// Flow diagram
addFlowBox(slide7, "brain-\nstorm", 1.2, 3.15, 1.3, 0.65);
addFlowArrow(slide7, 2.55, 3.15);
addFlowBox(slide7, "writing-\nplans", 3.0, 3.15, 1.3, 0.65);
addFlowArrow(slide7, 4.35, 3.15);
addFlowBox(slide7, "game-\nengine", 4.8, 3.15, 1.3, 0.65);
addFlowArrow(slide7, 6.15, 3.15);
addFlowBox(slide7, "verifi-\ncation", 6.6, 3.15, 1.3, 0.65);

// ===========================================
// SLIDE 8: Brainstorming Demo (Dark)
// ===========================================
const slide8 = pres.addSlide();
slide8.background = { color: C.bgSoft };
addDecorCircles(slide8, [
  { x: 7.5, y: 3.5, w: 2, h: 2, color: C.coral, transparency: 85 },
  { x: 0, y: 0, w: 1.5, h: 1.5, color: C.purple, transparency: 85 },
]);

addSectionIndicator(slide8, "07", "第一节课 10min", 0.2, true);
addDarkCard(slide8, 0.7, 0.85, 8.6, 4.0);

slide8.addText("塔防游戏设计示范", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textLight, bold: true, margin: 0,
});

slide8.addText("使用 brainstorming skill 实际演示", {
  x: 1.0, y: 1.55, w: 5, h: 0.4,
  fontSize: 12, fontFace: "Nunito",
  color: C.textDark, italic: true, margin: 0,
});

// Timeline items
const timelineSteps = [
  { step: "Step 1", text: "描述游戏概念 → AI 提问澄清" },
  { step: "Step 2", text: "AI 提出 2-3 种设计方案" },
  { step: "Step 3", text: "用户选择方案 → AI 展示设计细节" },
  { step: "Step 4", text: "输出设计文档到 docs/superpowers/specs/" },
];

for (let i = 0; i < timelineSteps.length; i++) {
  const yy = 2.15 + i * 0.65;
  // Step label
  slide8.addText(timelineSteps[i].step, {
    x: 1.0, y: yy, w: 0.7, h: 0.35,
    fontSize: 11, fontFace: "Consolas",
    color: C.yellow, bold: true, margin: 0,
  });
  // Dot
  slide8.addShape("oval", {
    x: 1.8, y: yy + 0.05, w: 0.25, h: 0.25,
    fill: { color: C.mint },
  });
  // Content
  slide8.addText(timelineSteps[i].text, {
    x: 2.15, y: yy, w: 6.5, h: 0.35,
    fontSize: 12, fontFace: "Nunito",
    color: C.textDark, margin: 0,
  });
}

// ===========================================
// SLIDE 9: Class 2 Overview
// ===========================================
const slide9 = pres.addSlide();
slide9.background = { color: C.bgSoft };
addDecorCircles(slide9, [
  { x: -0.5, y: -0.3, w: 2.5, h: 2.5, color: C.mint },
  { x: 8, y: 3.5, w: 2, h: 2, color: C.coral },
  { x: 1, y: 4.5, w: 1.5, h: 1.5, color: C.purple, transparency: 85 },
]);

addSectionIndicator(slide9, "08", "第二节课");
addMainCard(slide9, 0.7, 0.85, 8.6, 4.0);

slide9.addText("塔防游戏完整开发实操", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

// Timeline
const class2Steps = [
  { time: "3min", text: "设置开发环境（8082端口、Trae 工作区）" },
  { time: "22min", text: "核心功能实现（4阶段开发流程）" },
  { time: "10min", text: "调试与验证技巧（Playwright MCP）" },
  { time: "10min", text: "扩展功能演示（得分、塔升级、音效）" },
];

for (let i = 0; i < class2Steps.length; i++) {
  const yy = 1.65 + i * 0.75;
  // Time
  slide9.addText(class2Steps[i].time, {
    x: 1.0, y: yy, w: 0.65, h: 0.35,
    fontSize: 14, fontFace: "Nunito",
    color: C.coral, bold: true, margin: 0,
  });
  // Dot
  slide9.addShape("oval", {
    x: 1.75, y: yy + 0.05, w: 0.25, h: 0.25,
    fill: { color: C.mint },
  });
  // Content
  slide9.addText(class2Steps[i].text, {
    x: 2.1, y: yy, w: 6.5, h: 0.5,
    fontSize: 13, fontFace: "Nunito",
    color: C.textSecondary, margin: 0,
  });
}

// ===========================================
// SLIDE 10: Core Implementation (Dark)
// ===========================================
const slide10 = pres.addSlide();
slide10.background = { color: C.bgSoft };
addDecorCircles(slide10, [
  { x: 8, y: 3.5, w: 2, h: 2, color: C.purple, transparency: 85 },
]);

addSectionIndicator(slide10, "09", "第二节课 22min", 0.2, true);
addDarkCard(slide10, 0.7, 0.85, 8.6, 4.0);

slide10.addText("核心功能实现 4 阶段", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textLight, bold: true, margin: 0,
});

// Phase table
const phaseRows = [
  [
    { text: "阶段", options: { fill: { color: C.mint, transparency: 85 }, bold: true, color: C.textLight, fontSize: 12, fontFace: "Nunito" } },
    { text: "功能", options: { fill: { color: C.mint, transparency: 85 }, bold: true, color: C.textLight, fontSize: 12, fontFace: "Nunito" } },
    { text: "AI 协作方式", options: { fill: { color: C.mint, transparency: 85 }, bold: true, color: C.textLight, fontSize: 12, fontFace: "Nunito" } },
  ],
  [
    { text: "1", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "游戏场景与地图", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "单次提示词创建基础场景", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
  ],
  [
    { text: "2", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "敌人系统", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "描述敌人行为 → AI 实现 → 迭代调整", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
  ],
  [
    { text: "3", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "塔放置系统", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "分步实现：点击放置 → 验证 → 添加攻击逻辑", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
  ],
  [
    { text: "4", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "攻击与伤害", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
    { text: "描述攻击机制 → AI 实现碰撞检测", options: { fontSize: 12, color: C.textDark, fontFace: "Nunito" } },
  ],
];

slide10.addTable(phaseRows, {
  x: 1.0, y: 1.55, w: 8.0,
  colW: [0.6, 1.8, 5.6],
  rowH: [0.35, 0.4, 0.45, 0.45, 0.45],
  border: { pt: 0.5, color: "334155" },
  margin: [3, 4, 3, 4],
});

slide10.addText("每阶段：提示词 → AI生成 → 运行验证 → 迭代优化", {
  x: 1.0, y: 4.1, w: 8.0, h: 0.4,
  fontSize: 11, fontFace: "Nunito",
  color: C.textDark, italic: true, margin: 0,
});

// ===========================================
// SLIDE 11: Debugging Skills
// ===========================================
const slide11 = pres.addSlide();
slide11.background = { color: C.bgSoft };
addDecorCircles(slide11, [
  { x: 7.5, y: 3, w: 2, h: 2, color: C.coral },
]);

addSectionIndicator(slide11, "10", "第二节课 10min");
addMainCard(slide11, 0.7, 0.85, 8.6, 4.0);

slide11.addText("调试与验证技巧", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

addBulletList(slide11, [
  "Playwright MCP：浏览器自动化测试游戏交互",
  "常见问题：敌人不动？塔不攻击？子弹不碰撞？",
  "systematic-debugging：AI 辅助系统化排查问题",
  "verification-before-completion：验证功能完整性再标记完成",
], 1.0, 1.55, 7.6, 1.8);

// Code block
slide11.addShape("rectangle", {
  x: 1.0, y: 3.5, w: 8.0, h: 0.9,
  fill: { color: "0D1117" },
  shadow: { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.2 },
});
slide11.addText([
  { text: "// 调试提示词示例", options: { fontFace: "Consolas", fontSize: 11, color: "64748B" } },
  { text: "\n", options: { fontSize: 6 } },
  { text: "/systematic-debugging", options: { fontFace: "Consolas", fontSize: 13, color: C.coral, bold: true } },
  { text: " 敌人不沿路径移动", options: { fontFace: "Consolas", fontSize: 13, color: C.mint } },
], {
  x: 1.1, y: 3.55, w: 7.8, h: 0.8,
  align: "left", valign: "middle", margin: [4, 0, 4, 0],
});

// ===========================================
// SLIDE 12: Extensions
// ===========================================
const slide12 = pres.addSlide();
slide12.background = { color: C.bgSoft };
addDecorCircles(slide12, [
  { x: -0.5, y: -0.3, w: 2.5, h: 2.5, color: C.mint },
  { x: 8, y: 3.5, w: 2, h: 2, color: C.coral },
  { x: 1, y: 4.5, w: 1.5, h: 1.5, color: C.purple, transparency: 85 },
]);

addSectionIndicator(slide12, "11", "第二节课 10min");
addMainCard(slide12, 0.7, 0.85, 8.6, 4.0);

slide12.addText("扩展功能演示", {
  x: 1.0, y: 1.0, w: 5, h: 0.5,
  fontSize: 20, fontFace: "Arial Black",
  color: C.textPrimary, bold: true, margin: 0,
});

slide12.addText("展示 AI 协作的迭代扩展能力", {
  x: 1.0, y: 1.5, w: 5, h: 0.4,
  fontSize: 12, fontFace: "Nunito",
  color: C.textSecondary, italic: true, margin: 0,
});

// Icon row
const iconData12 = [
  { x: 2.5, emoji: "💰", color: C.yellow, label: "得分" },
  { x: 3.5, emoji: "⬆️", color: C.mint, label: "升级" },
  { x: 4.5, emoji: "🎯", color: C.purple, label: "多塔" },
  { x: 5.5, emoji: "🔊", color: C.coral, label: "音效" },
];
for (const ic of iconData12) {
  slide12.addShape("oval", {
    x: ic.x, y: 2.1, w: 0.45, h: 0.45,
    fill: { color: ic.color },
  });
  slide12.addText(ic.emoji, {
    x: ic.x, y: 2.1, w: 0.45, h: 0.45,
    fontSize: 14, align: "center", valign: "middle", margin: 0,
  });
  slide12.addText(ic.label, {
    x: ic.x - 0.15, y: 2.6, w: 0.75, h: 0.3,
    fontSize: 9, fontFace: "Nunito",
    color: C.textSecondary, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

addBulletList(slide12, [
  "得分与金币系统：单次提示词添加游戏 UI",
  "塔升级机制：描述升级逻辑 → AI 实现",
  "多种塔类型：扩展不同攻击效果的塔",
  "音效与动画：添加爆炸效果、攻击音效",
], 1.0, 3.1, 7.6, 1.4);

// ===========================================
// SLIDE 13: Summary
// ===========================================
const slide13 = pres.addSlide();
slide13.background = { color: C.bgSoft };
addDecorCircles(slide13, [
  { x: -0.5, y: -0.3, w: 2.5, h: 2.5, color: C.mint },
  { x: 8, y: 3.5, w: 2, h: 2, color: C.coral },
  { x: 1, y: 4.5, w: 1.5, h: 1.5, color: C.purple, transparency: 85 },
]);

// Main card
addMainCard(slide13, 2, 0.8, 6, 4.0);

// Success icons
const successIcons = [
  { x: 3.0, emoji: "✅", color: C.mint },
  { x: 3.65, emoji: "🎉", color: C.yellow },
  { x: 4.3, emoji: "🎮", color: C.purple },
];
for (const ic of successIcons) {
  slide13.addShape("oval", {
    x: ic.x, y: 0.95, w: 0.35, h: 0.35,
    fill: { color: ic.color },
  });
  slide13.addText(ic.emoji, {
    x: ic.x, y: 0.95, w: 0.35, h: 0.35,
    fontSize: 12, align: "center", valign: "middle", margin: 0,
  });
}

slide13.addText("课程总结", {
  x: 2, y: 1.45, w: 6, h: 0.5,
  fontSize: 24, fontFace: "Arial Black",
  color: C.textPrimary, bold: true,
  align: "center", valign: "middle", margin: 0,
});

const summaryItems = [
  "game-engine skill：Phaser 游戏开发知识库",
  "AI 协作流程：brainstorming → planning → execution → verification",
  "迭代优化：分阶段开发，逐步验证完善",
  "产出：可运行的塔防游戏原型",
];
const summaryBullets = summaryItems.map((item, i) => ({
  text: item,
  options: { bullet: true, breakLine: i < summaryItems.length - 1, fontFace: "Nunito" },
}));
slide13.addText(summaryBullets, {
  x: 2.5, y: 2.1, w: 5, h: 1.8,
  fontSize: 13, color: C.textSecondary,
  lineSpacingMultiple: 1.4, paraSpaceAfter: 4,
  margin: [4, 0, 4, 0],
});

// Success badge
slide13.addShape("roundedRect", {
  x: 2.8, y: 3.9, w: 4.4, h: 0.45,
  fill: { color: C.mint, transparency: 85 },
  rectRadius: 0.2,
});
slide13.addText("✅ 恭喜完成 AI + Phaser 游戏开发课程！", {
  x: 2.8, y: 3.9, w: 4.4, h: 0.45,
  fontSize: 13, fontFace: "Nunito",
  color: C.textPrimary, bold: true,
  align: "center", valign: "middle", margin: 0,
});

// ===========================================
// SAVE
// ===========================================
pres.writeFile({ fileName: "课件/AI-Phaser-游戏开发课件.pptx" })
  .then((filePath) => {
    console.log(`Presentation saved: ${filePath}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
