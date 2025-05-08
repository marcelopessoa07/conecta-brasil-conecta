
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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_type: "client" | "professional"
          rating: number | null
          reviews_count: number | null
          verified: boolean | null
          completed_jobs: number | null
          address: string | null
          profession: string | null
          bio: string | null
          name: string
          email: string
          phone: string | null
          photo: string | null
          experience: string | null
          location: string | null
          service_areas: string[] | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          user_type?: "client" | "professional"
          rating?: number | null
          reviews_count?: number | null
          verified?: boolean | null
          completed_jobs?: number | null
          address?: string | null
          profession?: string | null
          bio?: string | null
          name: string
          email: string
          phone?: string | null
          photo?: string | null
          experience?: string | null
          location?: string | null
          service_areas?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_type?: "client" | "professional"
          rating?: number | null
          reviews_count?: number | null
          verified?: boolean | null
          completed_jobs?: number | null
          address?: string | null
          profession?: string | null
          bio?: string | null
          name?: string
          email?: string
          phone?: string | null
          photo?: string | null
          experience?: string | null
          location?: string | null
          service_areas?: string[] | null
        }
      }
      service_requests: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          category: string
          subcategory: string | null
          location: string
          postal_code: string | null
          preferred_date: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          category: string
          subcategory?: string | null
          location: string
          postal_code?: string | null
          preferred_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          category?: string
          subcategory?: string | null
          location?: string
          postal_code?: string | null
          preferred_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      provider_credits: {
        Row: {
          id: string
          provider_id: string
          credits: number
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          credits: number
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          credits?: number
          updated_at?: string
        }
      }
      credit_transactions: {
        Row: {
          id: string
          provider_id: string
          amount: number
          transaction_type: string
          payment_method: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          amount: number
          transaction_type: string
          payment_method?: string | null
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          amount?: number
          transaction_type?: string
          payment_method?: string | null
          status?: string
          created_at?: string
        }
      }
      contact_unlocks: {
        Row: {
          id: string
          provider_id: string
          request_id: string
          unlocked_at: string
          credits_used: number
        }
        Insert: {
          id?: string
          provider_id: string
          request_id: string
          unlocked_at?: string
          credits_used?: number
        }
        Update: {
          id?: string
          provider_id?: string
          request_id?: string
          unlocked_at?: string
          credits_used?: number
        }
      }
      request_images: {
        Row: {
          id: string
          request_id: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          request_id: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          request_id?: string
          image_url?: string
          created_at?: string
        }
      }
      provider_portfolio: {
        Row: {
          id: string
          provider_id: string
          title: string
          description: string | null
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          title: string
          description?: string | null
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          title?: string
          description?: string | null
          image_url?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: "client" | "professional" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
