// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// cloudinary.config({
//   cloud_name: "ddqdwtsn6",
//   api_key: "821435497647676",
//   api_secret: "nIFPKyqlO3HTvlJMs1Lnb3Zar4M",
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
