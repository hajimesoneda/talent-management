export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string
          name: string
          email: string
          photo_url: string | null
          department: string
          skills: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          email: string
          photo_url?: string | null
          department: string
          skills?: Json
        }
        Update: {
          name?: string
          email?: string
          photo_url?: string | null
          department?: string
          skills?: Json
        }
      }
      available_skills: {
        Row: {
          id: string
          name: string
          category: string
          created_at: string
        }
        Insert: {
          name: string
          category: string
        }
        Update: {
          name?: string
          category?: string
        }
      }
    }
  }
}