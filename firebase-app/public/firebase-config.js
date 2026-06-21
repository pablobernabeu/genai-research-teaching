// Your Firebase web config. This is NOT a secret — it ships in every web app and
// security is enforced by the Firestore rules, not by hiding these values. Still,
// paste YOUR OWN project's config below (Firebase console → Project settings → "Your apps").
// The placeholders here are intentional: this is a template, not a live deployment.
//
// The facilitator signs in with their Google account whose email matches
// FACILITATOR_EMAIL in firestore.rules. Enable Google (and Anonymous) in Firebase
// console → Authentication, and keep Email/Password disabled.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
