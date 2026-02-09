import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ProjectLink {
    link_id: string;
    type: string | null;
    url: string | null;
    project_id: string;
    created_at: string;
    edited_at: string | null;
}

export interface Technology {
    technology_id: string;
    name: string | null;
    type: string | null;
    icon: string | null;
    description: LocalizedText | null;
    project_id: string;
    created_at: string;
    edited_at: string | null;
}

export interface Contribution {
    contribution_id: string;
    area: LocalizedText | null;
    percentage: string | null;
    description: LocalizedText | null;
    project_id: string;
    created_at: string;
    edited_at: string | null;
}

export interface Trouble {
    trouble_id: string;
    project_id: string;
    trouble_cont: LocalizedText | null;
    solution_cont: LocalizedText | null;
    impact: LocalizedText | null;
    created_at: string;
    edited_at: string | null;
}

export interface LocalizedText {
    ko: string;
    en: string;
}

export interface LocalizedArray {
    ko: string[];
    en: string[];
}

export interface Project {
    project_id: string;
    title: LocalizedText;
    subtitle: LocalizedText;
    category: LocalizedText | null;
    client: LocalizedText | null;
    role: LocalizedText | null;
    start_date: string | null;
    end_date: string | null;
    status: LocalizedText | null;
    description: LocalizedText | null;
    challenge: LocalizedText | null;
    solution: LocalizedText | null;
    image: string | null;
    tag: LocalizedArray | null;
    gallery_url: string[] | null;
    result: LocalizedArray | null;
    created_at: string;
    edited_at: string | null;
    links?: ProjectLink[];
    technologies?: Technology[];
    contributions?: Contribution[];
    troubles?: Trouble[];
}