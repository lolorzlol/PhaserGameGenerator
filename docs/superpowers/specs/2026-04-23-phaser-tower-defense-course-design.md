---
name: phaser-tower-defense-course-design
description: AI辅助Phaser塔防游戏开发课件设计方案
type: project
---

# AI 辅助 Phaser 游戏开发实战课件设计

## 基本信息

- **课件名称**: AI 辅助 Phaser 游戏开发实战 - 塔防游戏案例
- **目标受众**: AI 辅助开发课程学员（已掌握 superpowers 理论框架）
- **课时安排**: 双节课（90分钟），连续进行无休息
- **输出形式**: HTML 网页课件（可嵌入代码示例和游戏演示）
- **前置知识**: superpowers 工作流、Unity/Unreal 游戏开发经验

## 核心目标
1. 掌握 AI 协作技巧在复杂项目中的迭代优化
2. 完成一个可运行的塔防游戏原型

---

## 第一节课大纲（45分钟）

**主题**: 游戏开发与 superpowers 结合

### 环节 1：superpowers 快速回顾（5分钟）

- 技能调用关系图：using-superpowers → brainstorming → writing-plans → executing-plans
- 关键点强调：brainstorming 用于需求分析，systematic-debugging 用于 Bug 修复
- 快速问答互动

### 环节 2：游戏引擎对比与 Phaser 介绍（15分钟）

**2.1 Unity/Unreal vs Phaser 对比**

| 维度 | Unity/Unreal | Phaser |
|------|--------------|--------|
| 运行平台 | 桌面/移动/主机 | 浏览器（无需安装） |
| 开发语言 | C# / C++ | JavaScript |
| 学习曲线 | 较陡（IDE、组件系统） | 较平（HTML + JS 即可） |
| 项目规模 | 大型 3D 游戏、商业项目 | 中小型 2D 游戏、H5小游戏 |
| 发布方式 | 打包安装 / App Store | 直接部署网页 |
| AI 辅助优势 | 代码量多，协作复杂 | 代码精简，迭代快速 |

**2.2 Phaser 介绍**

- 轻量级 HTML5 2D 游戏框架
- 核心能力：游戏循环、精灵渲染、物理引擎、动画、音频
- 技术栈：HTML + JavaScript + Canvas/WebGL
- 适合 AI 协作的原因：代码结构简单、单文件可运行、修改即时可见

**2.3 适用场景**

- 快速原型验证游戏概念
- H5 小游戏（微信、抖音等平台）
- 教学演示和入门学习

### 环节 3：game-engine skill 简介（5分钟）

- 技能定位：项目特定技能，提供 Phaser 游戏开发知识库
- 核心内容：游戏循环、物理碰撞、精灵动画、音频处理
- 模板资源：paddle-game、platform-game 等
- 触发方式：`/game-engine` 或描述游戏开发需求自动触发

### 环节 4：游戏开发 AI 协作技巧（10分钟）

- 提示词范式："创建一个塔防游戏，使用 Phaser，包含波次系统和塔放置功能"
- 分阶段策略：先核心 → 再扩展 → 最后优化
- 迭代优化技巧：如何有效描述修改需求
- 技能组合：brainstorming → writing-plans → game-engine → verification

### 环节 5：塔防游戏设计示范（10分钟）

使用 brainstorming skill 实际演示：
1. 描述游戏概念 → AI 提问澄清
2. AI 提出 2-3 种设计方案
3. 用户选择方案 → AI 展示设计细节
4. 输出设计文档

---

## 第二节课大纲（45分钟）

**主题**: Superpowers 工作流实战 — 塔防游戏完整开发

### 环节 1：Brainstorming — 从想法到设计（8分钟）

**目标**: 演示如何用 brainstorming skill 将塔防游戏概念转化为可执行的设计文档

- 描述游戏概念："创建一个塔防游戏，有塔放置、敌人波次、攻击系统"
- AI 提问澄清：敌人类型？塔的数量限制？胜利/失败条件？
- AI 提出 2-3 种设计方案（经典塔防 / 路线固定 / 自由放置）
- 用户选择方案 → AI 展示完整设计细节
- 输出设计文档到 `docs/superpowers/specs/tower-defense-design.md`
- **关键教学点**: 不要直接写代码，先用 brainstorming 理清需求

### 环节 2：Writing-Plans — 从设计到实施计划（7分钟）

**目标**: 演示 writing-plans skill 如何将设计文档拆解为可执行的编号步骤

- 读取 brainstorming 产出的设计文档
- AI 分析项目结构，识别关键模块
- 生成编号实施计划：
  - Step 1: 创建游戏场景与基础配置
  - Step 2: 实现敌人系统与路径移动
  - Step 3: 实现塔放置与网格验证
  - Step 4: 实现攻击逻辑与碰撞检测
  - Step 5: 实现波次系统与游戏状态
  - Step 6: 添加 UI（得分、生命值、波次提示）
- 每个步骤标注：涉及文件、技术要点、验证方式
- 用户审查计划 → 确认无误后进入开发
- **关键教学点**: 计划是 AI 和人类的"契约"，确保方向正确再动手

### 环节 3：Subagent-Driven-Development — 并行开发核心功能（15分钟）

**目标**: 演示 subagent 模式如何实现高效的模块化开发

- **主 Agent 调度**: 按 writing-plans 编号步骤逐个启动 subagent
- **Step 1 — 游戏场景** (2分钟): 启动 general-purpose subagent 创建 Phaser 场景、游戏循环、地图渲染
- **Step 2 — 敌人系统** (3分钟): 启动 subagent 实现敌人生成、路径跟随、生命值管理
- **Step 3 — 塔系统** (4分钟): 启动 subagent 实现塔放置、网格验证、攻击范围检测
- **Step 4 — 攻击与碰撞** (3分钟): 启动 subagent 实现子弹发射、碰撞检测、伤害计算
- **Step 5 — 波次系统** (3分钟): 启动 subagent 实现波次管理、敌人波次生成、胜利/失败判定
- **每个 subagent 的 prompt 结构**:
  - 明确任务范围（只做当前 step，不多做）
  - 引用设计文档中的具体需求
  - 指定输出文件格式和验证方式
- **关键教学点**: 一个 subagent 一个任务，主 Agent 保持上下文清晰

### 环节 4：Systematic-Debugging — 调试与验证（8分钟）

**目标**: 演示 systematic-debugging skill 如何高效定位和修复游戏 Bug

- 典型 Bug 场景演示：
  - 敌人不沿路径移动 → 检查路径点数据 → 发现坐标偏移 → 修复
  - 塔不攻击敌人 → 检查碰撞检测逻辑 → 发现射程计算错误 → 修复
  - 子弹穿过敌人无伤害 → 检查碰撞回调 → 发现物理引擎未启用 → 修复
- **Systematic-Debugging 流程**:
  1. 复现问题：明确 Bug 表现
  2. 定位根因：缩小范围到具体模块
  3. 提出假设：最可能的原因是什么
  4. 验证假设：添加日志或断点确认
  5. 修复并回归测试
- **verification-before-completion**: 每个 subagent 完成后必须自验证
- **关键教学点**: 调试不是试错，是系统化的排除过程

### 环节 5：扩展与总结（7分钟）

**目标**: 展示迭代扩展能力和课程总结

- 基于已完成的塔防原型，快速扩展：
  - 多塔类型（箭塔、炮塔、减速塔）
  - 塔升级机制
  - 得分与金币系统
  - 音效与动画
- **Superpowers 工作流回顾**:
  - brainstorming → 理清需求
  - writing-plans → 拆解步骤
  - subagent-driven → 并行开发
  - systematic-debugging → 系统修复
- **课后实践**: 独立完成一个带有至少 3 种塔类型的塔防游戏

---

## HTML 课件技术实现

### 文件结构

```
├── index.html              # 课件主页面
├── css/
│   └── style.css          # 课件样式
├── assets/
│   ├── images/            # 示意图、流程图
│   └── demos/             # 游戏演示代码
└── sections/
    ├── section1.html      # 第一节课内容
    └── section2.html      # 第二节课内容
```

### 交互功能

- 时间进度条：显示当前环节进度
- 代码高亮：嵌入代码示例，语法高亮
- 流程图展示：SVG 或 Mermaid 渲染技能调用图
- 游戏演示嵌入：iframe 嵌入可运行的 Phaser 游戏
- 导航跳转：侧边栏导航

### 关键视觉元素

- Unity vs Phaser 对比表
- superpowers 技能流程图（brainstorming → writing-plans → subagent → debugging）
- 塔防游戏架构图
- AI 协作时序图
- Subagent 并行开发示意图
- Systematic-Debugging 五步流程图

---

## 产出清单

| 产出 | 说明 |
|------|------|
| PPT 课件 | 包含两节课完整内容的可展示课件（约 25 页） |
| 塔防游戏设计文档 | brainstorming 环节产出的设计文档 |
| 实施计划文档 | writing-plans 环节产出的编号步骤计划 |
| 塔防游戏示例代码 | subagent 开发完成的完整原型 |
| 教师教学笔记 | 每个 superpowers 环节的讲解要点、时间把控建议 |
