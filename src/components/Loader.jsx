import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loader = ({ text }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      {text && <p style={{ marginTop: '10px' }}>{text}</p>}
    </div>
  );
};

export default Loader;
