function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
}

// Check if the user is authenticated
if (!isAuthenticated()) {
    window.location.href = './signin.html' ;
}

const logout = () => {
    localStorage.removeItem('user');
}