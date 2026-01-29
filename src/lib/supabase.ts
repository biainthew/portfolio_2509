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
    description: string | null;
    project_id: string;
    created_at: string;
    edited_at: string | null;
}

export interface Contribution {
    contribution_id: string;
    area: string | null;
    percentage: string | null;
    description: string | null;
    project_id: string;
    created_at: string;
    edited_at: string | null;
}

export interface Trouble {
    trouble_id: string;
    project_id: string;
    title: string | null;
    trouble_cont: string | null;
    solution_cont: string | null;
    created_at: string;
    edited_at: string | null;
}

export interface Project {
    project_id: string;
    lang: string;
    title: string;
    subtitle: string;
    category: string | null;
    client: string | null;
    role: string | null;
    start_date: string | null;
    end_date: string | null;
    status: string | null;
    description: string | null;
    challenge: string | null;
    solution: string | null;
    image: string | null;
    tag: string[] | null;
    gallery_url: string[] | null;
    result: string[] | null;
    created_at: string;
    edited_at: string | null;
    links?: ProjectLink[];
    technologies?: Technology[];
    contributions?: Contribution[];
    troubles?: Trouble[];
}