import supabase,{supabaseUrl} from "./supabase";

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

//function to create a url
export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {

  //creating random string of length 4
  const short_url = Math.random().toString(36).substring(2, 6);

  //qr code file name
  const fileName = `qr-${short_url}`;

  //uploading the qr code to storage
  const {error: storageError} = await supabase.storage
    .from("qr")
    .upload(fileName, qrcode);

  // error while storing qr
  if (storageError) throw new Error(storageError.message);

  //qr link
  const qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;

  //inserting records into the urls table
  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select();

  // error while inserting into urls table
  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}


//Function to fetch the long url using id
export async function getLongUrl(id) {
  let {data, error} = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error Fetching short URL");
  }
  
  return data;
}