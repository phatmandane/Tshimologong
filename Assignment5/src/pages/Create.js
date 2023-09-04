import React, { useState, useEffect } from 'react';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// Firebase configuration object 
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

export default function Create() {
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  useEffect(() => {
    // Fetch questions from Firestore when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const fetchedQuestions = [];
      querySnapshot.forEach((doc) => {
        fetchedQuestions.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionSubmit = async () => {
    if (newQuestion.trim() !== '') {
      try {
        if (editingQuestionId !== null) {
          // If editing an existing question, update it in Firestore
          const questionRef = doc(db, 'questions', editingQuestionId);
          await updateDoc(questionRef, { text: newQuestion });
        } else {
          // Create a new question object and add it to Firestore with a unique ID
          const docRef = await addDoc(collection(db, 'questions'), {
            text: newQuestion,
          });
          console.log('Question added with ID:', docRef.id);
        }
        // Fetch updated questions from Firestore
        fetchQuestions();
        setNewQuestion('');
        setEditingQuestionId(null);
      } catch (error) {
        console.error('Error adding/editing question:', error);
      }
    }
  };

  const handleEditQuestion = (id) => {
    // Set the question's text to the input field for editing
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setNewQuestion(questionToEdit.text);
      setEditingQuestionId(id);
    } else {
      // If the question with the specified ID is not found, reset editing state
      setNewQuestion('');
      setEditingQuestionId(null);
    }
  };
  

  const handleDeleteQuestion = async (id) => {
    try {
      // Delete the question from Firestore
      const questionRef = doc(db, 'questions', id);
      await deleteDoc(questionRef);

      // Fetch updated questions from Firestore
      fetchQuestions();
      setEditingQuestionId(null); // Reset editing state if a question is deleted
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
        <h1>Creating a Questionnaire</h1>
          
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button onClick={handleQuestionSubmit} variant="contained">
                {editingQuestionId !== null ? 'Edit' : 'Add'}
              </button>
            <h2>List of Questions</h2>

  <TableContainer sx={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '800px'  }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Questions</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.map((question) => (
        <TableRow key={question.id}>
          <TableCell>{question.text}</TableCell>
          <TableCell align="right">
            <IconButton onClick={() => handleEditQuestion(question.id)}color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteQuestion(question.id)}color="primary">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        </Box>
 
      </Box>
      </div>
  );
}
