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
      case_studies: {
        Row: {
          category: string
          cover_image: string
          created_at: string
          description: string | null
          height: string | null
          id: string
          slug: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          cover_image: string
          created_at?: string
          description?: string | null
          height?: string | null
          id?: string
          slug: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          cover_image?: string
          created_at?: string
          description?: string | null
          height?: string | null
          id?: string
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_study_alignment_sections: {
        Row: {
          alignment: string
          case_study_id: string
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          published: boolean
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          alignment?: string
          case_study_id: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          alignment?: string
          case_study_id?: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_alignment_sections_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_carousel_items: {
        Row: {
          carousel_section_id: string
          content: string | null
          id: string
          image_url: string | null
          sort_order: number
          title: string | null
        }
        Insert: {
          carousel_section_id: string
          content?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title?: string | null
        }
        Update: {
          carousel_section_id?: string
          content?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_carousel_items_carousel_section_id_fkey"
            columns: ["carousel_section_id"]
            isOneToOne: false
            referencedRelation: "case_study_carousel_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_carousel_sections: {
        Row: {
          case_study_id: string
          created_at: string
          id: string
          published: boolean
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          case_study_id: string
          created_at?: string
          id?: string
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          case_study_id?: string
          created_at?: string
          id?: string
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_carousel_sections_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_content: {
        Row: {
          approach: string
          case_study_id: string
          challenge: string
          conclusion: string
          id: string
          intro: string
          results: string
          solution: string
        }
        Insert: {
          approach: string
          case_study_id: string
          challenge: string
          conclusion: string
          id?: string
          intro: string
          results: string
          solution: string
        }
        Update: {
          approach?: string
          case_study_id?: string
          challenge?: string
          conclusion?: string
          id?: string
          intro?: string
          results?: string
          solution?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_content_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_four_paragraph_sections: {
        Row: {
          case_study_id: string
          created_at: string
          id: string
          image_url: string | null
          published: boolean
          sort_order: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          case_study_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          case_study_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_four_paragraph_sections_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_introduction_sections: {
        Row: {
          case_study_id: string
          content: string | null
          created_at: string
          id: string
          published: boolean
          sort_order: number
          subhead_two: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          case_study_id: string
          content?: string | null
          created_at?: string
          id?: string
          published?: boolean
          sort_order?: number
          subhead_two?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          case_study_id?: string
          content?: string | null
          created_at?: string
          id?: string
          published?: boolean
          sort_order?: number
          subhead_two?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_study_introduction_sections_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_paragraph_items: {
        Row: {
          content: string | null
          id: string
          paragraph_section_id: string
          sort_order: number
          title: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          paragraph_section_id: string
          sort_order?: number
          title?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          paragraph_section_id?: string
          sort_order?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_paragraph_items_paragraph_section_id_fkey"
            columns: ["paragraph_section_id"]
            isOneToOne: false
            referencedRelation: "case_study_four_paragraph_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      case_study_sections: {
        Row: {
          case_study_id: string
          component: string
          content: string | null
          id: string
          image_url: string | null
          metadata: Json | null
          published: boolean | null
          sort_order: number
          title: string | null
        }
        Insert: {
          case_study_id: string
          component: string
          content?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          published?: boolean | null
          sort_order?: number
          title?: string | null
        }
        Update: {
          case_study_id?: string
          component?: string
          content?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          published?: boolean | null
          sort_order?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_study_sections_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      case_study_sections_view: {
        Row: {
          case_study_id: string | null
          component: string | null
          content: string | null
          id: string | null
          image_url: string | null
          metadata: Json | null
          published: boolean | null
          sort_order: number | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
