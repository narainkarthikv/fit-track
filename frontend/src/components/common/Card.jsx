import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ title, text, children }) => (
  <BootstrapCard>
    <BootstrapCard.Body>
      <BootstrapCard.Title>{title}</BootstrapCard.Title>
      <BootstrapCard.Text>{text}</BootstrapCard.Text>
      {children}
    </BootstrapCard.Body>
  </BootstrapCard>
);

export default Card;
