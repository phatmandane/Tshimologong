import React, { useEffect, useState } from 'react';
import Sidenav from '../Sidenav'; 
import { collection, onSnapshot } from 'firebase/firestore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';

export default function Dashboard({ db }) {

  const [questionCount, setQuestionCount] = useState(0);
  const [agreeCount, setAgreeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);

  useEffect(() => {
    // Fetch data from Firestore and calculate counts here using db
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

      const newQuestionCount = updatedQuestions.length;
      const newAgreeCount = updatedQuestions.filter((question) => question.agree).length;
      const newNeutralCount = updatedQuestions.filter((question) => question.neutral).length;
      const newDisagreeCount = updatedQuestions.filter((question) => question.disagree).length;

      setQuestionCount(newQuestionCount);
      setAgreeCount(newAgreeCount);
      setNeutralCount(newNeutralCount);
      setDisagreeCount(newDisagreeCount);
    });
    return () => {
      // Unsubscribe from the Firestore collection when the component unmounts
      unsubscribe();
    };
  }, [db]);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidenav/> 
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >

                <Card sx={{ maxWidth: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <div>
                      <QuestionMarkIcon/>
                    </div>
                    <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
                      Number of Questions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {questionCount}
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ maxWidth: '49%', textAlign: 'center' }}>
                  <CardContent>
                    <div>
                      <ThumbUpAltIcon/>
                    </div>
                    <Typography gutterBottom variant="h6" component="div">
                      Agreements
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agreeCount}
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ maxWidth: '49%', textAlign: 'center' }}>
                  <CardContent>
                    <div>
                      <ThumbDownAltIcon/>
                    </div>
                    <Typography gutterBottom variant="h6" component="div">
                      Disagreements
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {disagreeCount}
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ maxWidth: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <div>
                      <SentimentNeutralOutlinedIcon/>
                    </div>
                    <Typography gutterBottom variant="h6" component="div">
                      Neutral
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {neutralCount}
                    </Typography>
                  </CardContent>
                </Card>

              </Stack>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* ... */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}
