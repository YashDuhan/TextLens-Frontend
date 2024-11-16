import { useState } from "react";
import { Send } from "lucide-react";
import PropTypes from "prop-types";

const ChatBox = ({ onSend }) => {
  // State to store the question
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    if (message.trim()) {
      // Checking if message isn't empty
      onSend(message); // passed message as prop
      setMessage(""); // Clear state after sending the text
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl p-4 z-10">
      {/* Form to submit the question */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-3xl mx-auto rounded-full bg-gray-200 shadow-lg p-2"
      >
        {/* Input field*/}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update the state
          placeholder="Ask Your Question..."
          className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Submit button */}
        <button
          type="submit"
          className="p-3 text-gray-400 hover:text-blue-500 transition-colors"
        >
          {/* Send icon */}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

// prop types
ChatBox.propTypes = {
  onSend: PropTypes.func.isRequired, // onSend should be a function
};

export default ChatBox;
