import { X, CheckCircle, Circle } from "lucide-react";
import { useState, useEffect } from "react";

function TaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsCompleted(task?.completed || false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
    setIsCompleted(false);
  };

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    if (selectedTask) {
      setSelectedTask({
        ...selectedTask,
        completed: !isCompleted,
      });
      console.log(
        `Tarefa ${selectedTask.title} marcada como ${
          !isCompleted ? "concluída" : "pendente"
        }`
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.openTaskModal = openModal;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={closeModal} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Detalhes da Tarefa
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/20 rounded-full"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                ) : (
                  <Circle className="h-8 w-8 text-gray-400" />
                )}
                <span
                  className={`text-lg font-semibold ${
                    isCompleted ? "text-emerald-600" : "text-gray-600"
                  }`}
                >
                  {isCompleted ? "Concluída" : "Pendente"}
                </span>
              </div>
              <button
                onClick={toggleCompletion}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isCompleted
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {isCompleted ? "Marcar como Pendente" : "Marcar como Concluída"}
              </button>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div>
                  <h3 className="text-emerald-600 font-bold text-2xl">
                    Título da tarefa
                  </h3>
                </div>
              </div>
              <p className="text-2xl text-gray-800 pl-0 font-normal">
                {selectedTask?.title || "Sem título"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div>
                  <h3 className="text-blue-600 font-bold text-2xl">
                    Descrição da tarefa
                  </h3>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedTask?.description || "Sem descrição"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <button
              onClick={closeModal}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
            >
              ✓ Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskModal;
