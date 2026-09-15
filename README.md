# CYANO Portfolio

当前作品集的独立工程副本，包含页面源码、动画、压缩图片和本地视频。

## 本地运行

安装 Node.js 和 pnpm，然后在本目录运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 构建与预览

```sh
pnpm build
pnpm preview
```

部署平台构建命令：`pnpm build`；发布目录：`dist`。
Vite 已配置相对资源路径 `base: './'`，页面使用 hash 路由。
请通过本地服务或静态托管浏览，不要直接双击 HTML。

## 上传 GitHub

将这个目录作为仓库根目录提交（包含 public、src、package.json 和 pnpm-lock.yaml）。
推荐用 Git 或 GitHub Desktop 上传完整目录。node_modules、dist、本地工具配置和环境文件已忽略。
本副本尚未上传或部署，也不包含原仓库的 Git 历史。

图片已使用保留原始尺寸的 WebP 版本，已替代的大体积原图未重复打包；原工程仍保留原图。
视频均随工程保存，不依赖本机 D 盘路径。媒体较多，首次上传和部署需要一定时间。
