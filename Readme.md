**README.md for the Image Compression API**

## **Overview**

This is an image compression API built using Node.js and Express.js. It allows users to upload images, compress them, and store the compressed images in a designated directory. The API supports JPEG, PNG, and GIF formats and can compress images by up to 80% while maintaining their quality.

## **How to run**

- `yarn dev` - runs the server by using nodemon to continously keep it running

## **Endpoints**

### **POST /api/v1/compress**

- **Description:** Upload an image and compress it.
- **Request Body:** The image file to be compressed.
- **Response:** A JSON object containing a message indicating the image processing status and the URL of the compressed image.

### **GET /api/v1/compressed**

- **Description:** Retrieve a list of compressed images.
- **Response:** A JSON array of objects containing the names and URLs of the compressed images.

### **GET /api/v1/compressed/:filename**

- **Description:** Download a compressed image by its filename.
- **Path Parameters:** `filename` - The filename of the compressed image to be downloaded.
- **Response:** The compressed image file.

## **How It Works**

1.  **Image Upload:** Users can upload images to the API using the `POST /api/v1/compress` endpoint. The uploaded image is stored temporarily in memory.
2.  **Compression:** The API uses the `sharp` library to compress the uploaded image. The compression level can be adjusted by modifying the `quality` parameter in the `png` method.
3.  **Storage:** The compressed image is then written to a designated directory (`outputDir`) on the server.
4.  **Retrieval:** Users can retrieve a list of compressed images using the `GET /api/v1/compressed` endpoint. They can also download a specific compressed image by its filename using the `GET /api/v1/compressed/:filename` endpoint.

## **Error Handling**

- **400 Bad Request:** Returned if no image is uploaded.
- **500 Internal Server Error:** Returned if there is an error processing the image or listing files.

## **Conclusion**

This image compression API provides a simple and efficient way to compress images while maintaining their quality. It supports JPEG, PNG, and GIF formats and can compress images by up to 80%. The API is built using Node.js and Express.js and includes robust error handling and security measures to ensure reliable operation.
