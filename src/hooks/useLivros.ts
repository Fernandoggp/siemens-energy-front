import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getLivros,
    getFilteredLivros,
    createLivro,
    updateLivro,
    deleteLivro,
    CreateLivroDto,
    UpdateLivroDto,
    LivroFilters
} from "@/service/livro";

export function useLivros(filters?: LivroFilters) {

    const queryClient = useQueryClient();

    const { data: todosLivros, isLoading: loadingTodos } = useQuery({
        queryKey: ["livros"],
        queryFn: getLivros,
    });

    const { data: livrosFiltrados, isLoading: loadingFiltro } = useQuery({
        queryKey: ["livros", "filtered", filters],
        queryFn: () => getFilteredLivros(filters!),
        enabled: !!(filters?.livroId || filters?.autorId || filters?.generoId),
    });

    const createLivroMutation = useMutation({
        mutationFn: (livro: CreateLivroDto) => createLivro(livro),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["livros"] });
        },
    });

    const updateLivroMutation = useMutation({
        mutationFn: (livro: UpdateLivroDto) => updateLivro(livro),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["livros"] });
        },
    });

    const deleteLivroMutation = useMutation({
        mutationFn: (id: string) => deleteLivro(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["livros"] });
        },
    });

    const temFiltroAtivo =
        !!(filters?.livroId || filters?.autorId || filters?.generoId);

    const dadosExibicao = temFiltroAtivo
        ? livrosFiltrados
        : todosLivros;

    return {
        livros: dadosExibicao,
        isLoading: loadingTodos || loadingFiltro,
        createLivro: createLivroMutation,
        updateLivro: updateLivroMutation,
        deleteLivro: deleteLivroMutation,
    };
}