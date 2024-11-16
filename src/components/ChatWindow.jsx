import { useState } from "react";
import { Clipboard } from "lucide-react";
import { formatText } from "../helpers/formatText";
import userIcon from "../assets/images/user_icon.svg";
import systemIcon from "../assets/images/system_icon.svg";
import PropTypes from "prop-types";

const ChatWindow = ({ messages, isTyping }) => {
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null); // Track copied message index

  const handleCopy = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedMessageIndex(index); // Show feedback
        setTimeout(() => setCopiedMessageIndex(null), 2000); // Remove feedback after 2 sec
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    // Main window
    <div className="flex-1 overflow-y-auto p-4">
      {/* Space between each individual text */}
      <div className="space-y-4">
        {/* Mapping through old messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end md:mr-20"
                : "justify-start md:ml-20"
            }`} // Align messages based on sender
          >
            {/* Icon for sender */}
            <div className="flex items-center mr-2">
              {msg.sender === "user" ? (
                <img src={userIcon} alt="User Icon" className="w-8 h-8" />
              ) : (
                <img src={systemIcon} alt="System Icon" className="w-8 h-8" />
              )}
            </div>

            <div
              className={`p-3 max-w-xl rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {/* Render the formatted message text using the helper function */}
              <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
            </div>

            {/* Copy button */}
            <button
              onClick={() => handleCopy(msg.text, index)} // Pass message and index
              className="ml-2 p-1 text-gray-500 hover:text-blue-500 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard size={20} />
            </button>

            {/* Feedback for copying */}
            {copiedMessageIndex === index && (
              <span className="text-green-500 text-sm ml-2">Copied!</span>
            )}
          </div>
        ))}

        {/* Display if system is typing */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3 md:ml-20 max-w-lg rounded-lg bg-gray-300 text-black italic">
              Thinking..
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// prop types
ChatWindow.propTypes = {
  // messages is an array
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired, // The sender should be a string
      text: PropTypes.string.isRequired, // The text should be a string
    })
  ).isRequired,
  isTyping: PropTypes.bool.isRequired,
};

export default ChatWindow;
