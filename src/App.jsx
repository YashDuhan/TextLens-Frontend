import { useState } from "react";
import NavBar from "./components/NavBar";
import ChatWindow from "./components/ChatWindow";
import ChatBox from "./components/ChatBox";
import { getSystemResponse } from "./helpers/getResponse";

function App() {
  // Message array to store previous chat
  const [messages, setMessages] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State to handle the typing indicator

  const handleSend = async (message) => {
    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages, //Spread function to append values
      { text: message, sender: "user" },
    ]);

    // Set typing indicator to true when waiting for system response
    setIsTyping(true);

    // Filter out the messages sent by the user to enhance the future results
    const userMessages = messages
      .filter((msg) => msg.sender === "user")
      .map((msg) => [msg.text]); // Wrapped each message in an array

    // Pushing the latest message
    userMessages.push([message]);

    // Get system's response
    const systemMessage = await getSystemResponse(
      extractedText, // the text
      message, // single instance of the message
      userMessages // previous questions
    );

    // Add the system's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: systemMessage, sender: "system" },
    ]);

    // Set typing indicator to false after receiving response
    setIsTyping(false);
  };

  // Function to clear chat messages
  const handleClearChat = () => {
    setMessages([]); // Clear messages state to reset the chat
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar
        setExtractedText={setExtractedText}
        onClearChat={handleClearChat}
      />
      <div className="flex-grow flex flex-col mt-16 p-2 pb-14">
        {/* Used isTyping until message loads */}
        <ChatWindow messages={messages} isTyping={isTyping} />{" "}
      </div>
      <ChatBox onSend={handleSend} />
    </div>
  );
}

export default App;
