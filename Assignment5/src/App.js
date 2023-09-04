import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

// Firebase configuration object (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyASAFbkaxLyCdt7cZVNvsytQA8HdI2vT14",
  authDomain: "questionnaire-app-14ba3.firebaseapp.com",
  databaseURL: "https://questionnaire-app-14ba3-default-rtdb.firebaseio.com",
  projectId: "questionnaire-app-14ba3",
  storageBucket: "questionnaire-app-14ba3.appspot.com",
  messagingSenderId: "502628309065",
  appId: "1:502628309065:web:aa651bb410a1115c794798",
  measurementId: "G-9FPZ49WKG1"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard db={db} />} />
        <Route path="/questionnaire" element={<Questionnaire db={db} />} />
        <Route path="/create" element={<Create db={db} />} />
      </Routes>
    </Router>
  );
}

export default App;
