// Inject shared header
document.addEventListener("DOMContentLoaded", () => {
  const headerHTML = `
    <header>
      <div class="logo">Prepare.com</div>
      <nav>
        <a href="#">Myaccount</a>
        <span class="icon">👤</span>
      </nav>
    </header>
  `;
  document.getElementById("header").innerHTML = headerHTML;
});
