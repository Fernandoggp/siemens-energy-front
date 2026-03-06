import { useState } from "react";
import { useLivros } from "@/hooks/useLivros";
import { useAutores } from "@/hooks/useAutores";
import { useGeneros } from "@/hooks/useGeneros";
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

    const handleUpdate = async () => {
        if (!editingId || !editingName.trim() || !editingAutorId || !editingGeneroId) return;

        try {
            await updateLivro.mutateAsync({
                id: editingId,
                name: editingName,
                autorId: editingAutorId,
                generoId: editingGeneroId,
            });
            setEditingId(null);
            toast.success("Livro atualizado!");
        } catch (error: any) {
            toast.error("Erro ao atualizar.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gerenciamento de Livros</h1>

            <fieldset style={{ marginBottom: "20px", padding: "15px" }}>
                <legend>Novo Livro</legend>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                        placeholder="Título do livro"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <select value={newAutorId} onChange={(e) => setNewAutorId(e.target.value)}>
                        <option value="">Autor</option>
                        {autores?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                    <select value={newGeneroId} onChange={(e) => setNewGeneroId(e.target.value)}>
                        <option value="">Gênero</option>
                        {generos?.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                    <button onClick={handleCreate} disabled={createLivro.isPending}>
                        {createLivro.isPending ? "Salvando..." : "Adicionar"}
                    </button>
                </div>
            </fieldset>

            <div style={{ backgroundColor: "#f4f4f4", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
                <strong>Filtrar Lista:</strong>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <select
                        value={filtros.autorId}
                        onChange={(e) => setFiltros({ ...filtros, autorId: e.target.value })}
                    >
                        <option value="">Todos os Autores</option>
                        {autores?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>

                    <select
                        value={filtros.generoId}
                        onChange={(e) => setFiltros({ ...filtros, generoId: e.target.value })}
                    >
                        <option value="">Todos os Gêneros</option>
                        {generos?.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>

                    {(filtros.autorId || filtros.generoId) && (
                        <button onClick={() => setFiltros({ autorId: "", generoId: "" })}>Limpar Filtros</button>
                    )}
                </div>
            </div>

            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#eee" }}>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Gênero</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros?.length === 0 && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>Nenhum livro encontrado.</td>
                        </tr>
                    )}
                    {livros?.map((livro) => (
                        <tr key={livro.id}>
                            {editingId === livro.id ? (
                                <>
                                    <td><input value={editingName} onChange={(e) => setEditingName(e.target.value)} /></td>
                                    <td>
                                        <select value={editingAutorId} onChange={(e) => setEditingAutorId(e.target.value)}>
                                            {autores?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <select value={editingGeneroId} onChange={(e) => setEditingGeneroId(e.target.value)}>
                                            {generos?.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Salvar</button>
                                        <button onClick={() => setEditingId(null)}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{livro.name}</td>
                                    <td>{autores?.find(a => a.id === livro.autorId)?.name || "N/A"}</td>
                                    <td>{generos?.find(g => g.id === livro.generoId)?.name || "N/A"}</td>
                                    <td>
                                        <button onClick={() => startEditing(livro)}>Editar</button>
                                        <button onClick={() => deleteLivro.mutate(livro.id)} disabled={deleteLivro.isPending}>
                                            {deleteLivro.isPending ? "Excluindo..." : "Excluir"}
                                        </button>
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