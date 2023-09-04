import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Dashboard from './Dashboard';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';

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

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'questions'), (snapshot) => {
      const updatedQuestions = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          agree: data.agree || false,
          neutral: data.neutral || false,
          disagree: data.disagree || false,
        };
      });
      setQuestions(updatedQuestions);
    });

    return () => {
      // Unsubscribe from the Firestore collection when the component unmounts
      unsubscribe();
    };
  }, [db]);

  const handleCheckboxChange = async (id, type) => {
    try {
      const questionRef = doc(db, 'questions', id);
      const questionDoc = await getDoc(questionRef);
  
      if (questionDoc.exists()) {
        const questionData = questionDoc.data();
  
        // Clear other options for the same question
        if (type === 'agree') {
          questionData.neutral = false;
          questionData.disagree = false;
        } else if (type === 'neutral') {
          questionData.agree = false;
          questionData.disagree = false;
        } else if (type === 'disagree') {
          questionData.agree = false;
          questionData.neutral = false;
        }
  
        questionData[type] = !questionData[type];
  
        await updateDoc(questionRef, questionData);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };
  

  // Calculate counts
  const calculateQuestionCounts = (questions) => {
    const questionCount = questions.length;
    const agreeCount = questions.filter((question) => question.agree).length;
    const neutralCount = questions.filter((question) => question.neutral).length;
    const disagreeCount = questions.filter((question) => question.disagree).length;
  
    return {
      questionCount,
      agreeCount,
      neutralCount,
      disagreeCount,
    };
  };
  const {
    questionCount,
    agreeCount,
    neutralCount,
    disagreeCount,
  } = calculateQuestionCounts(questions);
  
   // Function to handle submission of results
   const handleSubmit = () => {
    setSubmittedResults(true);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Questionnaire</h1>
      <TableContainer sx={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '800px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><h4>Questions</h4></TableCell>
              <TableCell><h4>Agree</h4></TableCell>
              <TableCell><h4>Neutral</h4></TableCell>
              <TableCell><h4>Disagree</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.text}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={question.agree}
                    onChange={() => handleCheckboxChange(question.id, 'agree')}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={question.neutral}
                    onChange={() => handleCheckboxChange(question.id, 'neutral')}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={question.disagree}
                    onChange={() => handleCheckboxChange(question.id, 'disagree')}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
