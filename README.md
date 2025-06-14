# TCare MCP 服务器

这是一个基于 TypeScript 的 MCP（模型上下文协议）服务器，专为 TCare 医疗系统设计，用于提供医疗数据管理和患者信息查询功能。

## 📋 项目概述

本项目是一个医疗领域的 MCP 服务器，集成了以下核心功能：
- 📊 患者信息查询工具
- 📝 电子病历保存工具
- 🔧 基于装饰器模式的工具框架
- ⚙️ 灵活的配置管理系统

## 🏗️ 项目架构

```
src/
├── index.ts                # 主入口文件，服务器启动和配置
├── config/
│   └── index.ts           # 环境配置和验证
└── tools/
    ├── index.ts           # 工具导出
    ├── MedicalRecordTool.ts   # 电子病历保存工具
    └── PatientInfoTool.ts     # 患者信息查询工具
```

## 🚀 核心功能

### 1. 患者信息查询工具 (PatientInfoTool)

**功能描述**: 从数据库查询患者基本信息

**输入参数**:
- `tenantId` (必需): 租户ID，用于多租户隔离
- `storeId` (必需): 门店ID，标识特定医疗机构
- `patientName` (必需): 患者姓名

**返回数据**:
```json
{
  "code": 200,
  "msg": "成功",
  "data": {
    "patientId": "1234",
    "patientName": "张三",
    "medicalRecordNo": "L0014976",
    "tenantId": "92fcd655-ebc1-450b-a0c9-d33958d07345",
    "storeId": "1",
    "appointmentId": "1234",
    "appointmentStatus": "40"
  }
}
```

### 2. 电子病历保存工具 (MedicalRecordTool)

**功能描述**: 保存完整的电子病历信息到数据库

**输入参数**:
- **必需参数**:
  - `tenantId`: 租户ID
  - `storeId`: 门店ID  
  - `patientId`: 患者ID
  - `appointmentId`: 预约单ID
  - `medicalRecordNo`: 病历号

- **可选参数** (医疗记录详情):
  - `chiefComplaint`: 主诉
  - `history`: 现病史
  - `pastHistory`: 既往史
  - `oralCheck`: 口腔检查
  - `diagnose`: 诊断
  - `plan`: 治疗计划
  - `cure`: 治疗方案
  - `advice`: 医嘱
  - `radiologyCheck`: 辅助检查

**返回数据**:
```json
{
  "code": 200,
  "msg": "成功",
  "data": "123"
}
```

## 🛠️ 技术特点

### 装饰器驱动开发
项目使用 `@Tool` 装饰器来定义工具，提供了清晰的元数据声明：

```typescript
@Tool({
    name: 'saveMedicalRecord',
    description: 'Save medical record to database/保存电子病历',
    parameters: [
      {
        name: 'tenantId',
        type: 'string',
        description: 'The tenant id/租户id',
        required: true
      }
      // ... 更多参数
    ]
})
export class MedicalRecordTool extends BaseTool {
    // 工具实现
}
```

### 环境配置管理
使用 Zod 进行严格的环境变量验证：

```typescript
const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  API_TIMEOUT: z.string().transform(Number).default('30000')
});
```

### 多运行模式支持
- **STDIO 模式**: 适用于 Claude Desktop 集成
- **SSE 模式**: 适用于 Web 应用程序

## 🔧 安装和使用

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
# TypeScript 开发模式
npm run dev

# 或指定运行模式
npm run dev:stdio
```

### 生产模式运行
```bash
# 构建项目
npm run build

# STDIO 模式启动
node dist/index.js --stdio

# SSE 模式启动（默认端口3000）
node dist/index.js
```

## 📦 核心依赖

- `@zhama/mcp-server`: MCP 服务器框架
- `zod`: 类型安全的数据验证
- `dotenv`: 环境变量管理
- `typescript`: TypeScript 支持

## 🎯 应用场景

此 MCP 服务器特别适用于：

1. **医疗机构管理系统**: 多租户医疗数据管理
2. **AI 医疗助手**: 为 AI 模型提供结构化医疗数据访问
3. **电子病历系统**: 标准化病历信息存储和检索
4. **医疗数据集成**: 统一的医疗数据访问接口

## 📄 许可证

MIT

---

*本项目基于 @zhama/mcp-server 框架构建，专注于医疗健康领域的数据管理和 AI 集成。* 