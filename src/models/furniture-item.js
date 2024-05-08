import { supabase } from "@/utils/supabase";
import { decode } from 'base64-arraybuffer'

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
    this.category = data.category;
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

    console.log(data);

    return new FurnitureItem(data);
  }

  static async uploadImages(images, id) {
    for (let index = 0; index < images.length; index++) {
      const base64String = images[index];
      console.log(`Uploading image ${index + 1}`);

      // Check and remove the data URL schema if present
      const base64Data = base64String.split(';base64,').pop();
      
      try {
        const decodedImage = decode(base64Data);

        const { data, error } = await supabase.storage
          .from('product_images')
          .upload(`${id}/${index + 1}.jpeg`, decodedImage, {
            contentType: 'image/jpeg',
            upsert: false
          });

        if (error) {
          console.error('Error uploading image:', error);
          return;  // Exit if there is an error
        }
        console.log('Image uploaded successfully:', data);
      } catch (error) {
        console.error('Error decoding image:', error);
      }
    }
  }

  

  static async createEntry(values) {
    // Transform input data to match the expected database schema
    const transformedValues = { // Assuming you need the current timestamp
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        meterials: {
            materials: values.materials.map(material => material.text)  // Extract the text as material names
        },
        category: values.category,
        image_count: values.images.length,
        stock: parseInt(values.stock),
        weight: parseFloat(values.weight),
        dimensions: {
            depth: parseInt(values.depth),
            width: parseInt(values.width),
            height: parseInt(values.height)
        },
        colors: {
            colors: values.colors.map(color => color.text)  // Extract the text as color names
        },
        variants: {
            variants: values.variants.map(variant => variant.text)  // Extract the text for variants
        }
    };

    // Database insert operation
    
    const { data, error } = await supabase
        .from('products')
        .insert([
            transformedValues
        ])
        .select();

    if (error) {
        console.error('Error:', error);
        return;  // Handle the error appropriately
    }
    this.uploadImages(values.images, data[0].id)
    console.log('Data inserted:', data);
}

  static async getUniqueRows(column) {
    const { data, error } = await supabase.from(column).select("*");

    if (error) throw error;

    if (!data) {
      return undefined;
    }

    return data;
  }

  static async fetchLimitedData(){
    const { data, error } = await supabase
        .from("products")
        .select("id, name, stock, price")
  
      if (error) throw error;
  
      if (!data) {
        return undefined;
      }
  
      console.log(data);
  
      return data;
  }

  static async deleteEntry(id){
    const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

  
      if (error) throw error;
  
      if (!data) {
        return undefined;
      }
  
      console.log(data);
  
      return data;
  }
}



export default FurnitureItem;
