import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const database = getDatabase(app);


const rootRef = ref(database);
const categoriesRef = ref(database, 'categories');
const dishesRef = ref(database, 'dishes');


export { database, rootRef, categoriesRef, dishesRef };
