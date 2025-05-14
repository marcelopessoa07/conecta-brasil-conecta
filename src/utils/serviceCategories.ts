
import { supabase } from "@/integrations/supabase/client";

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchServiceCategories:", error);
    return [];
  }
};

export const updateProfileSpecialties = async (
  userId: string,
  specialtyIds: string[]
) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ specialties: specialtyIds })
      .eq("id", userId);

    if (error) {
      console.error("Error updating specialties:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in updateProfileSpecialties:", error);
    return { success: false, error };
  }
};

export const getUserSpecialties = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("specialties")
      .eq("id", userId)
      .single();

    if (error || !data) {
      console.error("Error fetching user specialties:", error);
      return [];
    }

    return data.specialties || [];
  } catch (error) {
    console.error("Error in getUserSpecialties:", error);
    return [];
  }
};
