document.addEventListener("DOMContentLoaded", () => {
  const moodList = document.getElementById("mood-list");
  const songList = document.getElementById("song-list");
  const themeToggle = document.getElementById("theme-toggle");
  const modeLabel = document.getElementById("mode-label");

  const updateEmoji = mode => modeLabel.textContent = mode === "light" ? "☀️" : "🌙";

  const stored = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light-mode", stored === "light");
  themeToggle.checked = stored === "light";
  updateEmoji(stored);

  themeToggle.addEventListener("change", () => {
    const mode = themeToggle.checked ? "light" : "dark";
    document.body.classList.toggle("light-mode", mode === "light");
    localStorage.setItem("theme", mode);
    updateEmoji(mode);
  });

  Object.entries(moods).forEach(([key, m]) => {
    const btn = document.createElement("button");
    btn.className = "mood-btn";
    btn.style.backgroundColor = m.color;
    btn.innerHTML = `<span>${m.emoji}</span> ${key.replace(/_/g, ' ').replace(/\b\w/g, l=>l.toUpperCase())}`;
    btn.onclick = () => {
      songList.innerHTML = `<li><a class="song-link" href="${m.playlist}" target="_blank">Open “${key.replace(/_/g,' ')}” Playlist in Spotify</a></li>`;
    };
    moodList.appendChild(btn);
  });
});
