import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}) {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) throw new Error(error.message);
  
    return data;
}


//Function to fetch data of user from local storage who is currently logged in
export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  // const {data, error} = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return session.session?.user;
}

//Function to sign up new user
export async function signUp({name,email,password,profile_pic}){

  //upload profile pic
  const filename=`dp-${name.split(" ").join("-")}-${Math.random()}`;
  const {error:storageError}=await supabase.storage.from("profile_pic").upload(filename,profile_pic);

  if(storageError) throw new Error(storageError.message);

  //sign up
  const {data,error}=await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{
        name,
        profile_pic:`${supabaseUrl}/storage/v1/object/public/profile_pic/${filename}`
      }
    }
  });

  if(error) throw new Error(error.message);

  return data;
}

export async function logout(){
  const {error}=supabase.auth.signOut();

  if(error) throw new Error(error.message);
}