import { useState } from "react";
import { useLivros } from "@/hooks/useLivros";
import { useAutores } from "@/hooks/useAutores";
import { useGeneros } from "@/hooks/useGeneros";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function Livros() {
    const [filtros, setFiltros] = useState({ autorId: "", generoId: "" });

    const { livros, createLivro, updateLivro, deleteLivro } = useLivros(filtros);
    const { autores } = useAutores();
    const { generos } = useGeneros();

    const [newName, setNewName] = useState("");
    const [newAutorId, setNewAutorId] = useState("");
    const [newGeneroId, setNewGeneroId] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [editingAutorId, setEditingAutorId] = useState("");
    const [editingGeneroId, setEditingGeneroId] = useState("");

    const handleCreate = async () => {
        if (!newName.trim() || !newAutorId || !newGeneroId) {
            toast.warning("Preencha todos os campos!");
            return;
        }

        try {
            await createLivro.mutateAsync({
                name: newName,
                autorId: newAutorId,
                generoId: newGeneroId,
            });

            setNewName("");
            setNewAutorId("");
            setNewGeneroId("");

            toast.success("Livro criado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao criar livro.");
        }
    };

    const startEditing = (livro: any) => {
        setEditingId(livro.id);
        setEditingName(livro.name);
        setEditingAutorId(livro.autorId);
        setEditingGeneroId(livro.generoId);
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const handleUpdate = async () => {
        if (!editingId || !editingName.trim() || !editingAutorId || !editingGeneroId)
            return;

        try {
            await updateLivro.mutateAsync({
                id: editingId,
                name: editingName,
                autorId: editingAutorId,
                generoId: editingGeneroId,
            });

            setEditingId(null);

            toast.success("Livro atualizado!");
        } catch {
            toast.error("Erro ao atualizar.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteLivro.mutateAsync(id);
            toast.success("Livro excluído!");
        } catch {
            toast.error("Erro ao excluir.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ marginBottom: "20px" }}>Livros</h1>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    alignItems: "center",
                }}
            >
                <input
                    placeholder="Título do livro"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />

                <select
                    value={newAutorId}
                    onChange={(e) => setNewAutorId(e.target.value)}
                    style={{
                        padding: "6px",
                        background: "#fff",
                        color: "#000",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">Autor</option>
                    {autores?.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>

                <select
                    value={newGeneroId}
                    onChange={(e) => setNewGeneroId(e.target.value)}
                    style={{
                        padding: "6px",
                        background: "#fff",
                        color: "#000",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">Gênero</option>
                    {generos?.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <Button onClick={handleCreate} disabled={createLivro.isPending}>
                    {createLivro.isPending ? "Salvando..." : "Adicionar"}
                </Button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <select
                    value={filtros.autorId}
                    onChange={(e) =>
                        setFiltros({ ...filtros, autorId: e.target.value })
                    }
                    style={{
                        padding: "6px",
                        background: "#fff",
                        color: "#000",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">Todos os autores</option>
                    {autores?.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>

                <select
                    value={filtros.generoId}
                    onChange={(e) =>
                        setFiltros({ ...filtros, generoId: e.target.value })
                    }
                    style={{
                        padding: "6px",
                        background: "#fff",
                        color: "#000",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">Todos os gêneros</option>
                    {generos?.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                {(filtros.autorId || filtros.generoId) && (
                    <Button
                        variant="outline"
                        onClick={() => setFiltros({ autorId: "", generoId: "" })}
                    >
                        Limpar filtros
                    </Button>
                )}
            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff",
                    color: "#000",
                }}
            >
                <thead>
                    <tr style={{ background: "#f1f1f1" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                            Título
                        </th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                            Autor
                        </th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                            Gênero
                        </th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                            Ações
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {livros?.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                style={{
                                    textAlign: "center",
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Nenhum livro encontrado.
                            </td>
                        </tr>
                    )}

                    {livros?.map((livro) => (
                        <tr key={livro.id}>
                            {editingId === livro.id ? (
                                <>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        <input
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                        />
                                    </td>

                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        <select
                                            value={editingAutorId}
                                            onChange={(e) => setEditingAutorId(e.target.value)}
                                        >
                                            {autores?.map((a) => (
                                                <option key={a.id} value={a.id}>
                                                    {a.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        <select
                                            value={editingGeneroId}
                                            onChange={(e) => setEditingGeneroId(e.target.value)}
                                        >
                                            {generos?.map((g) => (
                                                <option key={g.id} value={g.id}>
                                                    {g.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            display: "flex",
                                            gap: "8px",
                                        }}
                                    >
                                        <Button size="sm" onClick={handleUpdate}>
                                            Salvar
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={cancelEditing}
                                        >
                                            Cancelar
                                        </Button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        {livro.name}
                                    </td>

                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        {autores?.find((a) => a.id === livro.autorId)?.name || "N/A"}
                                    </td>

                                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                        {generos?.find((g) => g.id === livro.generoId)?.name || "N/A"}
                                    </td>

                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            display: "flex",
                                            gap: "8px",
                                        }}
                                    >
                                        <Button size="sm" onClick={() => startEditing(livro)}>
                                            Editar
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(livro.id)}
                                            disabled={deleteLivro.isPending}
                                        >
                                            {deleteLivro.isPending ? "Excluindo..." : "Excluir"}
                                        </Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}