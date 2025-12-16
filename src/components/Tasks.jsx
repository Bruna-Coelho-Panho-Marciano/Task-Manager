import { CheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    // Tenta usar o modal se estiver disponível
    if (window.openTaskModal) {
      window.openTaskModal(task);
    } else {
      // Fallback: navega para a página como antes
      const query = new URLSearchParams();
      query.set("title", task.title);
      query.set("description", task.description);
      navigate(`/task?${query.toString()}`);
    }
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`
            bg-slate-400 
            text-left 
            w-full 
            flex 
            items-center 
            gap-2 
            text-white 
            p-2 
            rounded-md 
            hover:bg-slate-500 
            transition-colors 
            duration-200
            cursor-pointer
            ${task.isCompleted && "line-through"}`}
          >
            {task.isCompleted && <CheckIcon />}
            {task.title}
          </button>

          {/* Botão VER DETALHES - atualizado com !important */}
          <Button
            onClick={() => onSeeDetailsClick(task)}
            className="hover:!bg-green-500 hover:scale-110"
          >
            <ChevronRightIcon />
          </Button>

          {/* Botão EXCLUIR - atualizado com !important */}
          <Button
            onClick={() => onDeleteTaskClick(task.id)}
            className="hover:!bg-red-500 hover:scale-110"
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
