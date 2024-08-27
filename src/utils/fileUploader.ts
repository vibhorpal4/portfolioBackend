import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export const uploadFile = (
  file: UploadedFile,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Define the relative path from the 'uploads' directory
    const relativePath = path.join("uploads", folder, file.name);

    // Define the full system path where the file will be saved
    const uploadPath = path.join(__dirname, "../../", relativePath);

    // Create the directory if it doesn't already exist
    const location = path.dirname(uploadPath);
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    // Use the mv() method to place the file on your server
    file.mv(uploadPath, (err: any) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      // Resolve with the relative path
      resolve(relativePath);
    });
  });
};
