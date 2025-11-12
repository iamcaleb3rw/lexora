"use server";

import PDFParser from "pdf2json";
import axios from "axios";

function safeDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export async function getResumeText(resumeUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("PDF parsing error:", errData.parserError);
      reject(new Error(`PDF parsing failed: ${errData.parserError}`));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        if (!pdfData.Pages || !Array.isArray(pdfData.Pages)) {
          return reject(new Error("No pages found in PDF"));
        }

        let extractedText = "";

        pdfData.Pages.forEach((page: any) => {
          let lastX = 0;

          page.Texts.forEach((textObj: any) => {
            textObj.R.forEach((run: any) => {
              if (!run.T) return;

              const decoded = safeDecode(run.T);
              const x = run.x || 0;
              const gap = x - lastX;

              // Insert space if gap is large enough
              if (gap > 2) extractedText += " ";

              extractedText += decoded;
              lastX = x;
            });
          });

          // Add a newline after each page
          extractedText += "\n";
        });

        // Clean up repeated spaces and trim
        extractedText = extractedText.replace(/\s+/g, " ").trim();

        resolve(extractedText);
      } catch (error) {
        console.error("Error during text extraction:", error);
        reject(new Error("Failed to extract text from parsed PDF"));
      }
    });

    // Fetch PDF from public URL
    axios
      .get(resumeUrl, { responseType: "arraybuffer" })
      .then((response) => {
        const buffer = Buffer.from(response.data);
        pdfParser.parseBuffer(buffer);
      })
      .catch(reject);
  });
}
