import axios from "axios";

interface StatusData {
    ok: boolean;
    ts: string;
}

export const statusApi = async (): Promise<StatusData | null> => {
    try {
        const response = await axios.get<StatusData>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/healthz`
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.status, error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
        return null;
    }
}
