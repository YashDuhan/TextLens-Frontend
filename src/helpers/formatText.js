export const formatText = (text) => {
  // Trim leading/trailing spaces and split by newline, removing empty lines
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== ""); // Remove empty lines

  // Process each line for bold and bullet points
  const formattedLines = lines.map((line) => {
    // Bold text by replacing the **text** with <b></b> tags
    line = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Format bullet points (support both * and 1. as bullet points)
    if (line.match(/^(\*|\d+\.)\s/)) {
      line = `<li>${line.substring(line.indexOf(" ") + 1)}</li>`; // Remove the bullet and add it to a <li> tag
    }

    return line;
  });

  // Wrap all list items in <ul> if any exist
  let formattedText = formattedLines.join("<br />");

  // If there are any list items, wrap them in <ul>
  if (formattedText.includes("<li>")) {
    formattedText = `<ul>${formattedText}</ul>`;
  }

  return formattedText;
};
