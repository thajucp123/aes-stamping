# AES Stamping App

This is a simple web application built with React and Vite that allows users to create and download a digital "stamp" or "card" with specific information.

## Features

*   **Customizable Card:** Users can input the following information to generate a card:
    *   Representing Agency (e.g., "BV / KOC")
    *   Inspector Name
    *   Stamp Date
    *   Witness (checkbox)
    *   Review (checkbox)
    *   Signature (by uploading an image)
*   **Live Preview:** The application provides a real-time preview of the card as the user fills in the information.
*   **Download as PNG:** Users can download the generated card as a PNG image.

## Technology Stack

*   **Frontend:** React, Vite
*   **Image Generation:** `html2canvas`

## How to Use

1.  Clone the repository.
2.  Install dependencies using `npm install`.
3.  Run the development server using `npm run dev`.
4.  Open the application in your browser.
5.  Fill in the form with the required information.
6.  Click the "Download as PNG" button to save the card to your computer.