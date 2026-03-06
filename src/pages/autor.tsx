import { useState } from "react";
import { useAutores } from "@/hooks/useAutores";
import { toast } from "react-toastify";

export function Autores() {
  const { autores, createAutor, updateAutor, deleteAutor } = useAutores();
  const [newAutorName, setNewAutorName] = useState("");
  const [editingAutorId, setEditingAutorId] = useState<string | null>(null);
  const [editingAutorName, setEditingAutorName] = useState("");

  const handleCreateAutor = async () => {
    if (!newAutorName.trim()) return;

    try {
      await createAutor.mutateAsync({ name: newAutorName });
      setNewAutorName("");
      toast.success("Autor criado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar autor.");
    }
  };

  const startEditing = (id: string, name: string) => {
    setEditingAutorId(id);
    setEditingAutorName(name);
  };

  const cancelEditing = () => {
    setEditingAutorId(null);
    setEditingAutorName("");
  };

  const handleUpdateAutor = async (id: string) => {
    if (!editingAutorName.trim()) return;

    try {
      await updateAutor.mutateAsync({ id, name: editingAutorName });
      setEditingAutorId(null);
      setEditingAutorName("");
      toast.success("Autor atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar autor.");
    }
  };

  const handleDeleteAutor = async (id: string) => {
    try {
      await deleteAutor.mutateAsync(id);
      toast.success("Autor deletado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar autor.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Autores</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome do autor"
          value={newAutorName}
          onChange={(e) => setNewAutorName(e.target.value)}
        />
        <button onClick={handleCreateAutor} disabled={createAutor.isPending}>
          {createAutor.isPending ? "Criando..." : "Criar Autor"}
        </button>
      </div>

      <ul>
        {autores?.map((autor) => (
          <li key={autor.id} style={{ marginBottom: "10px" }}>
            {editingAutorId === autor.id ? (
              <>
                <input
                  type="text"
                  value={editingAutorName}
                  onChange={(e) => setEditingAutorName(e.target.value)}
                />
                <button
                  onClick={() => handleUpdateAutor(autor.id)}
                  disabled={updateAutor.isPending}
                >
                  {updateAutor.isPending ? "Salvando..." : "Salvar"}
                </button>
                <button onClick={cancelEditing}>Cancelar</button>
              </>
            ) : (
              <>
                {autor.name}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => startEditing(autor.id, autor.name)}
                >
                  Editar
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleDeleteAutor(autor.id)}
                  disabled={deleteAutor.isPending}
                >
                  {deleteAutor.isPending ? "Deletando..." : "Deletar"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}