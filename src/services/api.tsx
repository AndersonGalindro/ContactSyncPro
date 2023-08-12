import { createClient } from "@supabase/supabase-js";
import { Columns, DatabaseType } from "./types";

export const supabase = createClient<DatabaseType>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const getContacts = async (): Promise<any> => {
  let { data: ContactSyncPro_database, error } = await supabase
    .from("ContactSyncPro_database")
    .select("*");

  return { ContactSyncPro_database, error };
};
export const insertContacts = async (value: any): Promise<any> => {
  const { data, error } = await supabase
    .from("ContactSyncPro_database")
    .insert([value])
    .select("*");

  return { data, error };
};
export const updateContacts = async (
  id: number,
  column: Columns,
  value: unknown
): Promise<any> => {
  const { data: ContactSyncPro_database, error } = await supabase
    .from("ContactSyncPro_database")
    .update({ [column]: value })
    .eq("id", id)
    .select("*");

  return { ContactSyncPro_database, error };
};
export const deleteContacts = async (id: number): Promise<any> => {
  const { error } = await supabase
    .from("ContactSyncPro_database")
    .delete()
    .eq("id", id);

  return { error };
};

export default supabase;
