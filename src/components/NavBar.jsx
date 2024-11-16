import { useState } from "react";
import logo from "../assets/images/logo.png";
import { uploadFile } from "../helpers/upload-helper";
import { Plus, File, XCircle } from "lucide-react";
import PropTypes from "prop-types";

// Using setExtractedText as props to update value in App.jsx
const NavBar = ({ setExtractedText, onClearChat }) => {
  // storing the s3 url of the uploaded file
  const [s3Url, setS3Url] = useState("");

  // Uploading the file
  const handleUploadClick = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";

    // Extracting Texts from the pdf
    input.onchange = async (e) => {
      const file = e.target.files[0]; // files[0] is the first file
      // Checking if pdf
      if (file && file.type === "application/pdf") {
        try {
          const result = await uploadFile(file); // send file to helper function
          // Populating the result fetched from the backend
          setExtractedText(result.extracted_text); // Directly passing the extractedText to App.jsx
          setS3Url(result.s3_url);
        } catch (error) {
          // Error handling
          console.error("File upload failed:", error);
        }
      }
    };

    // open the file dialog
    input.click();
  };

  return (
    <div>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl p-4 z-50">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center bg-white rounded-full shadow-lg p-2">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-12 w-28 object-contain" />
          </div>
          <div className="flex gap-3">
            {/* display the S3 link */}
            <div className="px-4 py-1 md:px-5 md:py-2 border rounded-full hover:bg-blue-500 flex items-center text-sm md:text-base max-w-xs truncate">
              {s3Url ? (
                <>
                  <File className="text-lg md:text-xl" />
                  <a
                    href={s3Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 truncate text-blue-600 hover:text-blue-800"
                  >
                    Permanent URL
                  </a>
                </>
              ) : (
                <span className="ml-1 truncate">No file selected</span>
              )}
            </div>
            {/* Button to upload file */}
            <button
              onClick={handleUploadClick}
              className="px-4 py-1 md:px-5 md:py-2 border rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm md:text-base"
            >
              {/* Plus icon inside a circle */}
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-lg md:text-xl">
                <Plus />
              </span>
              {/* Hide the Upload PDF text on small screens */}
              <span className="hidden md:block">Upload PDF</span>
            </button>
            {/* Clear button */}
            <button
              onClick={onClearChat} // Call the clear chat function
              className="px-4 py-1 md:px-5 md:py-2 border rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-sm md:text-base text-red-600"
            >
              <XCircle />
              <span className="hidden md:block">Clear Chat</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

// prop types
NavBar.propTypes = {
  setExtractedText: PropTypes.func.isRequired, // setExtractedText should be a function
  onClearChat: PropTypes.func.isRequired, // onClearChat should be a function
};

export default NavBar;
