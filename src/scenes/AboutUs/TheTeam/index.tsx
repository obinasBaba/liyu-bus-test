import React from 'react';
import s from './theteam.module.scss';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const teamMembers = [
  {
    name: 'John Doe',
    position: 'CEO, Chair Man Officer',
    image: '/img/bus1.jpg',
  },
  {
    name: 'John Doe',
    position: 'CEO, Chair Man Officer',
    image: '/img/bus2.jpg',
  },
  {
    name: 'John Doe',
    position: 'CEO, Chair Man Officer',
    image: '/img/bus3.jpg',
  },
  {
    name: 'John Doe',
    position: 'CEO, Chair Man Officer',
    image: '/img/bus4.jpg',
  },
  {
    name: 'John Doe',
    position: 'CEO, Chair Man Officer',
    image: '/img/bus2.jpg',
  },
];

const TheTeam = () => {
  return (
    <div className={s.container}>
      <header>
        <Typography variant="h3">Meet The Team</Typography>
        <Typography variant="body1" color="#e74f00">
          in case you found a familiar face
        </Typography>
      </header>

      <Stack direction="row" flexWrap="wrap" spacing={2} className={s.content}>
        {teamMembers.map((member, index) => (
          <div key={index} className={s.member}>
            <img src={member.image} alt={member.name} />
            <Typography variant="body1" className={s.name}>
              {member.name}
            </Typography>
            <Typography variant="body2" color="gray">
              {member.position}
            </Typography>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default TheTeam;
