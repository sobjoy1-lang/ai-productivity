# 智能跃迁｜AI 与新质生产力

这是一个可以直接部署到 GitHub Pages 的静态数据专题站。页面用“供给 → 渗透 → 产出 → 情景模拟”讲述人工智能如何进入生产链。

## 本地预览

在当前目录运行：

    python -m http.server 8080

然后打开 http://localhost:8080/。图表使用 ECharts CDN，需要联网才能加载。

## GitHub Pages 发布

1. 新建 GitHub 仓库。
2. 上传本目录中的 index.html、styles.css、app.js 和本说明文件。
3. 在仓库的 Settings → Pages 中选择 Deploy from a branch。
4. 选择 main 分支和 root，保存后等待链接生成。

## 数据口径

- 中国宏观数据主要来自国家统计局、工业和信息化部、国家数据局和 CNNIC。
- 全球组织采用率和 AI 投资来自 Stanford HAI AI Index 2025。
- 机器人密度来自 IFR World Robotics。
- 生产率案例来自 NBER 现场研究与中国信通院报告。
- 页面保留年份、单位和来源链接。“约”“超过”沿用原始数据表述。
- 公众生成式 AI 普及率、组织 AI 采用率、机器人产量和机器人装机量属于不同统计口径，页面分开呈现。
