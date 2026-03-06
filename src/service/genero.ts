import { axiosInstance } from "@/lib/axios";

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

export async function getGeneros(): Promise<Genero[]> {
    const response = await axiosInstance.get(`/genero/list-generos`);
    return response.data.data;
}

export async function createGenero(
    genero: CreateGeneroDto
): Promise<Genero> {
    const response = await axiosInstance.post(`/genero/create-genero`, genero);
    return response.data.data;
}

export async function updateGenero(
    genero: UpdateGeneroDto
): Promise<Genero> {
    const response = await axiosInstance.put(`/genero/update-genero`, genero);
    return response.data.data;
}

export async function deleteGenero(
    id: string
): Promise<boolean> {
    const response = await axiosInstance.delete(`/genero/delete-genero/${id}`);
    return response.data.data;
}