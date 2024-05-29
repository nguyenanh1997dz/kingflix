const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const dotenv = require('dotenv');
dotenv.config();

initializeApp({
    credential: cert({
        type: process.env.FIREBASE_TYPE || "",
        project_id: process.env.FIREBASE_PROJECT_ID || "",
        private_key_id: process.env.FIREBASE_private_key_id || "",
        private_key: process.env.FIREBASE_private_key || "",
        client_email: process.env.FIREBASE_client_email || "",
        client_id: process.env.FIREBASE_client_id || "",
        client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url || "",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
    }),
    storageBucket : process.env.FIREBASE_STORAGE_BUCKET
});

const storage = getStorage().bucket();

module.exports = storage;
