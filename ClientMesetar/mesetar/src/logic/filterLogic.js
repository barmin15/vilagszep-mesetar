//this function returns the filter type and value from the path, before the search element
export const getFilterFromPath = (path) => {
    const decodedPath = { field: "", filter: "" };
    let isAfterSearch = false;
    let isAfterField = false;

    for (let i = path.length - 1; i >= 0; i--) {

        if(!isAfterSearch){
            if(path[i] === "/"){
                isAfterSearch = true;
                continue;
            } else continue;
        }

        if (isAfterSearch) {
            if(path[i] === "="){
                isAfterField = true;
                continue;
            }

            if(path[i] === "/") break;
            if (isAfterField) {
                decodedPath.field += path[i];
                continue;
            } else {
                decodedPath.filter += path[i];
                continue;
            }
        }

    }

    decodedPath.filter = decodedPath.filter.split("").reverse().join("");
    decodedPath.field = decodedPath.field.split("").reverse().join("");
    return decodedPath;
}


//this function return the last elements from path untill the '=' element, in the code it is used for the publicID
export const getPublicIdFromPath = (path) => {
    let publicId = "";

    for (let i = path.length - 1; i >= 0; i--) {
        if (path[i] === "=") break;
        publicId += path[i];
    }

    return publicId.split("").reverse().join("");
}

//this function return the last elements from path untill the '/' elment, used for the search from NavBar
export const getSearchFromPath = (path) => {
    let search = "";

    for (let i = path.length - 1; i >= 0; i--) {
        if (path[i] === "/") break;
        search += path[i];
    }

    return search.split("").reverse().join("");
}