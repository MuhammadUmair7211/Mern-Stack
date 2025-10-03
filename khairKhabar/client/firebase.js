// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyDSkTtm-iY30C-bcJncO-zGBhRtqwJNQS0",
	authDomain: "khairkhabar-7945b.firebaseapp.com",
	projectId: "khairkhabar-7945b",
	storageBucket: "khairkhabar-7945b.appspot.com",
	messagingSenderId: "1095381417751",
	appId: "1:1095381417751:web:56c566d155f0ba05f54152",
	measurementId: "G-C9N785VSXD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
