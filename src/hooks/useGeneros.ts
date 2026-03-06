import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero,
    CreateGeneroDto,
    UpdateGeneroDto,
} from "@/service/genero";

export function useGeneros() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["generos"],
        queryFn: () => getGeneros(),
    });

    const createGeneroMutation = useMutation({
        mutationFn: (genero: CreateGeneroDto) => createGenero(genero),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["generos"] });
        },
    });

    const updateGeneroMutation = useMutation({
        mutationFn: (genero: UpdateGeneroDto) => updateGenero(genero),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["generos"] });
        },
    });

    const deleteGeneroMutation = useMutation({
        mutationFn: (id: string) => deleteGenero(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["generos"] });
        },
    });

    return {
        generos: data,
        isLoading,
        isError,
        createGenero: createGeneroMutation,
        updateGenero: updateGeneroMutation,
        deleteGenero: deleteGeneroMutation,
    };
}