export const getSystemResponse = async (
  extractedText,
  question,
  previousConvo
) => {
  try {
    // POST request to get answer to the question
    const response = await fetch("https://text-lens-backend.vercel.app/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        extracted_text: extractedText,
        question: question,
        previous_convo: previousConvo, // passed as a list of list of strings
      }),
    });

    // Throw error if failed
    if (!response.ok) {
      throw new Error("Failed");
    }

    // If fetched, parse the data
    const data = await response.json();

    // returning the data
    return data.answer;
  } catch (error) {
    // Logging the error
    console.error("Error fetching response:", error);
    return "Try again later";
  }
};
