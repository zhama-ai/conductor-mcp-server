
import { BaseTool, Tool, ToolDefinition } from '@zhama/mcp-server';
import TCareService from '../service/TCareService';

// Define a simple calculator tool
@Tool({
    name: 'saveMedicalRecord',
    description: `根据tcare token、租户id、门店id、患者id、预约单id、病历号、主诉、现病史、既往史、口腔检查、诊断、治疗计划、治疗、医嘱、辅助检查来更新患者问诊信息到电子病历系统,其中患者id、预约单id、病历号需要从getPatientInfo中获取,返回信息示例如下:
{
    "code": 200,
    "msg": "成功",
    "data": "123"
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
        name: 'patientId',
        type: 'string',
        description: '患者id',
        required: false
      },
      // // appointmentId 是 String 预约单IdmedicalRecordNo 是 String 病历号chiefComplaint 否 String 主诉主诉history 否 String 现病现病史病史pastHistory 否 String 既往既往史往史oralCheck 否 String 口腔口腔检腔检查检查diagnose 否 String 诊断诊断plan 否 String 治疗治疗计疗计划计划cure 否 String 处置处置advice 否 String 医嘱医嘱radiologyCheck 否 String 辅助辅助检助检查检查

      {
        name: 'appointmentId',
        type: 'string',
        description: '预约单id',
        required: false
      },
      {
        name: 'medicalRecordNo',
        type: 'string',
        description: '病历号',
        required: false
      },
      {
        name: 'chiefComplaint',
        type: 'string',
        description: '主诉',
        required: false
      },
      {
        name: 'history',
        type: 'string',
        description: '现病史',
        required: false
      },
      {
        name: 'pastHistory',
        type: 'string',
        description: '既往史',
        required: false
      },
      {
        name: 'oralCheck',
        type: 'string',
        description: '口腔检查',
        required: false
      },
      {
        name: 'diagnose',
        type: 'string',
        description: '诊断',
        required: false
      },
      {
        name: 'plan',
        type: 'string',
        description: '治疗计划',
        required: false
      },
      {
        name: 'cure',
        type: 'string',
        description: '治疗',
        required: false
      },
      {
        name: 'advice',
        type: 'string',
        description: '医嘱',
        required: false
      },
      {
        name: 'radiologyCheck',
        type: 'string',
        description: '辅助检查',
        required: false
      }
    ]
  })
  export class MedicalRecordTool extends BaseTool {
    protected toolDefinition: ToolDefinition = {
      name: 'saveMedicalRecord',
      description: '更新患者问诊信息到电子病历系统',
      parameters: []
    };

    protected async executeInternal(parameters: Record<string, string>): Promise<unknown> {
      const { token,tenantId, storeId, patientId, appointmentId, medicalRecordNo, chiefComplaint, history, pastHistory, oralCheck, diagnose, plan, cure, advice, radiologyCheck } = parameters;
      /*
      {"tenantId": "92fcd655-ebc1-450b-a0c9-d33958d07345","patientId": "1234","storeId": "1","appointmentId": "1234","medicalRecordNo": "L0014976","oralCheck": "右下区域大牙有大洞，敲诊稍有疼痛，凉风刺激剧烈疼痛。","pastHistory": "无陈述","advice": "来院进行根管治疗，治疗后需按时复诊，注意口腔卫生。","diagnose": "右下牙龋病，牙髓炎","radiologyCheck": "无","history": "患者1周前开始感到右下牙在吃冷的热的⻝物时疼痛，昨晚疼痛加剧，疼得无法入睡，服用止疼药后方能入睡。","cure": "无陈述","chiefComplaint": "右下牙疼1周，昨天晚上疼痛加剧。","plan": "右下区待定牙位行根管治疗，后续需要做牙冠修复。"}
      */
      const result = await TCareService.saveMedicalRecord(token, {
        tenantId: tenantId || '',
        storeId: storeId || '',
        patientId: patientId || '',
        appointmentId: appointmentId || '',
        medicalRecordNo: medicalRecordNo || '',
        chiefComplaint: chiefComplaint || '',
        history: history || '',
        pastHistory: pastHistory || '',
        oralCheck: oralCheck || '',
        diagnose: diagnose || '',
        plan: plan || '',
        cure: cure || '',
        advice: advice || '',
        radiologyCheck: radiologyCheck || ''
      });
      return result;
    }
  }
