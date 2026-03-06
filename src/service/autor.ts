import { axiosInstance } from "@/lib/axios";

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

export async function getAutores(): Promise<Autor[]> {
    const response = await axiosInstance.get(`/autor/list-autores`);
    return response.data.data;
}

export async function createAutor(
    autor: CreateAutorDto
): Promise<Autor> {
    const response = await axiosInstance.post(`/autor/create-autor`, autor);
    return response.data.data;
}

export async function updateAutor(
    autor: UpdateAutorDto
): Promise<Autor> {
    const response = await axiosInstance.put(`/autor/update-autor`, autor);
    return response.data.data;
}

export async function deleteAutor(
    id: string
): Promise<boolean> {
    const response = await axiosInstance.delete(`/autor/delete-autor/${id}`);
    return response.data.data;
}