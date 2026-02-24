/* 
   Dark Mode Toggle Logic 
*/
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const iconSpan = toggleBtn.querySelector(".material-symbols-outlined");
    const body = document.body;

    // Check for saved preference
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark") {
        body.classList.add("dark-mode");
        iconSpan.textContent = "light_mode"; // Switch icon to sun
    }

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        const isDark = body.classList.contains("dark-mode");
        
        // Update Icon
        iconSpan.textContent = isDark ? "light_mode" : "dark_mode";
        
        // Save Preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});
