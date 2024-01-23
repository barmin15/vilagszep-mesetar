//these functions help check, if the created data, can be sent bakc to the server
//the server checks as well, for security reasons. This is here to help the client
export const isValidPassword = (password) => {
    return password !== null && password.length > 0
}

export const isValidRegister = (users, login, password) => {
    const isNotGoodLogin = users.map(user => user.login).includes(login);

    if (!isValidPassword(password)) {
        return [false, "Rövid jelszó"]
    } else if (!isValidPassword(login)) {
        return [false, "Rövid név"]
    } else if (isNotGoodLogin) {
        return [false, "Felhasználónév már használatban van"]
    }
    return [true];
}

export const isValidEditUser = (users, login, password, previousLogin) => {
  
    const isNotGoodLogin = users.map(user => user.login).includes(login);

    if (!isValidPassword(login)) {
        return [false, "Rövid név"]
    } else if (isNotGoodLogin && previousLogin !== login) {
        return [false, "Felhasználónév már használatban van"]
    }else if (!isValidPassword(password)) {
        if(password === null) return [true];
        return [false, "Rövid jelszó"]
    }

    return [true];
}

export const isValidRegisterStory = (story, allTitles) => {
    return checkObjectNulls(story) && !allTitles.includes(story.title)
}

function checkObjectNulls(object) {
    for (const elem in object) {
        if (object[elem] === null) return false;
    }
    return true;
}
