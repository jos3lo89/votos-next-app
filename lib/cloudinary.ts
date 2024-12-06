// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: "",
// });

// export const uploadStream = async (
//   buffer: Buffer,
//   folder: string
// ): Promise<UploadApiResponse> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder }, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result as UploadApiResponse);
//         }
//       })
//       .end(buffer);
//   });
// };
