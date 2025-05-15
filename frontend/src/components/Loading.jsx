import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => (
  <div className="flex justify-center items-center">
    <ClipLoader color="#FBBF24" size={50} />
  </div>
);

export default Loading;