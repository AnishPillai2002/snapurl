import supabase from "./supabase";
import {UAParser} from "ua-parser-js";

// Retrieves click data for a list of specified URL IDs from the "clicks" table in Supabase
export async function getClicksForUrls(urlIds) {
    const {data, error} = await supabase
      .from("clicks")
      .select("*")
      .in("url_id", urlIds);
  
    if (error) {
      console.error("Error fetching clicks:", error);
      return null;
    }
  
    return data;
}



const parser = new UAParser();
// Records click information for a given URL and redirects the user to the original URL.
export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    console.log("UA Parser: "+res);
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country,ip:ip_address} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
      ip_address:ip_address,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};


// Retrieves click data for a specified URL ID from the "clicks" table in Supabase
export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}