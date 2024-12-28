export async function urlToFile(url, fetch) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = extractFilenameFromUrl(url);
    const type = getMimeType(filename);
    const file = new File([blob], filename, { type });
    return file;
  } catch (error) {
    console.warn("Error converting URL to File:", error);
    return null;
  }
}

function extractFilenameFromUrl(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  const parts = path.split("/");
  return parts[parts.length - 1];
}

function getMimeType(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "";
  }
}
