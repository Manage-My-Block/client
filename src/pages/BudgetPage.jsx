import { useQuery } from '@tanstack/react-query'
import { getBudgets, getBudgetById, getBudgetByBuildingId } from '../api/budget'
import ModalDaisy from '../components/ModalDaisy'
import LoadingIcon from '../components/LoadingIcon'
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from 'react'
import BudgetFormModal from '../components/Budget/BudgetFormModal'
import TransactionList from '../components/Budget/TransactionList'
import TransactionFormModal from '../components/Budget/TransactionFormModal'
import EditBudgetModal from '../components/Budget/EditBudgetModal'

export default function BudgetPage() {
    const auth = useAuthUser()
    const buildingId = auth().user.building._id

    // Get Budget info
    const budgetQuery = useQuery(['budgets', buildingId], () => getBudgetByBuildingId(buildingId));

    function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (budgetQuery.isLoading) return <LoadingIcon />
    if (budgetQuery.isError) return <h1>Error: {error.message}</h1>

    return (
        <div className='m-4'>
            <div>
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


                {/* List budgets */}
                {budgetQuery.data.length >= 1 && budgetQuery.data.map(budget => {
                    return (
                        <div key={budget._id} className='pt-10'>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-3xl font-extrabold'>{budget.name}</h1>
                                    <h1 className='text-secondary font-extrabold'>Balance: {`$${numberWithCommas(budget.balance / 100)}`}</h1>
                                </div>

                                <button
                                    // Open modal
                                    onClick={() => window[`create_transaction_modal_${budget._id}`].showModal()}
                                    className='btn btn-primary normal-case'
                                >
                                    Create New Transaction
                                </button>

                                <ModalDaisy modalId={`create_transaction_modal_${budget._id}`}>
                                    <TransactionFormModal budgetId={budget._id} />
                                </ModalDaisy>

                                <button
                                    // Open modal
                                    onClick={() => window[`edit_budget_modal_${budget._id}`].showModal()}
                                    className='btn btn-primary normal-case'
                                >
                                    Edit Budget
                                </button>

                                <ModalDaisy modalId={`edit_budget_modal_${budget._id}`}>
                                    <EditBudgetModal budgetId={budget._id} />
                                </ModalDaisy>
                            </div>
                            <div>
                                <div className='mt-8 border border-neutral rounded'>
                                    <TransactionList transactions={budget.transactions} />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
