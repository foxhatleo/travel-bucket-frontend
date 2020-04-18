import axios from "axios";

const serverURL = "http://localhost:5000";

export const fetchResults = async (searchCity: string) => {
    const result = await axios(
        `${serverURL}/search?city=${encodeURIComponent(searchCity)}`,
    );
    return result.data;
}