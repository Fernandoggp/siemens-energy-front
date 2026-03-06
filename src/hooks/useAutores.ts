import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAutores, createAutor, updateAutor, deleteAutor } from "@/service/autor";

export function useAutores() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["autores"],
        queryFn: getAutores,
    });

    const createAutorMutation = useMutation({
        mutationFn: createAutor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    const updateAutorMutation = useMutation({
        mutationFn: updateAutor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    const deleteAutorMutation = useMutation({
        mutationFn: deleteAutor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["autores"] }),
    });

    return {
        autores: data,
        createAutor: createAutorMutation,
        updateAutor: updateAutorMutation,
        deleteAutor: deleteAutorMutation,
    };
}