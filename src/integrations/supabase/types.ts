export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      active_subscriptions: {
        Row: {
          box_subscription: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string | null
          status: string
          stripe_subscription_id: string | null
          total_price: number
          updated_at: string | null
          user_count: number
          user_id: string | null
        }
        Insert: {
          box_subscription?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_subscription_id?: string | null
          total_price: number
          updated_at?: string | null
          user_count?: number
          user_id?: string | null
        }
        Update: {
          box_subscription?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_subscription_id?: string | null
          total_price?: number
          updated_at?: string | null
          user_count?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "active_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_activity_log: {
        Row: {
          action: string
          admin_user_id: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_content: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          page: string | null
          section: string | null
          type: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          page?: string | null
          section?: string | null
          type: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          page?: string | null
          section?: string | null
          type?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      bubble_rewards: {
        Row: {
          bubble_type: Database["public"]["Enums"]["bubble_type"]
          created_at: string
          giver_id: string | null
          id: string
          message: string | null
          post_id: string | null
          receiver_id: string | null
        }
        Insert: {
          bubble_type: Database["public"]["Enums"]["bubble_type"]
          created_at?: string
          giver_id?: string | null
          id?: string
          message?: string | null
          post_id?: string | null
          receiver_id?: string | null
        }
        Update: {
          bubble_type?: Database["public"]["Enums"]["bubble_type"]
          created_at?: string
          giver_id?: string | null
          id?: string
          message?: string | null
          post_id?: string | null
          receiver_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bubble_rewards_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "shared_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          box_id: string
          box_type: string
          created_at: string
          id: string
          price: number
          quantity: number
          user_id: string | null
        }
        Insert: {
          box_id: string
          box_type: string
          created_at?: string
          id?: string
          price: number
          quantity?: number
          user_id?: string | null
        }
        Update: {
          box_id?: string
          box_type?: string
          created_at?: string
          id?: string
          price?: number
          quantity?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          status: string
          updated_at: string
          visitor_email: string | null
          visitor_id: string
          visitor_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          visitor_email?: string | null
          visitor_id: string
          visitor_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          visitor_email?: string | null
          visitor_id?: string
          visitor_name?: string | null
        }
        Relationships: []
      }
      daily_bubbles: {
        Row: {
          bubble_type: Database["public"]["Enums"]["bubble_type"]
          created_at: string
          date: string
          id: string
          intensity: number | null
          message: string
          ritual_suggestion: string | null
          user_id: string
        }
        Insert: {
          bubble_type: Database["public"]["Enums"]["bubble_type"]
          created_at?: string
          date?: string
          id?: string
          intensity?: number | null
          message: string
          ritual_suggestion?: string | null
          user_id: string
        }
        Update: {
          bubble_type?: Database["public"]["Enums"]["bubble_type"]
          created_at?: string
          date?: string
          id?: string
          intensity?: number | null
          message?: string
          ritual_suggestion?: string | null
          user_id?: string
        }
        Relationships: []
      }
      editable_content: {
        Row: {
          content_key: string
          content_type: string
          content_value: Json
          created_at: string | null
          default_value: Json
          description: string | null
          id: string
          page_name: string
          section_name: string
          updated_at: string | null
        }
        Insert: {
          content_key: string
          content_type?: string
          content_value?: Json
          created_at?: string | null
          default_value?: Json
          description?: string | null
          id?: string
          page_name: string
          section_name: string
          updated_at?: string | null
        }
        Update: {
          content_key?: string
          content_type?: string
          content_value?: Json
          created_at?: string | null
          default_value?: Json
          description?: string | null
          id?: string
          page_name?: string
          section_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_events: {
        Row: {
          confidential: boolean | null
          created_at: string | null
          description: string | null
          event_date: string
          event_type: string
          id: string
          impact_level: number | null
          support_needed: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confidential?: boolean | null
          created_at?: string | null
          description?: string | null
          event_date: string
          event_type: string
          id?: string
          impact_level?: number | null
          support_needed?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confidential?: boolean | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          impact_level?: number | null
          support_needed?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      employee_specificities: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          severity_level: number | null
          specificity_type: string
          start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          severity_level?: number | null
          specificity_type: string
          start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          severity_level?: number | null
          specificity_type?: string
          start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      enterprise_members: {
        Row: {
          created_at: string
          enterprise_id: string
          id: string
          is_approved: boolean
          role: Database["public"]["Enums"]["enterprise_role_enum"]
          user_id: string
        }
        Insert: {
          created_at?: string
          enterprise_id: string
          id?: string
          is_approved?: boolean
          role: Database["public"]["Enums"]["enterprise_role_enum"]
          user_id: string
        }
        Update: {
          created_at?: string
          enterprise_id?: string
          id?: string
          is_approved?: boolean
          role?: Database["public"]["Enums"]["enterprise_role_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_members_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_questionnaires: {
        Row: {
          autonomie: number | null
          comments: Json | null
          communication: number | null
          created_at: string | null
          equilibre: number | null
          global_feedback: string | null
          id: string
          recommandations: Json | null
          reconnaissance: number | null
          relations: number | null
          risque: string | null
          score: number | null
          sens: number | null
          stress_level: number | null
          updated_at: string | null
          user_id: string | null
          workload: number | null
        }
        Insert: {
          autonomie?: number | null
          comments?: Json | null
          communication?: number | null
          created_at?: string | null
          equilibre?: number | null
          global_feedback?: string | null
          id?: string
          recommandations?: Json | null
          reconnaissance?: number | null
          relations?: number | null
          risque?: string | null
          score?: number | null
          sens?: number | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
          workload?: number | null
        }
        Update: {
          autonomie?: number | null
          comments?: Json | null
          communication?: number | null
          created_at?: string | null
          equilibre?: number | null
          global_feedback?: string | null
          id?: string
          recommandations?: Json | null
          reconnaissance?: number | null
          relations?: number | null
          risque?: string | null
          score?: number | null
          sens?: number | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
          workload?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_questionnaires_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprises: {
        Row: {
          created_at: string
          created_by: string
          enterprise_code: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          enterprise_code: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          enterprise_code?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      event_questionnaires: {
        Row: {
          created_at: string | null
          event_id: string | null
          follow_up_required: boolean | null
          id: string
          questionnaire_type: string
          responses: Json
          support_needs: Json | null
          user_id: string
          wellbeing_score: number | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          follow_up_required?: boolean | null
          id?: string
          questionnaire_type: string
          responses?: Json
          support_needs?: Json | null
          user_id: string
          wellbeing_score?: number | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          follow_up_required?: boolean | null
          id?: string
          questionnaire_type?: string
          responses?: Json
          support_needs?: Json | null
          user_id?: string
          wellbeing_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_questionnaires_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "employee_events"
            referencedColumns: ["id"]
          },
        ]
      }
      families: {
        Row: {
          created_at: string
          created_by: string
          family_code: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          family_code: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          family_code?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          created_at: string
          family_id: string
          id: string
          is_approved: boolean
          role: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          is_approved?: boolean
          role: Database["public"]["Enums"]["family_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          is_approved?: boolean
          role?: Database["public"]["Enums"]["family_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_access: {
        Row: {
          created_at: string | null
          current_usage: number | null
          feature_name: string
          id: string
          is_enabled: boolean | null
          subscription_id: string | null
          usage_limit: number | null
        }
        Insert: {
          created_at?: string | null
          current_usage?: number | null
          feature_name: string
          id?: string
          is_enabled?: boolean | null
          subscription_id?: string | null
          usage_limit?: number | null
        }
        Update: {
          created_at?: string | null
          current_usage?: number | null
          feature_name?: string
          id?: string
          is_enabled?: boolean | null
          subscription_id?: string | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_access_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "active_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invitations: {
        Row: {
          created_at: string
          expires_at: string
          group_id: string | null
          id: string
          invitee_email: string
          invitee_id: string | null
          inviter_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          group_id?: string | null
          id?: string
          invitee_email: string
          invitee_id?: string | null
          inviter_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          group_id?: string | null
          id?: string
          invitee_email?: string
          invitee_id?: string | null
          inviter_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_invitations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "social_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      market_research_submissions: {
        Row: {
          budget_range: string | null
          company_name: string | null
          company_size: string | null
          consent_data: boolean | null
          consent_marketing: boolean | null
          created_at: string
          current_solutions: string | null
          email: string
          full_name: string | null
          id: string
          interest_level: number | null
          phone: string | null
          role: string | null
          source: string | null
          specific_needs: string | null
          target_audience: string[] | null
          timeline: string | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          company_name?: string | null
          company_size?: string | null
          consent_data?: boolean | null
          consent_marketing?: boolean | null
          created_at?: string
          current_solutions?: string | null
          email: string
          full_name?: string | null
          id?: string
          interest_level?: number | null
          phone?: string | null
          role?: string | null
          source?: string | null
          specific_needs?: string | null
          target_audience?: string[] | null
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          company_name?: string | null
          company_size?: string | null
          consent_data?: boolean | null
          consent_marketing?: boolean | null
          created_at?: string
          current_solutions?: string | null
          email?: string
          full_name?: string | null
          id?: string
          interest_level?: number | null
          phone?: string | null
          role?: string | null
          source?: string | null
          specific_needs?: string | null
          target_audience?: string[] | null
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          admin_user_id: string | null
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          is_from_visitor: boolean
        }
        Insert: {
          admin_user_id?: string | null
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_from_visitor?: boolean
        }
        Update: {
          admin_user_id?: string | null
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_from_visitor?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          event: string
          id: string
          timestamp: string | null
          user_id: string | null
          value: string | null
        }
        Insert: {
          event: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
          value?: string | null
        }
        Update: {
          event?: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
          value?: string | null
        }
        Relationships: []
      }
      monthly_boxes: {
        Row: {
          box_theme: string
          created_at: string | null
          customization_notes: string | null
          id: string
          products: Json
          rating: number | null
          received_at: string | null
          shipped_at: string | null
          teen_id: string | null
        }
        Insert: {
          box_theme: string
          created_at?: string | null
          customization_notes?: string | null
          id?: string
          products?: Json
          rating?: number | null
          received_at?: string | null
          shipped_at?: string | null
          teen_id?: string | null
        }
        Update: {
          box_theme?: string
          created_at?: string | null
          customization_notes?: string | null
          id?: string
          products?: Json
          rating?: number | null
          received_at?: string | null
          shipped_at?: string | null
          teen_id?: string | null
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          comment: string | null
          created_at: string
          date: string
          energy_level: number | null
          id: string
          motivation: number | null
          social_connection: number | null
          stress_level: number | null
          user_id: string
          work_satisfaction: number | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          date?: string
          energy_level?: number | null
          id?: string
          motivation?: number | null
          social_connection?: number | null
          stress_level?: number | null
          user_id: string
          work_satisfaction?: number | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          date?: string
          energy_level?: number | null
          id?: string
          motivation?: number | null
          social_connection?: number | null
          stress_level?: number | null
          user_id?: string
          work_satisfaction?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          currency: string
          id: string
          items: Json
          shipping_address: Json | null
          status: string
          stripe_payment_intent_id: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          currency?: string
          id?: string
          items?: Json
          shipping_address?: Json | null
          status?: string
          stripe_payment_intent_id?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          currency?: string
          id?: string
          items?: Json
          shipping_address?: Json | null
          status?: string
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_checkins: {
        Row: {
          communication_quality: number | null
          concern_level: number | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          parent_id: string | null
          support_feeling: number | null
          teen_id: string | null
        }
        Insert: {
          communication_quality?: number | null
          concern_level?: number | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          parent_id?: string | null
          support_feeling?: number | null
          teen_id?: string | null
        }
        Update: {
          communication_quality?: number | null
          concern_level?: number | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          parent_id?: string | null
          support_feeling?: number | null
          teen_id?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string | null
          sort_order: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id?: string | null
          sort_order?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allow_backorder: boolean | null
          artisan_info: string | null
          barcode: string | null
          category_id: string | null
          compare_at_price: number | null
          cost_price: number | null
          created_at: string
          description: string | null
          id: string
          inventory_quantity: number | null
          is_active: boolean | null
          is_digital: boolean | null
          is_featured: boolean | null
          name: string
          origin: string | null
          price: number
          requires_shipping: boolean | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          sku: string | null
          slug: string
          track_inventory: boolean | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          allow_backorder?: boolean | null
          artisan_info?: string | null
          barcode?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean | null
          is_digital?: boolean | null
          is_featured?: boolean | null
          name: string
          origin?: string | null
          price: number
          requires_shipping?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug: string
          track_inventory?: boolean | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          allow_backorder?: boolean | null
          artisan_info?: string | null
          barcode?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          cost_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean | null
          is_digital?: boolean | null
          is_featured?: boolean | null
          name?: string
          origin?: string | null
          price?: number
          requires_shipping?: boolean | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          track_inventory?: boolean | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string | null
          alert_threshold: number | null
          assigned_teen_id: string | null
          created_at: string | null
          department_or_school: string | null
          email: string
          enterprise_id: string | null
          enterprise_role:
            | Database["public"]["Enums"]["enterprise_role_enum"]
            | null
          family_id: string | null
          fonction: string | null
          full_name: string | null
          hr_access: boolean | null
          id: string
          last_mood_entry: string | null
          notifications_enabled: boolean | null
          onboarding_completed: boolean | null
          privacy_anonymized: boolean | null
          role: string
          teen_access: boolean | null
          type_poste: string | null
          updated_at: string | null
          user_journey: Database["public"]["Enums"]["user_journey"] | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          account_type?: string | null
          alert_threshold?: number | null
          assigned_teen_id?: string | null
          created_at?: string | null
          department_or_school?: string | null
          email: string
          enterprise_id?: string | null
          enterprise_role?:
            | Database["public"]["Enums"]["enterprise_role_enum"]
            | null
          family_id?: string | null
          fonction?: string | null
          full_name?: string | null
          hr_access?: boolean | null
          id: string
          last_mood_entry?: string | null
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          privacy_anonymized?: boolean | null
          role: string
          teen_access?: boolean | null
          type_poste?: string | null
          updated_at?: string | null
          user_journey?: Database["public"]["Enums"]["user_journey"] | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          account_type?: string | null
          alert_threshold?: number | null
          assigned_teen_id?: string | null
          created_at?: string | null
          department_or_school?: string | null
          email?: string
          enterprise_id?: string | null
          enterprise_role?:
            | Database["public"]["Enums"]["enterprise_role_enum"]
            | null
          family_id?: string | null
          fonction?: string | null
          full_name?: string | null
          hr_access?: boolean | null
          id?: string
          last_mood_entry?: string | null
          notifications_enabled?: boolean | null
          onboarding_completed?: boolean | null
          privacy_anonymized?: boolean | null
          role?: string
          teen_access?: boolean | null
          type_poste?: string | null
          updated_at?: string | null
          user_journey?: Database["public"]["Enums"]["user_journey"] | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_assigned_teen_id_fkey"
            columns: ["assigned_teen_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "families"
            referencedColumns: ["id"]
          },
        ]
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      shared_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          group_id: string | null
          id: string
          media_urls: Json | null
          post_type: string
          privacy_level: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          group_id?: string | null
          id?: string
          media_urls?: Json | null
          post_type: string
          privacy_level?: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          group_id?: string | null
          id?: string
          media_urls?: Json | null
          post_type?: string
          privacy_level?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "social_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      simulator_responses: {
        Row: {
          answers: Json
          burnout_risk: string
          burnout_risk_percentage: number
          context: string
          created_at: string | null
          happiness_score: number | null
          id: string
          qvt_score: number
          user_id: string | null
        }
        Insert: {
          answers: Json
          burnout_risk: string
          burnout_risk_percentage: number
          context: string
          created_at?: string | null
          happiness_score?: number | null
          id?: string
          qvt_score: number
          user_id?: string | null
        }
        Update: {
          answers?: Json
          burnout_risk?: string
          burnout_risk_percentage?: number
          context?: string
          created_at?: string | null
          happiness_score?: number | null
          id?: string
          qvt_score?: number
          user_id?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_key: string
          content_type: string
          content_value: Json
          created_at: string
          id: string
          is_published: boolean
          page: string
          section: string
          updated_at: string
        }
        Insert: {
          content_key: string
          content_type?: string
          content_value: Json
          created_at?: string
          id?: string
          is_published?: boolean
          page: string
          section: string
          updated_at?: string
        }
        Update: {
          content_key?: string
          content_type?: string
          content_value?: Json
          created_at?: string
          id?: string
          is_published?: boolean
          page?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_themes: {
        Row: {
          colors: Json
          created_at: string | null
          description: string | null
          fonts: Json
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          colors?: Json
          created_at?: string | null
          description?: string | null
          fonts?: Json
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          colors?: Json
          created_at?: string | null
          description?: string | null
          fonts?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      social_group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string
          role: string
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role?: string
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "social_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      social_groups: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          group_code: string
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          group_code: string
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          group_code?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      some_table: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          base_price: number
          box_included: boolean | null
          box_price: number | null
          created_at: string | null
          features: Json
          id: string
          max_users: number | null
          name: string
          price_per_user: number
          type: string
        }
        Insert: {
          base_price: number
          box_included?: boolean | null
          box_price?: number | null
          created_at?: string | null
          features?: Json
          id?: string
          max_users?: number | null
          name: string
          price_per_user?: number
          type: string
        }
        Update: {
          base_price?: number
          box_included?: boolean | null
          box_price?: number | null
          created_at?: string | null
          features?: Json
          id?: string
          max_users?: number | null
          name?: string
          price_per_user?: number
          type?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          price_per_month: number
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          price_per_month: number
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          price_per_month?: number
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_insights: {
        Row: {
          anonymous: boolean | null
          content: string
          created_at: string | null
          id: string
          priority: string
          team_id: string
          type: string
          user_id: string | null
        }
        Insert: {
          anonymous?: boolean | null
          content: string
          created_at?: string | null
          id?: string
          priority?: string
          team_id: string
          type: string
          user_id?: string | null
        }
        Update: {
          anonymous?: boolean | null
          content?: string
          created_at?: string | null
          id?: string
          priority?: string
          team_id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_managers: {
        Row: {
          assigned_at: string
          id: string
          manager_id: string | null
          team_id: string | null
        }
        Insert: {
          assigned_at?: string
          id?: string
          manager_id?: string | null
          team_id?: string | null
        }
        Update: {
          assigned_at?: string
          id?: string
          manager_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_managers_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          employee_id: string | null
          id: string
          joined_at: string
          team_id: string | null
        }
        Insert: {
          employee_id?: string | null
          id?: string
          joined_at?: string
          team_id?: string | null
        }
        Update: {
          employee_id?: string | null
          id?: string
          joined_at?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      teen_alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at: string | null
          id: string
          is_read: boolean | null
          location: string | null
          message: string | null
          parent_id: string | null
          teen_id: string | null
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          location?: string | null
          message?: string | null
          parent_id?: string | null
          teen_id?: string | null
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          location?: string | null
          message?: string | null
          parent_id?: string | null
          teen_id?: string | null
        }
        Relationships: []
      }
      teen_assessments: {
        Row: {
          comments: Json
          created_at: string
          date: string
          frequency: string
          id: string
          responses: Json
          user_id: string | null
        }
        Insert: {
          comments?: Json
          created_at?: string
          date?: string
          frequency?: string
          id?: string
          responses?: Json
          user_id?: string | null
        }
        Update: {
          comments?: Json
          created_at?: string
          date?: string
          frequency?: string
          id?: string
          responses?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      teen_checkins: {
        Row: {
          academic_pressure: number | null
          created_at: string | null
          date: string
          family_relationship: number | null
          id: string
          mood: Database["public"]["Enums"]["teen_mood"]
          personal_notes: string | null
          sleep_quality: number | null
          social_interaction: number | null
          stress_level: number | null
          teen_id: string | null
        }
        Insert: {
          academic_pressure?: number | null
          created_at?: string | null
          date?: string
          family_relationship?: number | null
          id?: string
          mood: Database["public"]["Enums"]["teen_mood"]
          personal_notes?: string | null
          sleep_quality?: number | null
          social_interaction?: number | null
          stress_level?: number | null
          teen_id?: string | null
        }
        Update: {
          academic_pressure?: number | null
          created_at?: string | null
          date?: string
          family_relationship?: number | null
          id?: string
          mood?: Database["public"]["Enums"]["teen_mood"]
          personal_notes?: string | null
          sleep_quality?: number | null
          social_interaction?: number | null
          stress_level?: number | null
          teen_id?: string | null
        }
        Relationships: []
      }
      teen_notifications: {
        Row: {
          created_at: string | null
          family_id: string | null
          id: number
          message: string
          type: string
          urgent: boolean | null
        }
        Insert: {
          created_at?: string | null
          family_id?: string | null
          id?: number
          message: string
          type: string
          urgent?: boolean | null
        }
        Update: {
          created_at?: string | null
          family_id?: string | null
          id?: number
          message?: string
          type?: string
          urgent?: boolean | null
        }
        Relationships: []
      }
      teen_recommendations: {
        Row: {
          assessment_date: string
          created_at: string
          id: string
          recommendations: Json
          user_id: string | null
        }
        Insert: {
          assessment_date: string
          created_at?: string
          id?: string
          recommendations?: Json
          user_id?: string | null
        }
        Update: {
          assessment_date?: string
          created_at?: string
          id?: string
          recommendations?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      teen_rewards: {
        Row: {
          description: string | null
          earned_at: string | null
          id: string
          points: number
          reward_type: string
          teen_id: string | null
        }
        Insert: {
          description?: string | null
          earned_at?: string | null
          id?: string
          points?: number
          reward_type: string
          teen_id?: string | null
        }
        Update: {
          description?: string | null
          earned_at?: string | null
          id?: string
          points?: number
          reward_type?: string
          teen_id?: string | null
        }
        Relationships: []
      }
      teens_profiles: {
        Row: {
          created_at: string | null
          email: string
          ethnicity: string | null
          feelsdiscriminated: string | null
          id: string
          ismixed: string | null
          language: string | null
          name: string
          origins: string | null
          religion: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          ethnicity?: string | null
          feelsdiscriminated?: string | null
          id?: string
          ismixed?: string | null
          language?: string | null
          name: string
          origins?: string | null
          religion?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          ethnicity?: string | null
          feelsdiscriminated?: string | null
          id?: string
          ismixed?: string | null
          language?: string | null
          name?: string
          origins?: string | null
          religion?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      teens_questionnaires: {
        Row: {
          anxiete: number | null
          comments: Json | null
          created_at: string | null
          ecrans: number | null
          energie: number | null
          estime: number | null
          global_feedback: string | null
          id: string
          motivation: number | null
          recommandations: Json | null
          relations: number | null
          risque: string | null
          score: number | null
          sommeil: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          anxiete?: number | null
          comments?: Json | null
          created_at?: string | null
          ecrans?: number | null
          energie?: number | null
          estime?: number | null
          global_feedback?: string | null
          id?: string
          motivation?: number | null
          recommandations?: Json | null
          relations?: number | null
          risque?: string | null
          score?: number | null
          sommeil?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          anxiete?: number | null
          comments?: Json | null
          created_at?: string | null
          ecrans?: number | null
          energie?: number | null
          estime?: number | null
          global_feedback?: string | null
          id?: string
          motivation?: number | null
          recommandations?: Json | null
          relations?: number | null
          risque?: string | null
          score?: number | null
          sommeil?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teens_questionnaires_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_bubble_points: {
        Row: {
          connexion_points: number
          id: string
          inspiration_points: number
          soin_points: number
          total_points: number
          transformation_points: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          connexion_points?: number
          id?: string
          inspiration_points?: number
          soin_points?: number
          total_points?: number
          transformation_points?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          connexion_points?: number
          id?: string
          inspiration_points?: number
          soin_points?: number
          total_points?: number
          transformation_points?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          addressee_id: string | null
          connection_type: string
          created_at: string | null
          id: string
          requester_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          addressee_id?: string | null
          connection_type: string
          created_at?: string | null
          id?: string
          requester_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          addressee_id?: string | null
          connection_type?: string
          created_at?: string | null
          id?: string
          requester_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_emotional_states: {
        Row: {
          created_at: string | null
          energy_level: number | null
          id: string
          is_visible_to_connections: boolean | null
          mood: string
          notes: string | null
          stress_level: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          energy_level?: number | null
          id?: string
          is_visible_to_connections?: boolean | null
          mood: string
          notes?: string | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          energy_level?: number | null
          id?: string
          is_visible_to_connections?: boolean | null
          mood?: string
          notes?: string | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          burnout_risk: string | null
          created_at: string | null
          feedback_type: string
          id: string
          qvt_score: number | null
          user_id: string | null
        }
        Insert: {
          burnout_risk?: string | null
          created_at?: string | null
          feedback_type: string
          id?: string
          qvt_score?: number | null
          user_id?: string | null
        }
        Update: {
          burnout_risk?: string | null
          created_at?: string | null
          feedback_type?: string
          id?: string
          qvt_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      virtual_gifts: {
        Row: {
          created_at: string | null
          gift_image_url: string | null
          gift_name: string
          id: string
          message: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          gift_image_url?: string | null
          gift_name: string
          id?: string
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          gift_image_url?: string | null
          gift_name?: string
          id?: string
          message?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manager_access_team: {
        Args: { manager_id: string; target_team_id: string }
        Returns: boolean
      }
      current_user_has_role: {
        Args: { check_role: string }
        Returns: boolean
      }
      get_user_connections: {
        Args: { connection_type?: string; user_id?: string }
        Returns: {
          connected_user_email: string
          connected_user_id: string
          connected_user_name: string
          connection_id: string
          connection_status: string
          emotional_state: Json
        }[]
      }
      get_user_enterprise_role: {
        Args: { target_user_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      has_feature_access: {
        Args: { feature_name: string; user_id?: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never> | { user_uuid: string }
        Returns: boolean
      }
      is_user_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_user_famille: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      is_user_hr: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      is_user_manager: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      is_user_responsable_qvt: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      is_user_rh: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      setup_qvt_database: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      user_confirm_password_reset: {
        Args: { email: string; password: string }
        Returns: undefined
      }
      validate_user_access: {
        Args: { target_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      account_type:
        | "abonne_salarie"
        | "administrateur_entreprise"
        | "particulier_travailleur"
      alert_type:
        | "party"
        | "drinking"
        | "danger"
        | "lost"
        | "happy"
        | "with_friends"
        | "need_help"
      bubble_type: "soin" | "inspiration" | "transformation" | "connexion"
      enterprise_role_enum: "employee" | "manager" | "hr" | "admin"
      family_role: "parent" | "teen" | "sibling"
      subscription_plan: "basic" | "premium" | "family"
      teen_mood:
        | "very_happy"
        | "happy"
        | "neutral"
        | "sad"
        | "very_sad"
        | "anxious"
        | "stressed"
      user_journey: "physique_only" | "saas_box"
      user_role:
        | "admin"
        | "user"
        | "salarié"
        | "responsable_qvt"
        | "rh"
        | "parent"
        | "ado"
        | "enfant"
        | "grand_parent"
        | "tuteur"
        | "autre_referent"
        | "coach"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: [
        "abonne_salarie",
        "administrateur_entreprise",
        "particulier_travailleur",
      ],
      alert_type: [
        "party",
        "drinking",
        "danger",
        "lost",
        "happy",
        "with_friends",
        "need_help",
      ],
      bubble_type: ["soin", "inspiration", "transformation", "connexion"],
      enterprise_role_enum: ["employee", "manager", "hr", "admin"],
      family_role: ["parent", "teen", "sibling"],
      subscription_plan: ["basic", "premium", "family"],
      teen_mood: [
        "very_happy",
        "happy",
        "neutral",
        "sad",
        "very_sad",
        "anxious",
        "stressed",
      ],
      user_journey: ["physique_only", "saas_box"],
      user_role: [
        "admin",
        "user",
        "salarié",
        "responsable_qvt",
        "rh",
        "parent",
        "ado",
        "enfant",
        "grand_parent",
        "tuteur",
        "autre_referent",
        "coach",
      ],
    },
  },
} as const
