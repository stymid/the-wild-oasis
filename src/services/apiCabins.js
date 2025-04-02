import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }
  return data;
}

export default async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.name.replace("/", "")}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1- create cabin
  let query = supabase.from("cabins");

  //  A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { error, data } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("cabin couldn't created");
  }

  // 2- upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3- delete the cabin if there was an error with upload image
  if (storageError) {
    const { error: deleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);
    if (deleteError) {
      console.error(deleteError.message);
      throw new Error(
        "there is an error with uploading the image. the cabin was not created. please check your network."
      );
    }
  }
  return data;
}

export async function deleteCabin(id) {
  // const { deleteError, deleteData } = await supabase.storage
  //   .from("cabin-images")
  //   .remove(["object-path-2", "folder/avatar2.png"]);
  // if (deleteError) {
  //   console.error(deleteError.message);
  //   throw new Error("the cabin couldn't delete");
  // }

  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
}
