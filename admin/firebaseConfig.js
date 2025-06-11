// firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyNZf3zSCUTEDZoLAoCQUPqa788rZjFq4",
  authDomain: "krushnali-hotel-savda.firebaseapp.com",
  databaseURL: "https://krushnali-hotel-savda-default-rtdb.firebaseio.com/",
  projectId: "krushnali-hotel-savda",
  storageBucket: "krushnali-hotel-savda.firebasestorage.app",
  messagingSenderId: "826945573813",
  appId: "1:826945573813:web:adb7a4cc400e9277907ffc",
  measurementId: "G-SELXS1GL11"
};

const app = initializeApp(firebaseConfig);
export default app;
