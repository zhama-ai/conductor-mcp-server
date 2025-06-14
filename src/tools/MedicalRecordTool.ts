
import { BaseTool, Tool, ToolDefinition } from '@zhama/mcp-server';

// Define a simple calculator tool
@Tool({
    name: 'saveMedicalRecord',
    description: 'Save medical record to database/保存电子病历',
    parameters: [
      {
        name: 'tenantId',
        type: 'string',
        description: 'The tenant id/租户id',
        required: true
      },
      {
        name: 'storeId ',
        type: 'number',
        description: 'The store id/门店id',
        required: true
      },
      {
        name: 'patientId',
        type: 'string',
        description: 'The patient id/患者id',
        required: true
      },
      // appointmentId 是 String 预约单IdmedicalRecordNo 是 String 病历号chiefComplaint 否 String 主诉主诉history 否 String 现病现病史病史pastHistory 否 String 既往既往史往史oralCheck 否 String 口腔口腔检腔检查检查diagnose 否 String 诊断诊断plan 否 String 治疗治疗计疗计划计划cure 否 String 处置处置advice 否 String 医嘱医嘱radiologyCheck 否 String 辅助辅助检助检查检查

      {
        name: 'appointmentId',
        type: 'string',
        description: 'The appointment id/预约单id',
        required: true
      },
      {
        name: 'medicalRecordNo',
        type: 'string',
        description: 'The medical record no/病历号',
        required: true
      },
      {
        name: 'chiefComplaint',
        type: 'string',
        description: 'The chief complaint/主诉',
        required: false
      },
      {
        name: 'history',
        type: 'string',
        description: 'The history/现病史',
        required: false
      },
      {
        name: 'pastHistory',
        type: 'string',
        description: 'The past history/既往史',
        required: false
      },
      {
        name: 'oralCheck',
        type: 'string',
        description: 'The oral check/口腔检查',
        required: false
      },
      {
        name: 'diagnose',
        type: 'string',
        description: 'The diagnose/诊断',
        required: false
      },
      {
        name: 'plan',
        type: 'string',
        description: 'The plan/治疗计划',
        required: false
      },
      {
        name: 'cure',
        type: 'string',
        description: 'The cure/治疗',
        required: false
      },
      {
        name: 'advice',
        type: 'string',
        description: 'The advice/医嘱',
        required: false
      },
      {
        name: 'radiologyCheck',
        type: 'string',
        description: 'The radiology check/辅助检查',
        required: false
      }
    ]
  })
  export class MedicalRecordTool extends BaseTool {
    protected toolDefinition: ToolDefinition = {
      name: 'saveMedicalRecord',
      description: 'Save medical record to database/保存电子病历',
      parameters: []
    };

    protected async executeInternal(parameters: Record<string, unknown>): Promise<unknown> {
      const { tenantId, storeId, patientId, appointmentId, medicalRecordNo, chiefComplaint, history, pastHistory, oralCheck, diagnose, plan, cure, advice, radiologyCheck } = parameters;
      /*
      {"tenantId": "92fcd655-ebc1-450b-a0c9-d33958d07345","patientId": "1234","storeId": "1","appointmentId": "1234","medicalRecordNo": "L0014976","oralCheck": "右下区域大牙有大洞，敲诊稍有疼痛，凉风刺激剧烈疼痛。","pastHistory": "无陈述","advice": "来院进行根管治疗，治疗后需按时复诊，注意口腔卫生。","diagnose": "右下牙龋病，牙髓炎","radiologyCheck": "无","history": "患者1周前开始感到右下牙在吃冷的热的⻝物时疼痛，昨晚疼痛加剧，疼得无法入睡，服用止疼药后方能入睡。","cure": "无陈述","chiefComplaint": "右下牙疼1周，昨天晚上疼痛加剧。","plan": "右下区待定牙位行根管治疗，后续需要做牙冠修复。"}
      */
      console.log(parameters);
      console.log(tenantId, storeId, patientId, appointmentId, medicalRecordNo, chiefComplaint, history, pastHistory, oralCheck, diagnose, plan, cure, advice, radiologyCheck);
      return {
        code: 200,
        msg: '成功',
        data: '123'
      };
    }
  }
