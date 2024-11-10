import { api } from '@api/config';
import { EExamStatus } from '@enum/exam';
import { BaseResponse, TPagingResponse } from '@type/response.type';
import { AddExamREQ, EditExamREQ, ExamREQ } from './exam.request';
import { ExamDetailRESP, ExamRESP } from './exam.response';

const BASE_URL = '/exams';

export const getExamListAPI = (data: ExamREQ): Promise<TPagingResponse<ExamRESP[]>> => api.get(`${BASE_URL}/examList`, { params: data });

export const addExamAPI = (data: AddExamREQ): Promise<BaseResponse<void>> => api.post(`${BASE_URL}/addExam`, data);

export const deleteExamAPI = (id: string): Promise<BaseResponse<void>> => api.delete(`${BASE_URL}/deleteExam`, { params: { id } });

export const getExamDetailAPI = (id: string): Promise<BaseResponse<ExamDetailRESP>> => api.get(`${BASE_URL}/detail`, { params: { id } });

export const updateStatusAPI = (id: string, status: EExamStatus): Promise<BaseResponse<void>> =>
  api.put(`${BASE_URL}/status`, { status }, { params: { id } });

export const editExamAPI = (id: string, data: EditExamREQ): Promise<BaseResponse<void>> => api.put(`${BASE_URL}/edit`, data, { params: { id } });
