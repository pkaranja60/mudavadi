import Image from "next/image";
import { useState, ChangeEvent } from "react";

interface DriverImageUploadProps {
  onImageUpload: (imageData: string | null) => void; // Define the type of onImageUpload
}

export default function DriverImageUpload({
  onImageUpload,
}: DriverImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log("File read completed, result:", reader.result);
        if (typeof reader.result === "string") {
          setImage(reader.result);
          onImageUpload(reader.result);
        } else {
          // Handle cases where reader.result is not a string
          setImage(null);
          onImageUpload(null);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setImage(null);
        onImageUpload(null);
      };

      reader.readAsDataURL(file);
    } else {
      // Handle case when no file is selected or the input is cleared
      setImage(null);
      onImageUpload(null); // Notify parent component that no image is uploaded
    }
  };

  return (
    <div className="w-[200px] space-y-7 flex flex-col justify-center items-center">
      {image ? (
        <Image src={image} alt="profile" width={500} height={500} />
      ) : (
        <Image src="/profileImage.png" alt="profile" width={500} height={500} />
      )}

      <label
        htmlFor="uploadFile1"
        className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto block font-[sans-serif]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 mr-2 fill-white inline"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload Image
        <input
          type="file"
          id="uploadFile1"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}
