import React from 'react'

const NotFoundContact = () => {
  return (
    <div className="text-white text-center mt-10 flex flex-col items-center gap-3">
      <img src="/contact.png" alt="Not Found" className="w-40 h-40 opacity-50" />
      <h3 className="text-xl">No Contacts Found</h3>
    </div>
  );
};

export default NotFoundContact;
