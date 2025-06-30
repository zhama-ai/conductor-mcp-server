import config from '../config';

class TCareService {
    constructor() {
    }

    async getPatientInfo(token: string, tenantId: string, storeId: string, name: string) {
        console.log('==========TCareService.getPatientInfo==========');
        console.log(token, tenantId, storeId, name);
        const response = await fetch(`${config.tcare_server}/domain/aiHelper/getPatientInfo?tenantId=${tenantId}&storeId=${storeId}&name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json() as { code: number,msg: string, data: any };
        return result.data;
    }
    async saveMedicalRecord(token: string, medicalRecord: any) {
        console.log('==========TCareService.saveMedicalRecord==========');
        console.log(token,medicalRecord);
        const response = await fetch(`${config.tcare_server}/domain/aiHelper/saveEmr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(medicalRecord)
        });
        const result = await response.json() as { code: number,msg: string, data: any };
        return result.data;
    }
}

export default new TCareService();
