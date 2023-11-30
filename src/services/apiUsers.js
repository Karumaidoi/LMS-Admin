import { supabase } from "./supabase";

export async function logIn({ email, password }) {
  // 1. Get all users
  const users = await getAllUsers();

  //2. Check if the user is in the DB
  const currentUser = users.find((user) => user?.email === email);
  console.log(currentUser);

  //3. Check if the User is an Admin
  const isAdmin = currentUser?.isAdmin;

  if (!isAdmin || isAdmin === undefined) {
    throw new Error("User access denied.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function registerUser({ email, password, phone, userName, description }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  try {
    await insertUser(email, phone, userName, description);
  } catch (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function insertUser(email, phone, userName, description) {
  const { data, error } = await supabase.from("Users").insert({
    email,
    userName,
    phone,
    status: "active",
    isAdmin: true,
    description,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase.from("Users").select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function deleteUser(id) {
  const { error } = await supabase.from("Users").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
