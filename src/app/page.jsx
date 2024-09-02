"use client";
import Image from "next/image";
import React, { useState } from "react";
import { imageData } from "@/actions/script";
import { useRouter } from "next/navigation";

export default function Home() {
  const [image, setImage] = useState(null); 
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 
  const [message, setMessage] = useState("");
  
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!image) {
      setMessage("Please select an image file.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jalal056");
    data.append("cloud_name", "ddwotttxt");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ddwotttxt/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log(result);
      setUploadedImageUrl(result.secure_url); 

      
      const apiResponse = await imageData(result.secure_url);
      setMessage(apiResponse.error || apiResponse.success);

    } catch (err) {
      console.error("Upload or API call failed:", err);
      setMessage("An error occurred during the upload.");
    }

    
    router.push("/dashboard");
  };

  return (
    <main>
      <div className="flex flex-col gap-4 items-center justify-center mx-4 my-7 border-2 rounded-md p-8">
        <label className="font-bold text-xl" htmlFor="file">Choose a file</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} 
        />
        <button 
          className="bg-red-600 text-white font-bold rounded-md py-2 px-4 text-center inline hover:opacity-80"
          type="submit" 
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
      <p>{message}</p>
    </main>
  );
}
