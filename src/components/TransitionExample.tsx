import { useState, useEffect, useTransition } from 'react';
import { TASKS } from '../constants/tasks';

interface Task {
  name: string;
  description: string;
  type: string;
}

const TransitionExample = (): JSX.Element => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const [filterByType, setFilterByType] = useState('');

  useEffect(() => {
    // Fetch tasks initially
    setIsLoading(true);
    fetchTasks()
      .then((data) => setTasks(data))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchTasks = async (): Promise<Array<Task>> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Promise((res) => res(TASKS));
  };
  const fetchFilteredTasks = async (type: string): Promise<Array<Task>> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return TASKS.filter((t) => t.type === type);
  };

  const handleFilterClick = (type: string): void => {
    // Urgent update (button state) No need to wrap in startTransition
    setFilterByType(type);
  };

  const handleFilter = (type: string) => {
    startTransition(() => {
      // Non-urgent update (fetching filtered tasks)
      setIsLoading(true);
      fetchFilteredTasks(type)
        .then((data) => setTasks(data))
        .finally(() => setIsLoading(false));
    });
  };

  return <div>Transition Example</div>;
};

export default TransitionExample;
