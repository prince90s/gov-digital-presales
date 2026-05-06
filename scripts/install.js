#!/usr/bin/env node

/**
 * OpenClaw Skill 安装脚本
 * 在 npm install 后自动执行，将 skill 文件复制到 OpenClaw 的 skills 目录
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 获取 OpenClaw skills 目录
function getOpenClawSkillsDir() {
  // 尝试多个可能的路径
  const possiblePaths = [
    path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'skills'),
    path.join(process.env.HOME || process.env.USERPROFILE, '.qclaw', 'skills'),
    path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'workspace', 'skills'),
    path.join(process.env.HOME || process.env.USERPROFILE, '.qclaw', 'workspace', 'skills')
  ];

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  // 如果都不存在，返回默认路径
  return path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'skills');
}

// 复制文件或目录
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 主安装函数
function install() {
  log('🚀 开始安装 gov-digital-presales Skill...', 'blue');

  const packageDir = __dirname;
  const skillName = 'gov-digital-presales';
  const skillsDir = getOpenClawSkillsDir();
  const destDir = path.join(skillsDir, skillName);

  log(`📁 目标目录: ${destDir}`, 'yellow');

  // 创建目标目录
  if (!fs.existsSync(skillsDir)) {
    log(`📂 创建 skills 目录: ${skillsDir}`, 'yellow');
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  // 复制文件
  const filesToCopy = ['SKILL.md', 'README.md', 'LICENSE', '政府数字化售前顾问Skill说明.md'];
  const dirsToCopy = ['references'];

  filesToCopy.forEach(file => {
    const src = path.join(packageDir, file);
    const dest = path.join(destDir, file);
    if (fs.existsSync(src)) {
      copyRecursive(src, dest);
      log(`✅ 已复制: ${file}`, 'green');
    } else {
      log(`⚠️  文件不存在: ${file}`, 'yellow');
    }
  });

  dirsToCopy.forEach(dir => {
    const src = path.join(packageDir, dir);
    const dest = path.join(destDir, dir);
    if (fs.existsSync(src)) {
      copyRecursive(src, dest);
      log(`✅ 已复制目录: ${dir}/`, 'green');
    } else {
      log(`⚠️  目录不存在: ${dir}/`, 'yellow');
    }
  });

  log('', 'reset');
  log('✨ 安装完成！', 'green');
  log('', 'reset');
  log('📝 下一步操作:', 'blue');
  log('   1. 重启 OpenClaw 或重新加载 Skill', 'reset');
  log('   2. 发送 "查看当前已加载的 Skill" 验证安装', 'reset');
  log('   3. 使用关键词触发: "政府数字化"、"智慧城市"、"等保合规" 等', 'reset');
  log('', 'reset');
  log('📚 更多信息请访问: https://github.com/prince90s/gov-digital-presales', 'blue');
}

// 执行安装
try {
  install();
} catch (error) {
  log(`❌ 安装失败: ${error.message}`, 'red');
  log('', 'reset');
  log('💡 提示:', 'yellow');
  log('   1. 确保 OpenClaw 已正确安装', 'reset');
  log('   2. 检查是否有足够的权限', 'reset');
  log('   3. 手动复制文件到 OpenClaw skills 目录', 'reset');
  process.exit(1);
}
