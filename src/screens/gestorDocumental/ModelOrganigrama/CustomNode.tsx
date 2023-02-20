import React from 'react';
import PropTypes from 'prop-types';
import '../../css/organigrama_styles.css';

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData }) => {
  const { classname } = nodeData;
  // console.log(nodeData);
  return (
    <div>
      <div className={`${classname} container`}>{nodeData.title}</div>
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;