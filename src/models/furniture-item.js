import { supabase } from "@/utils/supabase";

class FurnitureItem {
  constructor(data) {
    this.id = data.id;
    this.title = data.name;
    this.price = data.price;
    this.description = data.description;
    this.dimensions = data.dimensions;
    this.materials = data.meterials?.materials;
    this.image_count = data.image_count;
    this.colors = data.colors?.colors;
    this.variants = data.variants?.variants;
    this.images = [];
  }

  static generateImageLinks(count, id) {
    const images = () => {
      const baseLink =
        "https://dxtuajbvzailciohubaa.supabase.co/storage/v1/object/public/product_images/";
      const imageLinks = []; // Array to hold all the image links

      // Loop count times to generate image links
      for (let i = 1; i <= count; i++) {
        let imageLink = `${baseLink}${id}/${i}.jpeg`; // Construct each image link
        imageLinks.push(imageLink); // Add the constructed link to the array
      }

      return imageLinks;
    };

    return images(); // Return the generated array of image links
  }

  static async getItemById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return undefined;
    }

    return new FurnitureItem(data);
  }
}

export default FurnitureItem;
