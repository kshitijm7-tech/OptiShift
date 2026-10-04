// API client tests (P04) with a mocked fetch boundary.
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ApiError,
  createEmployee,
  friendlyErrorMessage,
  getEmployees,
  optimizeSchedule,
} from './api';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getEmployees', () => {
  it('returns the parsed team list', async () => {
    const team = [{ id: 'a', name: 'Priya' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(team)));
    await expect(getEmployees()).resolves.toEqual(team);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/employees'),
      expect.anything(),
    );
  });

  it('maps HTTP errors to ApiError with the backend detail', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ detail: 'boom' }, 500)),
    );
    const err = await getEmployees().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).detail).toBe('boom');
  });

  it('maps network failure to a connection ApiError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    const err = await getEmployees().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(0);
    expect(friendlyErrorMessage(err)).toMatch(/backend/i);
  });
});

describe('createEmployee', () => {
  it('POSTs the payload and returns the created employee', async () => {
    const created = { id: 'x', name: 'Arjun' };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(created, 201));
    vi.stubGlobal('fetch', fetchMock);
    const result = await createEmployee({
      name: 'Arjun',
      role: 'Barista',
      skills: [],
      hourly_pay: 17,
      max_weekly_hours: 40,
      availability: [],
      status: 'active',
    });
    expect(result).toEqual(created);
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');
  });
});

describe('optimizeSchedule', () => {
  it('POSTs the problem and returns the optimizer answer untouched', async () => {
    const answer = { status: 'optimal', assignments: [], violations: [] };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(answer));
    vi.stubGlobal('fetch', fetchMock);
    const result = await optimizeSchedule({
      employees: [],
      shifts: [],
      requirements: [],
    });
    expect(result.status).toBe('optimal');
    expect(fetchMock.mock.calls[0][0]).toContain('/api/v1/optimize');
  });
});
