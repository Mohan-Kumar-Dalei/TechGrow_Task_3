function getUserPreference() {
    return localStorage.getItem("theme") || "system";
}
function saveUserPreference(userPreference) {
    localStorage.setItem("theme", userPreference);
}

function getAppliedMode(userPreference) {
    if (userPreference === "light") {
        return "dark";
    }
    if (userPreference === "dark") {
        return "light";
    }
    // system
    if (matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
    }
    return "dark";
}

function setAppliedMode(mode) {
    document.documentElement.dataset.appliedMode = mode;
}

function rotatePreferences(userPreference) {
    if (userPreference === "system") {
        return "light";
    }
    if (userPreference === "light") {
        return "dark";
    }
    if (userPreference === "dark") {
        return "system";
    }
    // for invalid values, just in case
    return "system";
}

const themeDisplay = document.getElementById("mode");
const themeToggler = document.getElementById("mode");

// Mimic heavy load done by other JS scripts
setTimeout(() => {
    let userPreference = getUserPreference();
    setAppliedMode(getAppliedMode(userPreference));
    themeDisplay.innerText = userPreference;

    themeToggler.onclick = () => {
        const newUserPref = rotatePreferences(userPreference);
        userPreference = newUserPref;
        saveUserPreference(newUserPref);
        themeDisplay.innerText = newUserPref;
        setAppliedMode(getAppliedMode(newUserPref));
    };
}, 0.5000);
