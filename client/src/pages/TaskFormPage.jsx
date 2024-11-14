import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast'

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
      toast.success('Tarea Actualizada')
    } else {
      await createTask(data);
      toast.success('Tarea Creada')
    }
    navigate("/task");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("Obteniendo datos");
        const {data: {title, description}} = await getTask(params.id);
        setValue('title', title);
        setValue('description', description);
      }
    }
    loadTask()
  }, []);

  return (
    <div className="max-w-xlmx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        {errors.title && <span>Este campo es requerido</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>

        {errors.description && <span>Este campo es requerido</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {params.id && (
          <div className="flex justify-end">
            <button
                className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                onClick={async () => {
                  const accepted = window.confirm("¿Estas Seguro?");
                  if (accepted) {
                    await deleteTask(params.id);
                    toast.success('Tarea Eliminada')
                    navigate("/task");
                  }
                }}
            >
              Delete
            </button>
          </div>
      )}
    </div>
  );
}
