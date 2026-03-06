import { useState } from "react";
import { useAutores } from "@/hooks/useAutores";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

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
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1 style={{ marginBottom: "20px" }}>Autores</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome do autor"
          value={newAutorName}
          onChange={(e) => setNewAutorName(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
        />

        <Button onClick={handleCreateAutor} disabled={createAutor.isPending}>
          {createAutor.isPending ? "Criando..." : "Criar Autor"}
        </Button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {autores?.map((autor) => (
          <li
            key={autor.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              background: "#111827",
              borderRadius: "6px",
            }}
          >
            {editingAutorId === autor.id ? (
              <>
                <input
                  type="text"
                  value={editingAutorName}
                  onChange={(e) => setEditingAutorName(e.target.value)}
                  style={{ padding: "6px", marginRight: "10px" }}
                />

                <div style={{ display: "flex", gap: "6px" }}>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateAutor(autor.id)}
                    disabled={updateAutor.isPending}
                  >
                    {updateAutor.isPending ? "Salvando..." : "Salvar"}
                  </Button>

                  <Button variant="outline" size="sm" onClick={cancelEditing}>
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>{autor.name}</span>

                <div style={{ display: "flex", gap: "6px" }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => startEditing(autor.id, autor.name)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteAutor(autor.id)}
                    disabled={deleteAutor.isPending}
                  >
                    {deleteAutor.isPending ? "Deletando..." : "Deletar"}
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}