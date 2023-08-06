import { startCase } from "lodash";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteContact } from '../../api/contacts'
import SubmitButton from '../SubmitButton'


export default function ContactItem({ contact }) {
    const queryClient = useQueryClient()


    const handleDeleteContact = useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })
    return (
        <tr>
            <td>{startCase(contact.occupation)}</td>
            <td>{contact.name}</td>
            <td>{contact.phoneNumber}</td>
            <td className="w-24">
                <SubmitButton onClick={() => handleDeleteContact.mutate(contact._id)} label={'Delete'} loadingState={handleDeleteContact.isLoading} classString={'btn btn-outline btn-sm btn-error w-20'} />
            </td>
        </tr>
    )
}
