const BASE = "http://localhost:9876";

export const api = async (
    url,
    method = "GET",
    body = null,
    token = null
) => {
    const headers = {};

    if(body)
    {
        headers["Content-Type"] = "application/json";
    }

    if(token)
    {
        headers["Authorization"] = "Bearer " + token;
    }

    const res = await fetch(BASE + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    return res.json();
};