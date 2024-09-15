# ParsePal - Efficient Document Extraction and Querying

**ParsePal** is a versatile, cross-platform application designed to streamline the extraction and management of information from documents. It utilizes Amazon Textract for document analysis and is built using a combination of modern technologies to provide a seamless experience on both Android and desktop platforms.

---

## Problem Statement

Managing and extracting valuable data from various document formats can be a complex and time-consuming task. Users often face challenges such as:

- Difficulty in extracting structured data from complex documents.
- Inefficiencies in converting data into usable formats.
- Lack of interactive querying capabilities for precise insights from extracted data.

**ParsePal** solves these problems by providing an intuitive platform for efficient document processing and interactive data querying.

---

## Our Approach

**ParsePal** addresses these challenges with the following features:

- **Document Upload:** Users can upload PDF, JPEG, or PNG files.
- **Data Extraction:** Amazon Textract extracts text and table data from documents.
- **Format Conversion:** Converts extracted data into JSON or CSV formats.
- **Interactive Querying:** Allows users to ask specific questions about their data for precise insights.

For instance, if a user named Alex needs to analyze data from a set of documents, ParsePal allows him to upload, extract, convert, and query the data effortlessly.

---

## Tech Stack

**ParsePal** leverages a modern tech stack to deliver a high-quality experience:

### Frontend

- **React:** For building the web application interface.
- **Tailwind CSS:** For styling and responsive design.

### Mobile Application

- **Flutter:** For developing a cross-platform mobile application (Android).

### Backend

- **MERN Stack:** 
  - **MongoDB:** For database management.
  - **Express.js:** For server-side logic.
  - **React.js:** For building the frontend part of the backend.
  - **Node.js:** For backend development.

- **Amazon Textract:** For extracting text and table data from documents.

### Machine Learning

- **Custom ML Models:** For advanced data processing and querying capabilities.

---

## Getting Started

### Frontend (Web)

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```
   Opens the application in development mode at [http://localhost:3000](http://localhost:3000).

4. **Build for Production:**
   ```bash
   npm run build
   ```
   Creates an optimized production build.

5. **Run Tests:**
   ```bash
   npm test
   ```

---

### Mobile Application (Flutter)

1. **Set Up Flutter SDK:**
   Follow the [Flutter installation guide](https://flutter.dev/docs/get-started/install).

2. **Run the Application:**
   Use your preferred IDE or command line:
   ```bash
   flutter run
   ```

---

### Backend (MERN Stack)

1. **Set Up Backend:**
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     npm install
     ```

2. **Run the Backend Server:**
   ```bash
   npm start
   ```

---

## Deployment

For detailed deployment instructions, refer to the following:

- **Frontend Deployment:** [Create React App deployment guide](https://facebook.github.io/create-react-app/docs/deployment)
- **Backend Deployment:** Follow standard MERN stack deployment practices.
- **Mobile App Deployment:** Refer to [Flutter deployment guide](https://flutter.dev/docs/deployment)

---

## Documentation

- **React Documentation:** [React Docs](https://reactjs.org/docs/getting-started.html)
- **Flutter Documentation:** [Flutter Docs](https://flutter.dev/docs)
- **Amazon Textract Documentation:** [Textract Docs](https://docs.aws.amazon.com/textract/latest/dg/what-is.html)
- **Tailwind CSS Documentation:** [Tailwind Docs](https://tailwindcss.com/docs)

---

## Features

- **File Upload:** Supports PDF, JPEG, and PNG file uploads.
- **Data Extraction:** Extracts text and tables using Amazon Textract.
- **Format Conversion:** Converts data to JSON or CSV formats.
- **Interactive Querying:** Enables users to query extracted data for insights.

---

## User Interface

### Web App Screenshots

![Home Page](https://github.com/user-attachments/assets/92191abe-7c1c-4f78-8b5a-caceaab6f523)

![Sign up Page](https://github.com/user-attachments/assets/af9e69e7-9719-4c37-bc34-0ab99f180d02)

![Sign in Page](https://github.com/user-attachments/assets/97b7afad-d574-4e69-8ead-b0e854cb4fb9)

![Filw COnvertor](https://github.com/user-attachments/assets/f2e0a90e-f247-4eee-bcb9-56a338e72bcc)

![Download File](https://github.com/user-attachments/assets/538d6ac0-ff97-4b3b-ac03-952f5ee15110)

![Document Upload](https://github.com/user-attachments/assets/a30dd46f-4919-4e50-8575-24d61eaba75a)

![Ask About Your File](https://github.com/user-attachments/assets/489c5dfd-1603-4f18-88c5-e1a70a06cf31)

![Log out](https://github.com/user-attachments/assets/c43d55ec-36f7-4b40-89cd-312b7926c97d)

### Mobile App Screenshots

Here are some screenshots of the ParsePal mobile application:

![Slide_16_9_-_1_2](https://github.com/user-attachments/assets/f4229660-dfe2-45a5-a1b4-715c7e5a3d34)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 37 24](https://github.com/user-attachments/assets/99436189-6e98-4fdc-8c90-a896fb9cf6e2)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 35 55](https://github.com/user-attachments/assets/89df1c84-cd34-4076-bbd4-9fdca4d93b69)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 36 00](https://github.com/user-attachments/assets/d3d8632d-7321-4b5b-bb0e-f3d1dccdca02)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 37 45](https://github.com/user-attachments/assets/16dc5de3-bad5-432c-819d-5bd8932a604e)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 37 45_2](https://github.com/user-attachments/assets/3a93f1f8-64ba-4a98-bb72-341d7c8d74a5)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 37 49](https://github.com/user-attachments/assets/3dcd946b-9c78-47f7-8457-5b45d87f4a7b)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 41 48](https://github.com/user-attachments/assets/cb598443-a74a-418b-819a-f13c7a9d97bc)

![Simulator_Screenshot_-_iPhone_14_-_2024-09-15_at_14 47 35](https://github.com/user-attachments/assets/576ce946-4274-4dc0-ad49-b2db44d1b049)

![Slide_16_9_-_2_2](https://github.com/user-attachments/assets/ab601361-0b32-4237-a52f-4b8c708b4a40)

---

## Our Team

- **Akarsh Jain:** [GitHub](https://github.com/akarsh-jain-790) | [LinkedIn](https://www.linkedin.com/in/akarsh-jain/)
- **Tanmay Sagwal:** [GitHub](https://github.com/Tanmay41) | [LinkedIn](https://www.linkedin.com/in/tanmaysagwal/)
- **R. Aditya:** [GitHub](https://github.com/adityarags) | [LinkedIn](https://www.linkedin.com/in/adityarags/)
- **Avishi Mittal:** [GitHub](https://github.com/a-wishie) | [LinkedIn](https://www.linkedin.com/in/avishi14/)

---
