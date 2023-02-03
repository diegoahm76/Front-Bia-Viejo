import React from 'react';

const Subtitle = ({ title, mt = 0, mb = 0, widthS = '100%' }) => {
  return (
    <div style={{ width: widthS }}>
      <label
        className={`border rounded-pill px-4 mt-${mt} mb-${mb} text-white fs-5 p-1`}
        style={{
          backgroundImage: 'linear-gradient(45deg, #6db227, #36a9e0)',
          width: '100%'
        }}
      >
        {title}
      </label>
    </div>
  );
};
export default Subtitle;
