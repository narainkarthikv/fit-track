import PropTypes from 'prop-types';
import React from 'react';

const HeaderSection = ({ title, icon }) => (
  <div className="text-center mb-4">
    {icon && React.cloneElement(icon, { 'data-testid': 'header-section-icon' })}
    <h1
      className="text-center mt-2"
      style={{
        color: '#ff6f61',
      }}
    >
      {title}
    </h1>
  </div>
);

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default HeaderSection;
