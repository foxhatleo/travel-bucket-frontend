import axios from "axios";

const serverURL = /*'https://travelbucket4300.herokuapp.com/';*/process.env.NODE_ENV === 'production' ? 'https://travelbucket4300.herokuapp.com/' : "http://0.0.0.0:5000";

export const fetchResults = async (searchCity: string, searchTopics: string) => {
    const result = await axios(
        `${serverURL}/search?city=${encodeURIComponent(searchCity)}&topics=${encodeURIComponent(searchTopics)}`,
    );
    return result.data;
}