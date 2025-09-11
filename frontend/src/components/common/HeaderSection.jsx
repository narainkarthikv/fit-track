
const HeaderSection = ({ title, icon }) => (
  <div className='text-center mb-4'>
    {icon}
    <h1 className='text-center mt-2' style={{ color: '#ff6f61' }}>{title}</h1>
  </div>
);

import PropTypes from 'prop-types';

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default HeaderSection;
