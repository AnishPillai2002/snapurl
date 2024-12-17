import supabase from "./supabase";

//Function to fetch url
export async function getUrls(user_id) {
    let {data, error} = await supabase
      .from("urls")
      .select("*")
      .eq("user_id", user_id);
  
    if (error) {
      console.error(error);
      throw new Error("Unable to load URLs");
    }
  
    return data;
}

//function to delete a url
export async function deleteUrl(id) {
  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}