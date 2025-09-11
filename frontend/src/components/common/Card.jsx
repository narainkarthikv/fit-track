import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Card = ({ title, text, children }) => (
  <BootstrapCard>
    <BootstrapCard.Body>
      <BootstrapCard.Title>{title}</BootstrapCard.Title>
      <BootstrapCard.Text>{text}</BootstrapCard.Text>
      {children}
    </BootstrapCard.Body>
  </BootstrapCard>
);

Card.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
