import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

let firebaseApp;

import dotenv from "dotenv";
dotenv.config();

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    
    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
    });
    console.log("Firebase Admin Initialized via ENV.");
  } else {
    const serviceAccountPath = new URL('../config/serviceAccountKey.json', import.meta.url);
    
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log("Firebase Admin Initialized successfully from file.");
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log("Firebase Admin Initialized via legacy FIREBASE_SERVICE_ACCOUNT ENV.");
    } else {
      console.warn("Firebase credentials not found. Firebase auth will fail.");
    }
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

const admin = {
  auth: getAuth,
};

export default admin;
