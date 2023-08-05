import { useQuery } from '@tanstack/react-query'
import LoadingIcon from '../components/LoadingIcon'
import { getContacts } from '../api/contacts'
import ModalDaisy from '../components/ModalDaisy'
import ContactFormModal from '../components/Contacts/ContactFormModal'
import ContactList from '../components/Contacts/ContactList'
import { useAuthUser } from 'react-auth-kit'

export default function ContactPage() {
    // Get logged in user
    const auth = useAuthUser()
    const user = auth().user

    // Fetch contacts list
    const contactsQuery = useQuery(['contacts'], () => getContacts(user.building._id));

    if (contactsQuery.isLoading) return <LoadingIcon />
    if (contactsQuery.isError) return <div className='w-full h-screen flex justify-center'><h1>Error: {contactsQuery.error.message}</h1></div>

    return (
        <div className='m-4'>
            <div>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-extrabold'>Contacts</h1>

                    <button
                        // Open modal
                        onClick={() => window.create_contact_modal.showModal()}
                        className='btn btn-primary normal-case'
                    >
                        Create New Contact
                    </button>

                    <ModalDaisy modalId={'create_contact_modal'}>
                        <ContactFormModal />
                    </ModalDaisy>
                </div>
            </div>
            <div className='mt-8 border border-neutral rounded'>
                <ContactList contacts={contactsQuery.data} />
            </div>

        </div>
    )
}
