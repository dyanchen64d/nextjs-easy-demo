import React, { Suspense } from 'react';
import TodosList from './(users)/todos/TodosList';

export default function Home() {
  return (
    <div className="flex flex-col space-y-10">
      <Suspense fallback={<p className=" text-red-500">Loading the todos..</p>}>
        <div className=" flex space-x-2">
          {/* @ts-ignore */}
          <TodosList />
        </div>
      </Suspense>

      <Suspense
        fallback={<p className=" text-blue-500">Loading the todos..</p>}
      >
        <div className=" flex space-x-2">
          {/* @ts-ignore */}
          <TodosList />
        </div>
      </Suspense>
    </div>
  );
}
