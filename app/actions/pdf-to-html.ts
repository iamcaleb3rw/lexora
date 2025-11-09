import fs from "fs";
import path from "path";
import axios from "axios";
import * as pdf2html from "pdf2html";

export async function convertPDF(documentUrl: string) {
  try {
    console.log("RECEIVED_URL:", documentUrl);

    // Step 1: Download the PDF file
    const response = await axios.get(documentUrl, {
      responseType: "arraybuffer",
    });

    // Use a cross-platform temporary file location (not /tmp on Windows)
    const tempPath = path.join(process.cwd(), "temp.pdf");
    fs.writeFileSync(tempPath, response.data);
    console.log("PDF saved to:", tempPath);

    // Step 2: Resolve the vendor and Tika JAR paths correctly
    const vendorPath = path.join(
      process.cwd(),
      "node_modules",
      "pdf2html",
      "vendor"
    );
    const tikaPath = path.join(vendorPath, "tika-app-3.2.0.jar");

    // Validate paths
    if (!fs.existsSync(vendorPath)) {
      throw new Error(`Vendor directory not found at ${vendorPath}`);
    }
    if (!fs.existsSync(tikaPath)) {
      throw new Error(`Tika JAR not found at ${tikaPath}`);
    }

    // Step 3: Set TIKA_PATH with an absolute, normalized Windows path
    process.env.TIKA_PATH = path.resolve(tikaPath);
    console.log("TIKA_PATH set to:", process.env.TIKA_PATH);

    // Step 4: Convert PDF to HTML
    const htmlContent: string = await pdf2html.html(tempPath);
    console.log("HTML content generated successfully.");

    // Step 5: Clean up (optional)
    fs.unlinkSync(tempPath);

    return htmlContent;
  } catch (error) {
    if (error instanceof pdf2html.PDFProcessingError) {
      console.error("PDF processing failed:", error.message);
      console.error("Exit code:", error.exitCode);
    } else {
      console.error("Other error:", error);
    }
    throw error;
  }
}
