
import { BaseTool, Tool, ToolDefinition } from '@zhama/mcp-server';
import TCareService from '../service/TCareService';

// Define a simple calculator tool
@Tool({
    name: 'getPatientInfo',
    description: `根据tcare token、租户id、门店id、患者姓名来获取患者信息,返回信息示例如下:
{
    '病历号': 'L0014976',
    '预约单id': '1234',
    '患者id': '1234'
    '患者姓名': '张三',
    '患者性别': '男',
    '患者年龄': '20',
    '预约单状态': '40',
    '患者电话': '13800138000',
    '患者地址': '北京市海淀区',
    '患者身份证号': '11010519491231001X',
    '患者职业': '学生',
}
    `,
    parameters: [
      {
        name: 'token',
        type: 'string',
        description: 'tcare token',
        required: true
      },
      {
        name: 'tenantId',
        type: 'string',
        description: '租户id',
        required: false
      },
      {
        name: 'storeId',
        type: 'string',
        description: '门店id',
        required: false
      },
      {
        name: 'patientName',
        type: 'string',
        description: '患者姓名',
        required: false
      }
    ]
  })
  export class PatientInfoTool extends BaseTool {
    protected toolDefinition: ToolDefinition = {
      name: 'getPatientInfo',
      description: '获取患者信息',
      parameters: []
    };

    protected async executeInternal(parameters: Record<string, unknown>): Promise<unknown> {
      const { token, tenantId, storeId, patientName } = parameters;
      const patientInfo = await TCareService.getPatientInfo(token as string, tenantId as string, storeId as string, patientName as string);
      return patientInfo;
    }
  }
