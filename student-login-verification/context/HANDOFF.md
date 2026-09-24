# Handoff

## 最近完成

- 已创建“学生账号验证登录”独立项目空间，记录初始需求并登记工作区项目索引。
- 已完成“编辑机构信息”页面复刻，并增加“是否验证登录（是/否）”设置项。
- 已完成 PC 教师端成员管理和移动端学生详情复刻，并增加对应学生的“生成登录码”入口。
- 已创建 `demo/index.html` 统一管理三个页面。
- 已发布至 GitHub Pages，工作流运行成功。

## 当前阻塞

- 无。

## 下一步建议

- 根据用户后续指示，细化其他账号的判定规则、老师发送验证码及学生验证流程。
- 根据用户反馈微调 PC / 移动端 Demo，确认后再推进验证码完整流程、PRD 或 Figma。

## 关键路径

- Demo 目录：`demo/index.html`
- 机构设置：`demo/0924-机构登录验证设置.html`
- PC 教师端：`demo/0924-教师端成员管理-登录验证码.html`
- 移动端：`demo/0924-学生详情-移动端.html`
- 在线 Demo：https://mazheng0823-byte.github.io/tianxue/student-login-verification/
- GitHub：https://github.com/mazheng0823-byte/tianxue/tree/main/student-login-verification
- PRD：
- Figma：

## 注意事项

- 当前 Demo 默认将“是否验证登录”展示为“否”，保存后会反馈当前选择。
- 验证码每次点击动态生成 4 位数字，失效时间为生成时刻加 1 小时。
