import { supabase, supabaseUrl } from "./supabase";

export async function createCourse(newCourse) {
  const courseName = `${Math.random()}-${newCourse.courseFile.name}`.replaceAll("/", "");
  const certName = `${Math.random()}-${newCourse.cert.name}`.replaceAll("/", "");

  const coursePath = `${supabaseUrl}/storage/v1/object/public/courseFiles/${courseName}`;
  const certPath = `${supabaseUrl}/storage/v1/object/public/certificates/${certName}`;

  let query = supabase.from("Courses");

  const { data, error } = await query.insert([
    { ...newCourse, courseFile: coursePath, cert: certPath },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  const { error: storageError } = await supabase.storage
    .from("courseFiles")
    .upload(courseName, newCourse.courseFile, {
      cacheControl: "3600",
      upsert: false,
    });

  const { error: storageErrorCert } = await supabase.storage
    .from("certificates")
    .upload(certName, newCourse.cert, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError || storageErrorCert) {
    console.log(storageError);
    throw Error("Course Files could not be created");
  }

  return data;
}

export async function updateCourse(newCourse) {
  const { id, ...newData } = newCourse;
  console.log(id, newData);
  const { data, error } = await supabase.from("Courses").update(newData).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCourses() {
  const { data, error } = await supabase
    .from("Courses")
    .select("*, User(*)")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCourse(id) {
  const { error } = await supabase.from("Courses").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function editCourse(newCourse, id) {
  const { error } = await supabase.from("Courses").update(newCourse).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
