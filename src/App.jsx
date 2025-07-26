import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { CiSearch } from 'react-icons/ci';
import { FaCirclePlus } from 'react-icons/fa6';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import NotFoundContact from './components/NotFoundContact';

function App() {
  const [contacts, setContacts] = useState([]);
  
  const [search, setSearch] = useState('');

  const {isOpen, onClose, onOpen} = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, 'contacts');

        onSnapshot(contactRef, (snapshot) => {
           const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);
         return contactList;
        })
        
      } catch (error) {
        console.error('Error fetching contacts: ', error);
      }
    };

    getContacts();
  }, []);

  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
        <Navbar />

        {/* Search Bar + Add Icon */}
        <div className='flex items-center mt-6'>
          <div className='relative flex flex-grow items-center px-4'>
            <CiSearch className='ml-1 text-3xl absolute text-white' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search contacts'
              className='h-[40px] flex-grow bg-transparent pl-9 border border-amber-50 rounded-md text-white'
            />
          </div>
          <FaCirclePlus
            onClick={onOpen}
            className='text-5xl cursor-pointer text-white ml-3'
          />
        </div>

        {/* Contact List - Moved outside of the flex row */}
        <div className='mt-6 flex flex-col gap-3'>
          {contacts.filter((contact) =>
  contact.name.toLowerCase().includes(search.toLowerCase())
).length === 0 ? (
  <NotFoundContact />
) : (
  contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((contact) => (
      <ContactCard key={contact.id} contact={contact} />
    ))
)}

        </div>
      </div>

      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position='bottom-center'/>
    </>
  );
}

export default App;

