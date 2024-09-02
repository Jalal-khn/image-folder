"use client";
import React, { useState } from "react";
import { updateImageData } from "@/actions/script";

export default function UpdateImage({ data }) {
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(data.url);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "jalal056");
        formData.append("cloud_name", "ddwotttxt");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/ddwotttxt/image/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            setUploadedImageUrl(result.secure_url);

            
            const res = await updateImageData({ id: data.id, url: result.secure_url });
            setMessage(res.error || res.success);

        } catch (err) {
            console.error("Upload or API call failed:", err);
            setMessage("An error occurred during the upload.");
        }
    };

    return (
        <main>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="bg-red-600 text-white font-bold rounded-md p-2"
            type="button" onClick={handleSubmit}>
                Update
            </button>
            <p>{message}</p>

            {uploadedImageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={uploadedImageUrl} alt="Uploaded Image" width={500} height={500} />
                </div>
            )}
        </main>
    );
}
