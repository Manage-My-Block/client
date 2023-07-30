import { useQuery } from '@tanstack/react-query'
import { getBudgets, getBudgetById, getBudgetByBuildingId } from '../api/budget'
import ModalDaisy from '../components/ModalDaisy'
import LoadingIcon from '../components/LoadingIcon'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import BudgetFormModal from '../components/Budget/BudgetFormModal'
import TransactionList from '../components/Budget/TransactionList'
import TransactionFormModal from '../components/Budget/TransactionFormModal'

export default function BudgetPage() {
    const auth = useAuthUser()
    const buildingId = auth().user.building._id

    // Get Budget info
    const budgetQuery = useQuery(['budget', buildingId], () => getBudgetByBuildingId(buildingId));

    if (budgetQuery.isLoading) return <LoadingIcon />
    if (budgetQuery.isError) return <h1>Error: {error.message}</h1>

    return (
        <div className='m-4'>
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-3xl font-extrabold'>{budgetQuery?.data?.name ? budgetQuery.data.name : "Budget"}</h1>
                        <h1 className='text-secondary font-extrabold'>Balance: {budgetQuery?.data?.balance ? `$${budgetQuery.data.balance}` : ""}</h1>
                    </div>

                    {!budgetQuery.data &&
                        <>
                            <button
                                // Open modal
                                onClick={() => window.create_budget_modal.showModal()}
                                className='btn btn-primary normal-case'
                            >
                                Create New Budget
                            </button>
                            <ModalDaisy modalId={'create_budget_modal'}>
                                <BudgetFormModal />
                            </ModalDaisy>

                        </>

                    }

                    {budgetQuery.data &&
                        <>
                            <button
                                // Open modal
                                onClick={() => window.create_transaction_modal.showModal()}
                                className='btn btn-primary normal-case'
                            >
                                Create New Transaction
                            </button>

                            <ModalDaisy modalId={'create_transaction_modal'}>
                                <TransactionFormModal budgetId={budgetQuery.data._id} />
                            </ModalDaisy>
                        </>
                    }





                </div>
            </div>

            {budgetQuery.data &&
                <div className='mt-8 border border-neutral rounded'>
                    <TransactionList transactions={budgetQuery.data.transactions} />
                </div>
            }


        </div>
    )
}
