'use client'

import {useParams} from 'next/navigation';

const DetailsPage = () => {
  const {id} = useParams();

  return (
    <div>
      <h1>Details for ID: {id}</h1>
      {/* Add your details rendering logic here */}
    </div>
  );
};

export default DetailsPage;
