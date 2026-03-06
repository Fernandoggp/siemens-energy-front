import { axiosInstance } from "@/lib/axios";

// --- Interfaces ---

export interface ApiResponse<T> {
    success: boolean;
    messages: string[];
    data: T;
}

export interface Livro {
    id: string;
    name: string;
    autorId: string;
    generoId: string;
}

export interface CreateLivroDto {
    name: string;
    autorId: string;
    generoId: string;
}

export interface UpdateLivroDto {
    id: string;
    name: string;
    autorId: string;
    generoId: string;
}

export interface LivroFilters {
    livroId?: string;
    autorId?: string;
    generoId?: string;
}

export async function getLivros(): Promise<ApiResponse<Livro[]>> {
    const response = await axiosInstance.get(`/livro/list-livros`);
    return response.data;
}

export async function getFilteredLivros(
    filters: LivroFilters
): Promise<ApiResponse<Livro[]>> {
    const response = await axiosInstance.get(`/livro/filtered-livros`, {
        params: filters,
    });
    return response.data;
}

export async function createLivro(
    livro: CreateLivroDto
): Promise<ApiResponse<Livro>> {
    const response = await axiosInstance.post(`/livro/create-livro`, livro);
    return response.data;
}

export async function updateLivro(
    livro: UpdateLivroDto
): Promise<ApiResponse<Livro>> {
    const response = await axiosInstance.put(`/livro/update-livro`, livro);
    return response.data;
}

export async function deleteLivro(
    id: string
): Promise<ApiResponse<boolean>> {
    const response = await axiosInstance.delete(`/livro/delete-livro/${id}`);
    return response.data;
}