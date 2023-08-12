export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Columns = "created_at" | "name" | "id" | "phone" | "surname";

export interface ColumnsInsert {
  created_at: string;
  id: number;
  name: string;
  phone: number;
  surname: string | null;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DatabaseType {
  created_at: string;
  id: number;
  name: string;
  phone: number;
  surname: string;
}

export interface Database {
  public: {
    Tables: {
      ContactSyncPro_database: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          phone: number;
          surname: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          phone: number;
          surname?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          phone?: number;
          surname?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
