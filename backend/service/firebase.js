import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

let firebaseApp;

import dotenv from "dotenv";
dotenv.config();

try {
  const serviceAccountPath = new URL('../config/serviceAccountKey.json', import.meta.url);
  
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
    });
    console.log("Firebase Admin Initialized successfully from file.");
  } else {
    console.warn("Firebase credentials not found. Firebase auth will fail.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

const admin = {
  auth: getAuth,
};

export default admin;
