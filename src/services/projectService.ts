import { supabase, type Project } from '../lib/supabase'

export class ProjectService {
  // 언어별 프로젝트 목록 가져오기
  static async getProjectsByLanguage(language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .eq('lang', language)
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
  static async getProjectById(id: string, language: 'en' | 'ko'): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .eq('project_id', id)
        .eq('lang', language)
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

  // 카테고리별 프로젝트 가져오기
  static async getProjectsByCategory(category: string, language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .eq('category', category)
        .eq('lang', language)
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

  // 프로젝트 검색
  static async searchProjects(query: string, language: 'en' | 'ko'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('project')
        .select(`
          *,
          links:link(*),
          technologies:technology(*),
          contributions:contribution(*)
        `)
        .eq('lang', language)
        .or(`title.ilike.%${query}%, description.ilike.%${query}%, tag.cs.{${query}}`)
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