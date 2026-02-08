# 管理后台安全配置说明

## 安全方案

已实现**方案1：随机路径 + 访问令牌**，提供双重安全保护。

## 配置说明

### 环境变量

在 `.env.local`（开发环境）或 EdgeOne Pages 环境变量（生产环境）中配置：

```env
# 管理后台安全配置
ADMIN_SECRET_PATH=/5b7768811528673b  # 随机生成的管理后台路径（建议使用随机字符串）
ADMIN_ACCESS_TOKEN=soakckhaikkaot    # 访问令牌（你指定的令牌）

# 客户端需要知道管理后台路径（用于构建链接）
NEXT_PUBLIC_ADMIN_PATH=/5b7768811528673b  # 与 ADMIN_SECRET_PATH 相同
```

### 生成随机路径

如果需要生成新的随机路径，可以使用：

```bash
node -e "console.log('/' + require('crypto').randomBytes(8).toString('hex'))"
```

## 访问方式

### 开发环境

```
http://localhost:3000/5b7768811528673b/login?token=soakckhaikkaot
http://localhost:3000/5b7768811528673b?token=soakckhaikkaot
http://localhost:3000/5b7768811528673b/fanworks?token=soakckhaikkaot
```

### 生产环境

```
https://admin.seabedvn.cn/5b7768811528673b/login?token=soakckhaikkaot
https://admin.seabedvn.cn/5b7768811528673b?token=soakckhaikkaot
https://admin.seabedvn.cn/5b7768811528673b/fanworks?token=soakckhaikkaot
```

## 安全特性

1. **隐藏路径**：管理后台使用随机路径，不暴露真实入口
2. **访问令牌**：必须提供正确的令牌才能访问
3. **404 伪装**：未授权访问返回 404，不暴露管理后台存在
4. **Token 传递**：所有管理后台页面自动保留 token 参数

## 注意事项

1. **保密性**：
   - 不要将 `ADMIN_SECRET_PATH` 和 `ADMIN_ACCESS_TOKEN` 提交到 Git
   - 定期更换路径和令牌
   - 不要分享给不信任的人

2. **生产环境**：
   - 确保在 EdgeOne Pages 中正确配置环境变量
   - 使用 HTTPS（EdgeOne Pages 自动配置）
   - 定期检查访问日志

3. **备份**：
   - 记录好你的路径和令牌
   - 建议使用密码管理器保存

## 修改路径或令牌

如果需要修改：

1. 更新环境变量 `ADMIN_SECRET_PATH` 和 `ADMIN_ACCESS_TOKEN`
2. 同时更新 `NEXT_PUBLIC_ADMIN_PATH`（必须与 `ADMIN_SECRET_PATH` 相同）
3. 重新部署应用
4. 使用新的路径和令牌访问
