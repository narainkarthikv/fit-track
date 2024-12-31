import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

const EmojiSection = ({ emoji, onClick }) => (
  <div className="text-center mt-5" onClick={onClick} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
    <BsEmojiSmile size={40} />
    <span className="ml-3" aria-live="polite" style={{ fontWeight: 'bold' }}>
      Feeling {emoji} today?
    </span>
  </div>
);

export default EmojiSection;
