import Modal from './Modal';
import { Field, Form, Formik } from 'formik';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
      toast.success("Contact added successfully");
    } catch (error) {
      console.error("Error adding contact: ", error);
      toast.error("Failed to add contact");
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      toast.success("Contact updated successfully");
    } catch (error) {
      console.error("Error updating contact: ", error);
      toast.error("Failed to update contact");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={
          isUpdate
            ? { name: contact.name, email: contact.email }
            : { name: '', email: '' }
        }
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
          if (isUpdate) {
            await updateContact(values, contact.id);
          } else {
            await addContact(values);
          }
          resetForm();
          onClose();
        }}
      >
        <Form className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border px-2" />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <Field name="email" className="h-10 border px-2" />
          </div>
          <button type="submit" className='self-end border bg-amber-500 px-3 py-1.5 cursor-pointer'>
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
