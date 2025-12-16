import { X } from "lucide-react";
import { useState } from "react";

function TaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Função global para abrir o modal (pode ser chamada de qualquer lugar)
  const openModal = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  // Exporta a função globalmente
  if (typeof window !== "undefined") {
    window.openTaskModal = openModal;
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeModal} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Detalhes da Tarefa
            </h3>
            <button
              onClick={closeModal}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Título</p>
              <p className="text-gray-800 font-medium">
                {selectedTask?.title || "Sem título"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Descrição</p>
              <p className="text-gray-600 whitespace-pre-wrap">
                {selectedTask?.description || "Sem descrição"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskModal;
