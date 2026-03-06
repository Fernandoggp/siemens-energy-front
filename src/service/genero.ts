import { axiosInstance } from "@/lib/axios";

export interface ApiResponse<T> {
    success: boolean;
    messages: string[];
    data: T;
}

export interface Genero {
    id: string;
    name: string;
}

export interface CreateGeneroDto {
    name: string;
}

export interface UpdateGeneroDto {
    id: string;
    name: string;
}

export async function getGeneros(): Promise<ApiResponse<Genero[]>> {
    const response = await axiosInstance.get(`/genero/list-generos`);
    return response.data;
}

export async function createGenero(
    genero: CreateGeneroDto
): Promise<ApiResponse<Genero>> {
    const response = await axiosInstance.post(`/genero/create-genero`, genero);
    return response.data;
}

export async function updateGenero(
    genero: UpdateGeneroDto
): Promise<ApiResponse<Genero>> {
    const response = await axiosInstance.put(`/genero/update-genero`, genero);
    return response.data;
}

export async function deleteGenero(
    id: string
): Promise<ApiResponse<boolean>> {
    const response = await axiosInstance.delete(`/genero/delete-genero/${id}`);
    return response.data;
}