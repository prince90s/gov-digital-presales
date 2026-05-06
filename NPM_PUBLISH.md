# NPM 发布指南

## 📦 包信息

- **包名**: `@prince90s/gov-digital-presales`
- **版本**: 1.0.0
- **描述**: 政府数字化售前顾问 Skill，覆盖数字政府、智慧城市、一网通办、城市大脑、政务云等 ToG 项目的全流程售前支持
- **许可证**: MIT

## 🚀 发布到 NPM

### 前置条件

1. 注册 [NPM 账号](https://www.npmjs.com/signup)
2. 登录 NPM：

```bash
npm login
```

### 发布步骤

1. **进入项目目录**

```bash
cd C:\Users\zjq\Desktop\gov-digital-presales
```

2. **检查包名是否可用**

```bash
npm view @prince90s/gov-digital-presales
```

如果返回 404，说明包名可用。

3. **发布包**

```bash
npm publish --access public
```

注意：使用 `@scope` 格式的包名（如 `@prince90s/xxx`）需要添加 `--access public` 参数。

4. **验证发布**

访问 https://www.npmjs.com/package/@prince90s/gov-digital-presales 查看包信息。

### 更新版本

如果需要更新版本，使用以下命令：

```bash
# 补丁版本（bug 修复）
npm version patch

# 次要版本（新功能，向后兼容）
npm version minor

# 主要版本（不兼容的更改）
npm version major

# 发布新版本
npm publish --access public
```

## 📥 用户安装方式

### 方式 1：通过 npm 安装（推荐）

```bash
npm install @prince90s/gov-digital-presales
```

安装完成后，脚本会自动将 skill 文件复制到 OpenClaw 的 skills 目录。

### 方式 2：通过 yarn 安装

```bash
yarn add @prince90s/gov-digital-presales
```

### 方式 3：通过 pnpm 安装

```bash
pnpm add @prince90s/gov-digital-presales
```

## 🔧 安装后操作

安装完成后，需要：

1. **重启 OpenClaw 或重新加载 Skill**

2. **验证安装**

发送消息：`查看当前已加载的 Skill`

3. **使用 Skill**

使用以下任一关键词触发：
- "政府数字化"
- "智慧城市"
- "等保合规"
- "政务云"
- "信创适配"

## 📂 安装位置

脚本会自动将文件复制到以下位置之一（按优先级）：

- `~/.openclaw/skills/gov-digital-presales/`
- `~/.qclaw/skills/gov-digital-presales/`
- `~/.openclaw/workspace/skills/gov-digital-presales/`
- `~/.qclaw/workspace/skills/gov-digital-presales/`

## 🛠️ 手动安装

如果自动安装失败，可以手动复制文件：

```bash
# Windows
xcopy /E /I C:\Users\zjq\Desktop\gov-digital-presales C:\Users\zjq\.openclaw\skills\gov-digital-presales\

# macOS/Linux
cp -r gov-digital-presales ~/.openclaw/skills/
```

## 📝 package.json 说明

```json
{
  "name": "@prince90s/gov-digital-presales",
  "version": "1.0.0",
  "description": "政府数字化售前顾问 Skill...",
  "main": "SKILL.md",
  "files": [
    "SKILL.md",
    "README.md",
    "LICENSE",
    "政府数字化售前顾问Skill说明.md",
    "references/"
  ],
  "scripts": {
    "postinstall": "node scripts/install.js"
  },
  "openclaw": {
    "name": "gov-digital-presales",
    "description": "政府数字化售前顾问 Skill...",
    "version": "1.0.0",
    "category": "presales",
    "tags": ["government", "digital", "smart-city", "presales", "compliance"]
  }
}
```

### 关键字段说明

- `name`: npm 包名，使用 `@scope` 格式
- `version`: 版本号，遵循语义化版本规范
- `main`: 主入口文件
- `files`: 需要包含在 npm 包中的文件和目录
- `scripts.postinstall`: 安装后自动执行的脚本
- `openclaw`: OpenClaw 特定的元数据

## 🔍 搜索包

发布后，用户可以通过以下方式搜索：

```bash
npm search gov-digital-presales
```

或在 NPM 网站搜索：https://www.npmjs.com/search?q=gov-digital-presales

## 📊 查看下载量

```bash
npm view @prince90s/gov-digital-presales
```

## 🐛 常见问题

### Q: 发布时提示 "403 Forbidden"

A: 检查是否已登录 npm，以及是否有权限发布到该 scope。

### Q: 安装后找不到 skill

A: 检查 OpenClaw 的 skills 目录路径，或手动复制文件。

### Q: 如何删除已发布的包？

A: npm 不支持删除已发布的包，只能发布新版本。如果需要，可以联系 npm 支持团队。

### Q: 如何设置私有包？

A: 发布时使用 `--access restricted` 参数，但需要付费 npm 账号。

## 📞 联系方式

如有问题，请提交 Issue：https://github.com/prince90s/gov-digital-presales/issues

---

**注意**: 首次发布前，请确保：
1. 已注册 npm 账号
2. 已登录 npm
3. 包名未被占用
4. package.json 配置正确
5. 所有需要包含的文件都在 `files` 字段中
