import React from 'react';
import PropTypes from 'prop-types';
import '../../css/organigrama_styles.css';

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData }) => {
  const { className } = nodeData;
  console.log(className);
  return (
    <div>
      <div className={`${className}`}>{nodeData.title}</div>
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
