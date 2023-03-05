export const fetchHandler = async (url, method = "GET") => {
    try {
        const res =  await fetch(url, { 
                method,
                headers: {
                    "Access-Control-Allow-Origin" : "*", 
                    "Content-Type": "application/json" 
                }
            }
        );

        return await res.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const slugify = string => {
    return string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};