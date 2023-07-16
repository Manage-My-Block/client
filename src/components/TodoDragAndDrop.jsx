/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTodo } from "../api/todos"
import TodoItem from './TodoItem';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    rotate: isDragging ? "2deg" : "0deg",
    transition: 'all 1s ease',
    ...draggableStyle
});

const getListStyle = (snapshot) => ({
    padding: grid,
    borderRadius: "10px",
    margin: "20px",
    background: '#2a323c',
    minHeight: '134px'
});

export default function TodoDragAndDrop({ todos, handleDelete }) {
    const [pendingItems, setPendingItems] = useState(todos.filter(todo => todo.status === 'pending'));
    const [activeItems, setActiveItems] = useState(todos.filter(todo => todo.status === 'active'));
    const queryClient = useQueryClient()

    useEffect(() => {
        setPendingItems(todos.filter(todo => todo.status === 'pending'))
        setActiveItems(todos.filter(todo => todo.status === 'active'))
    }, [todos])

    const id2List = {
        pending: 'items',
        active: 'selected'
    };

    const getList = (id) => {
        return id2List[id] === 'items' ? pendingItems : activeItems;
    };

    // React query comment mutation
    const handleUpdateTodo = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
            console.log(error)

            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    // Trigger when dragging is finished (eg: mouse up)
    const onDragEnd = (result) => {
        // Extract relavant data from the drag result
        const { source, destination, draggableId } = result;

        // If there is no destination then the user released the draggable over a non-droppable area
        // don't do anything
        if (!destination) {
            return;
        }

        // If the draggable is moved within one droppable area, reorder the draggables
        if (source.droppableId === destination.droppableId) {
            const list = getList(source.droppableId);
            const reorderedItems = reorder(list, source.index, destination.index);

            if (source.droppableId === 'active') {
                setActiveItems(reorderedItems);
            } else {
                setPendingItems(reorderedItems);
            }
        } else {
            // Make the API calls to change the status when the user drops into the different bins
            if (source.droppableId === 'active') {
                handleUpdateTodo.mutate({ todoId: draggableId, updatedData: { status: "pending" } })
            } else {
                handleUpdateTodo.mutate({ todoId: draggableId, updatedData: { status: "active" } })
            }

            // Move the items
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            // Update the state
            setPendingItems(result.pending);
            setActiveItems(result.active);
        }
    };


    return (
        <DragDropContext
            onDragEnd={onDragEnd}>
            <div className='md:flex-col lg:flex'>
                {/* Active tasks droppable */}
                <div>
                    <h1 className='font-bold text-xl mb-2'>Active Tasks</h1>
                    <Droppable droppableId="active">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className=''
                                style={getListStyle(snapshot)}>

                                {activeItems.map((item, index) => (
                                    <TodoItem key={item._id} draggableId={item._id} index={index} todo={item} handleDelete={handleDelete} getItemStyle={getItemStyle} handleUpdateTodo={handleUpdateTodo} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                {/* Pending tasks droppable */}
                <div>
                    <h1 className='font-bold text-xl mb-2'>Pending Tasks</h1>
                    <Droppable droppableId="pending">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>

                                {pendingItems.map((item, index) => (
                                    <TodoItem key={item._id} draggableId={item._id} index={index} todo={item} handleDelete={handleDelete} getItemStyle={getItemStyle} handleUpdateTodo={handleUpdateTodo} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}
