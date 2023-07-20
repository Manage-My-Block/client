export default function ModalDaisy({ children, modalId }) {
    return (
        // Open the modal using window.*modalId*.showModal() from anywhere in app (like a button)
        <dialog id={modalId} className='modal'>
            
			{children}

			{/* This allows the modal to be closed by clicking on backdrop */}
			<form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>

        </dialog>
    )
}
