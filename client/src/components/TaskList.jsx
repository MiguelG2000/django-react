import {useEffect, useState} from 'react'
import { getAllTask } from '../api/task.api'
import { TaskCard } from './TaskCard'

export function TaskList() {
    const [task, setTask] = useState([]);

    useEffect(() => {
        async function loadTasks(){
            const res = await getAllTask();
            setTask(res.data)
        }
        loadTasks();
    }, [])

  return (
      <div className="grid grid-cols-3 gap-3">
          {task.map((task) => (
              <TaskCard key={task.id} task={task}/>
          ))}
      </div>
  )
}

export default TaskList