function switchColorTheme() {
  let theme = localStorage.getItem("theme") || "light";
  document.body.setAttribute(theme, "");
  document.querySelector(".color-switcher").addEventListener("click", () => {
    if (document.body.hasAttribute("light")) {
      document.body.removeAttribute("light");
      localStorage.setItem("theme", "dark");
      document.body.setAttribute("dark", "");
    } else {
      document.body.removeAttribute("dark");
      localStorage.setItem("theme", "light");
      document.body.setAttribute("light", "");
    }
  });
}

export default switchColorTheme;
