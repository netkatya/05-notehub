import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api/docs";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    results: Note[];
    totalPages: number;
}

export const fetchMovies = async (query: string, page = 1): Promise<FetchNotesResponse> => {
    const config = {
        params: { query, page },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }
    const response = await axios.get<FetchNotesResponse>(BASE_URL, config);
    return response.data;
}