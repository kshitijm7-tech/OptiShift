// OptiShift API client (P04). Single boundary for all backend calls.
// Backend base URL comes from VITE_API_URL; no hardcoded hosts elsewhere.
import { ApiError } from './types';
import type {
  Employee,
  EmployeeCreate,
  OptimizeRequest,
  OptimizationResult,
} from './types';

export { ApiError };

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toDetail(body: unknown, fallback: string): string {
  if (body && typeof body === 'object' && 'detail' in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === 'string') return detail;
    return JSON.stringify(detail);
  }
  if (typeof body === 'string' && body.length > 0) return body;
  return fallback;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new ApiError(0, 'Could not reach the OptiShift backend.');
  }
  const body = await parseBody(response);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      toDetail(body, `Request failed (${response.status}).`),
    );
  }
  return body as T;
}

export async function checkHealth(): Promise<{ status: string }> {
  return request<{ status: string }>('/health');
}

export async function getEmployees(): Promise<Employee[]> {
  return request<Employee[]>('/api/v1/employees');
}

export async function getEmployee(employeeId: string): Promise<Employee> {
  return request<Employee>(
    `/api/v1/employees/${encodeURIComponent(employeeId)}`,
  );
}

export async function createEmployee(
  employee: EmployeeCreate,
): Promise<Employee> {
  return request<Employee>('/api/v1/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  });
}

export async function optimizeSchedule(
  payload: OptimizeRequest,
): Promise<OptimizationResult> {
  // NOTE: the frontend never decides assignments itself. It only sends the
  // structured problem and renders the backend optimizer's answer.
  return request<OptimizationResult>('/api/v1/optimize', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function friendlyErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 0) {
      return "Couldn't reach the OptiShift backend. Is it running?";
    }
    return error.detail || 'Something went wrong. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}
