import { supabase, type Project } from '../lib/supabase'

export class ProjectService {
  // 프로젝트 목록 가져오기
  static async getProjectsByLanguage(_language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .order('start_date', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      throw error
    }
  }

  // 특정 프로젝트 가져오기
  static async getProjectById(id: string, _language: 'en' | 'ko'): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*),
          troubles:trouble(*)
        `)
        .eq('project_id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null
        }
        console.error('Error fetching project:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to fetch project:', error)
      throw error
    }
  }

  // 모든 프로젝트 가져오기 (언어 무관)
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching all projects:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch all projects:', error)
      throw error
    }
  }

  // 카테고리별 프로젝트 가져오기 (JSONB 필드에서 검색)
  static async getProjectsByCategory(category: string, _language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .or(`category->ko.eq.${category},category->en.eq.${category}`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects by category:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch projects by category:', error)
      throw error
    }
  }

  // 프로젝트 검색 (JSONB 필드에서 검색)
  static async searchProjects(query: string, _language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .or(`title->ko.ilike.%${query}%,title->en.ilike.%${query}%,description->ko.ilike.%${query}%,description->en.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching projects:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to search projects:', error)
      throw error
    }
  }
}