import { notFound } from 'next/navigation';
import React from 'react';
import { Todo } from '../../../typings';

export const dynamicParams = true; // ? default

type PageProps = {
  params: {
    todoId: string;
  };
};

const fetTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
    // { cache: 'no-cache' }
  );

  const todo: Todo = await res.json();
  return todo;
};

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetTodo(todoId);

  if (!todo.id) return notFound();

  return (
    <div className=" p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <p className=" border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
}

export default TodoPage;

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
  const todos: Todo[] = await res.json();

  // for this demo, only prebuilding the first 10 pages to avoid being limited by api
  const trimmedTodos = todos.splice(0, 5);

  return trimmedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
