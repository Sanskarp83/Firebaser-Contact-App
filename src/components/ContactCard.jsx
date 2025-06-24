import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {

   const {isOpen, onClose, onOpen} = useDisclose();
       
   const deleteContact = async (id) => {
    
      try {
          await deleteDoc(doc(db, "contacts", id));
         toast.success("Contact deleted successfully"); 
      } catch (error){
          console.error(error);
      }
   };

  return (
          <>
            <div key = {contact.id} className='flex items-center bg-yellow-200 px-3 justify-between rounded-lg h-[60px]'>
              <HiOutlineUserCircle  className='text-4xl text-orange-400'/>
              <div className='text-black mr-6 flex-1 ml-4'>
                <h2 className="font-bold">{contact.name}</h2>
                <p className='text-sm'>{contact.email}</p>
              </div>
              <div className='flex text-3xl'>
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                <IoMdTrash onClick={() => deleteContact(contact.id)} className='text-orange-400 cursor-pointer'/>
              </div>
            </div>
          <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
          </>
  )
}

export default ContactCard
