// API configuration và utilities
import { API_CONFIG, ENDPOINTS } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
}

export interface MenuItem {
  url: string;
  label: string;
  icon: string;
}

export interface Setting {
  id: number;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  type: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Settings API methods
  async getAllSettings(): Promise<ApiResponse<Setting[]>> {
    return this.request<Setting[]>(ENDPOINTS.SETTINGS);
  }

  async getSettingByKey(key: string): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(`${ENDPOINTS.SETTINGS}/${key}`);
  }

  async getMenuSettings(): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(ENDPOINTS.SETTINGS_MENU);
  }

  async getMultipleSettings(keys: string[]): Promise<ApiResponse<Record<string, any>>> {
    return this.request<Record<string, any>>(ENDPOINTS.SETTINGS_BULK, {
      method: 'POST',
      body: JSON.stringify({ keys }),
    });
  }

  async createOrUpdateSetting(key: string, value: any): Promise<ApiResponse<Setting>> {
    return this.request<Setting>(ENDPOINTS.SETTINGS, {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  }

  // Categories API methods
  async getAllCategories(params?: {
    type?: string;
    search?: string;
    status?: string;
    per_page?: number;
  }): Promise<ApiResponse<Category[]>> {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.append('type', params.type);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    
    const url = searchParams.toString() 
      ? `${ENDPOINTS.CATEGORIES}?${searchParams.toString()}`
      : ENDPOINTS.CATEGORIES;
    
    return this.request<Category[]>(url);
  }

  async getActiveCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>(ENDPOINTS.CATEGORIES_ACTIVE);
  }

  async getCategoriesByType(type: string): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>(`${ENDPOINTS.CATEGORIES_BY_TYPE}?type=${type}`);
  }

  async getCategoryTypes(): Promise<ApiResponse<Record<string, string>>> {
    return this.request<Record<string, string>>(ENDPOINTS.CATEGORIES_TYPES);
  }

  async createCategory(data: Partial<Category>): Promise<ApiResponse<Category>> {
    return this.request<Category>(ENDPOINTS.CATEGORIES, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<ApiResponse<Category>> {
    return this.request<Category>(`${ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`${ENDPOINTS.CATEGORIES}/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions
export const settingsApi = {
  getMenu: () => apiClient.getMenuSettings(),
  getAll: () => apiClient.getAllSettings(),
  getByKey: (key: string) => apiClient.getSettingByKey(key),
  getBulk: (keys: string[]) => apiClient.getMultipleSettings(keys),
  save: (key: string, value: any) => apiClient.createOrUpdateSetting(key, value),
};

export const categoriesApi = {
  getAll: (params?: { type?: string; search?: string; status?: string; per_page?: number }) => 
    apiClient.getAllCategories(params),
  getActive: () => apiClient.getActiveCategories(),
  getByType: (type: string) => apiClient.getCategoriesByType(type),
  getTypes: () => apiClient.getCategoryTypes(),
  create: (data: Partial<Category>) => apiClient.createCategory(data),
  update: (id: number, data: Partial<Category>) => apiClient.updateCategory(id, data),
  delete: (id: number) => apiClient.deleteCategory(id),
}; 