import { api } from '@api/config';
import { BaseResponse } from '@type/response.type';
import { ReportRESP, StatisticsRESP } from './report.response';

const BASE_URL = '/report';

export const getStatisticsAPI = (): Promise<BaseResponse<StatisticsRESP>> => api.get(`${BASE_URL}/statistics`);

export const getReportAPI = (): Promise<BaseResponse<ReportRESP[]>> => api.get(`${BASE_URL}`);
