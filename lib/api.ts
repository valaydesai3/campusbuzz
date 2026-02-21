// lib/api.ts
import { supabase } from './supabase';

export class ApiClient {
  async post<T>(functionName: string, body: any): Promise<T> {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body,
    });

    if (error) throw error;
    return data as T;
  }

  async get<T>(functionName: string): Promise<T> {
    const { data, error } = await supabase.functions.invoke(functionName, {
      method: 'GET',
    });

    if (error) throw error;
    return data as T;
  }
}

export const api = new ApiClient();