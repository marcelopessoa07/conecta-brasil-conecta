export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_unlocks: {
        Row: {
          credits_used: number
          id: string
          provider_id: string
          request_id: string
          unlocked_at: string
        }
        Insert: {
          credits_used?: number
          id?: string
          provider_id: string
          request_id: string
          unlocked_at?: string
        }
        Update: {
          credits_used?: number
          id?: string
          provider_id?: string
          request_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_unlocks_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_unlocks_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_method: string | null
          provider_id: string
          status: string
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_method?: string | null
          provider_id: string
          status: string
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_method?: string | null
          provider_id?: string
          status?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          completed_jobs: number | null
          created_at: string
          email: string
          experience: string | null
          id: string
          location: string | null
          name: string
          phone: string | null
          photo: string | null
          profession: string | null
          rating: number | null
          reviews_count: number | null
          service_areas: string[] | null
          specialties: string[] | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          completed_jobs?: number | null
          created_at?: string
          email: string
          experience?: string | null
          id: string
          location?: string | null
          name: string
          phone?: string | null
          photo?: string | null
          profession?: string | null
          rating?: number | null
          reviews_count?: number | null
          service_areas?: string[] | null
          specialties?: string[] | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          completed_jobs?: number | null
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          photo?: string | null
          profession?: string | null
          rating?: number | null
          reviews_count?: number | null
          service_areas?: string[] | null
          specialties?: string[] | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          verified?: boolean | null
        }
        Relationships: []
      }
      provider_credits: {
        Row: {
          credits: number
          id: string
          provider_id: string
          updated_at: string
        }
        Insert: {
          credits?: number
          id?: string
          provider_id: string
          updated_at?: string
        }
        Update: {
          credits?: number
          id?: string
          provider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_credits_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_portfolio: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          provider_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          provider_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          provider_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_portfolio_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      request_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          request_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          request_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_images_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          category: string
          category_id: string | null
          client_id: string
          created_at: string
          description: string
          id: string
          location: string
          postal_code: string | null
          preferred_date: string | null
          status: string
          subcategory: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          category_id?: string | null
          client_id: string
          created_at?: string
          description: string
          id?: string
          location: string
          postal_code?: string | null
          preferred_date?: string | null
          status?: string
          subcategory?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          category_id?: string | null
          client_id?: string
          created_at?: string
          description?: string
          id?: string
          location?: string
          postal_code?: string | null
          preferred_date?: string | null
          status?: string
          subcategory?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_type: ["client", "professional", "admin"],
    },
  },
} as const
