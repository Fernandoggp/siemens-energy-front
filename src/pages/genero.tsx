import { useState } from "react";
import { useGeneros } from "@/hooks/useGeneros";
import { toast } from "react-toastify";

export function Generos() {
    const { generos, createGenero, updateGenero, deleteGenero } = useGeneros();
    const [newGeneroName, setNewGeneroName] = useState("");
    const [editingGeneroId, setEditingGeneroId] = useState<string | null>(null);
    const [editingGeneroName, setEditingGeneroName] = useState("");

    const handleCreateGenero = async () => {
        if (!newGeneroName.trim()) return;

        try {
            await createGenero.mutateAsync({ name: newGeneroName });
            setNewGeneroName("");
            toast.success("Gênero criado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao criar gênero.");
        }
    };

    const startEditing = (id: string, Name: string) => {
        setEditingGeneroId(id);
        setEditingGeneroName(Name);
    };

    const cancelEditing = () => {
        setEditingGeneroId(null);
        setEditingGeneroName("");
    };

    const handleUpdateGenero = async (id: string) => {
        if (!editingGeneroName.trim()) return;

        try {
            await updateGenero.mutateAsync({ id, name: editingGeneroName });
            setEditingGeneroId(null);
            setEditingGeneroName("");
            toast.success("Gênero atualizado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar gênero.");
        }
    };

    const handleDeleteGenero = async (id: string) => {
        try {
            await deleteGenero.mutateAsync(id);
            toast.success("Gênero deletado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao deletar gênero.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gêneros</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Name do gênero"
                    value={newGeneroName}
                    onChange={(e) => setNewGeneroName(e.target.value)}
                />
                <button onClick={handleCreateGenero} disabled={createGenero.isPending}>
                    {createGenero.isPending ? "Criando..." : "Criar Gênero"}
                </button>
            </div>

            <ul>
                {generos?.map((genero) => (
                    <li key={genero.id} style={{ marginBottom: "10px" }}>
                        {editingGeneroId === genero.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingGeneroName}
                                    onChange={(e) => setEditingGeneroName(e.target.value)}
                                />
                                <button
                                    onClick={() => handleUpdateGenero(genero.id)}
                                    disabled={updateGenero.isPending}
                                >
                                    {updateGenero.isPending ? "Salvando..." : "Salvar"}
                                </button>
                                <button onClick={cancelEditing}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                {genero.name}
                                <button
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => startEditing(genero.id, genero.name)}
                                >
                                    Editar
                                </button>
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => handleDeleteGenero(genero.id)}
                                    disabled={deleteGenero.isPending}
                                >
                                    {deleteGenero.isPending ? "Deletando..." : "Deletar"}
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}