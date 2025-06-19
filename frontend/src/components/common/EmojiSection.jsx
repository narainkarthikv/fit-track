import React from 'react';
import PropTypes from 'prop-types';
import { BsEmojiSmile } from 'react-icons/bs';

const EmojiSection = ({ emoji, onClick }) => (
  <div className='text-center mt-5' onClick={onClick} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
    <BsEmojiSmile size={40} />
    <span className='ml-3' aria-live='polite' style={{ fontWeight: 'bold' }}>
      Feeling {emoji} today?
    </span>
  </div>
);

EmojiSection.propTypes = {
  emoji: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default EmojiSection;
