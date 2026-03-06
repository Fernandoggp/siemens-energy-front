import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAutores, createAutor, updateAutor, deleteAutor } from "@/service/autor";

export function useAutores() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["autores"],
        queryFn: () => getAutores(),
    });

    const createAutorMutation = useMutation({
        mutationFn: (autor: { name: string }) => createAutor(autor),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    const updateAutorMutation = useMutation({
        mutationFn: (autor: { id: string; name: string }) => updateAutor(autor),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    const deleteAutorMutation = useMutation({
        mutationFn: (id: string) => deleteAutor(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    return {
        autores: data?.data,
        createAutor: createAutorMutation,
        updateAutor: updateAutorMutation,
        deleteAutor: deleteAutorMutation,
    };
}