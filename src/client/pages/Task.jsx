import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTask from '@wasp/queries/getTask';
import createTask from '@wasp/actions/createTask';
import deleteTask from '@wasp/actions/deleteTask';

export function Task() {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTask, { id: taskId });
  const createTaskFn = useAction(createTask);
  const deleteTaskFn = useAction(deleteTask);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Task Details</h2>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div className='mb-2'>Task ID: {task.id}</div>
        <div className='mb-2'>Description: {task.description}</div>
        <div className='mb-2'>Is Done: {task.isDone ? 'Yes' : 'No'}</div>
        <div className='mb-2'>Reminder: {task.reminder}</div>
      </div>
      <div className='flex gap-x-4'>
        <button
          onClick={() => createTaskFn({ description: task.description, reminder: task.reminder })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          New Task
        </button>
        <button
          onClick={() => deleteTaskFn({ id: task.id })}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Delete Task
        </button>
        <button
          onClick={() => console.log('Task completed')}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Task Completed
        </button>
      </div>
      <Link to='/dashboard' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Back to Dashboard</Link>
    </div>
  );
}