import { supabase } from "./supabase";

export async function createReport(newReport) {
  const { error } = await supabase.from("Reports").insert(newReport);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getReports() {
  const { data, error } = await supabase
    .from("Reports")
    .select("*, Users(*)")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteReport(id) {
  const { error } = await supabase.from("Reports").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
