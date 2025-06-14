
import { BaseTool, Tool, ToolDefinition } from '@zhama/mcp-server';

// Define a simple calculator tool
@Tool({
    name: 'getPatientInfo',
    description: 'Get patient info from database/获取患者信息',
    parameters: [
      {
        name: 'tenantId',
        type: 'string',
        description: 'The tenant id',
        required: true
      },
      {
        name: 'storeId ',
        type: 'number',
        description: 'The store id',
        required: true
      },
      {
        name: 'patientName',
        type: 'string',
        description: 'The patient name',
        required: true
      }
    ]
  })
  export class PatientInfoTool extends BaseTool {
    protected toolDefinition: ToolDefinition = {
      name: 'getPatientInfo',
      description: 'Get patient info from database/获取患者信息',
      parameters: []
    };

    protected async executeInternal(parameters: Record<string, unknown>): Promise<unknown> {
      const { tenantId, storeId, patientName } = parameters;
      console.log(parameters);
      console.log(tenantId, storeId, patientName);
      return {
        code: 200,
        msg: '成功',
        data: {
          patientId: '1234',
          patientName: '张三',
          medicalRecordNo: 'L0014976',
          tenantId: '92fcd655-ebc1-450b-a0c9-d33958d07345',
          storeId: '1',
          appointmentId: '1234',
          appointmentStatus: '40'
        }
      };
    }
  }
