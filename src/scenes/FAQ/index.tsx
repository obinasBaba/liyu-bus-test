import React from 'react';
import s from './faq.module.scss';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Stack,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const questions = [
  {
    topic: 'TICKET',
    questions: [
      {
        question: 'How do I cancel my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I get a refund?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I postpond my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I replace  stolen or lost tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
    ],
  },
  {
    topic: 'BOOKING',
    questions: [
      {
        question: 'How do I cancel my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I get a refund?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I postpond my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I replace  stolen or lost tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
    ],
  },
  {
    topic: 'BOARDING AND TRAVELING',
    questions: [
      {
        question: 'How do I cancel my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I get a refund?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I postpond my tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
      {
        question: 'How do I replace  stolen or lost tickets?',
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing.`,
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className={s.container}>
      <Container maxWidth="xl" className={s.wrapper}>
        <header>
          <Typography variant="h3">Get Answers</Typography>
          <Typography color="#e74f00">
            For questions people often ask
          </Typography>
        </header>

        <Stack spacing={6} className={s.questions}>
          {questions.map((topic, oIdx) => (
            <Stack spacing={2} className={s.topic} key={oIdx}>
              <Stack>
                <Typography color="#e74f00" variant="h6">
                  {topic.topic}
                </Typography>
                <hr />
              </Stack>
              <Stack className={s.accordion_container}>
                {topic.questions.map((faq, index) => (
                  <Accordion key={oIdx + index}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      className={s.a_summary}
                    >
                      <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default FAQ;
