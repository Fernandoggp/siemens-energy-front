import { axiosInstance } from "@/lib/axios";

export interface ApiResponse<T> {
    success: boolean;
    messages: string[];
    data: T;
}

export interface Autor {
    id: string;
    name: string;
}

export interface CreateAutorDto {
    name: string;
}

export interface UpdateAutorDto {
    id: string;
    name: string;
}

export async function getAutores(): Promise<ApiResponse<Autor[]>> {
    const response = await axiosInstance.get(`/autor/list-autores`);
    return response.data;
}

export async function createAutor(
    autor: CreateAutorDto
): Promise<ApiResponse<Autor>> {
    const response = await axiosInstance.post(`/autor/create-autor`, autor);

    return response.data;
}

export async function updateAutor(
    autor: UpdateAutorDto
): Promise<ApiResponse<Autor>> {
    const response = await axiosInstance.put(`/autor/update-autor`, autor);

    return response.data;
}

export async function deleteAutor(
    id: string
): Promise<ApiResponse<boolean>> {
    const response = await axiosInstance.delete(`/autor/delete-autor/${id}`);

    return response.data;
}