// Your Firebase web config. This is NOT a secret — it ships in every web app and
// security is enforced by the Firestore rules, not by hiding these values. Still,
// paste YOUR OWN project's config below (Firebase console → Project settings → "Your apps").
// The placeholders here are intentional: this is a template, not a live deployment.
//
// The facilitator signs in with their Google account whose email matches
// facilitatorEmail() in firestore.rules. Enable Google (and Anonymous) in Firebase
// console → Authentication, and keep Email/Password disabled.
//
// authDomain note: the *.firebaseapp.com origin is a third party relative to the Hosting
// domain that serves the page. Sign-in by pop-up works, whereas sign-in by redirect
// depends on third-party storage and is unreliable in current browsers. The facilitator
// page tries the pop-up first, so allow pop-ups for the site. Setting authDomain to the
// Hosting domain serving the page is the documented cure, and it needs testing well
// before the day.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
