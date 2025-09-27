function kirimAlight() {
  let harga = document.getElementById("harga-alight").value;
  let email = document.getElementById("email-alight").value;
  let password = document.getElementById("password-alight").value;

  let pesan = `📱 Pesanan Alight Motion
Harga: Rp ${harga}
Email: ${email}
Password: ${password}`;

  window.open(`https://wa.me/6285709518077?text=${encodeURIComponent(pesan)}`, "_blank");
}

function kirimML() {
  let rank = document.getElementById("rank-ml").value;
  let metode = document.getElementById("login-ml").value;
  let email = document.getElementById("email-ml").value;
  let password = document.getElementById("password-ml").value;

  let pesan = `🎮 Pesanan Joki Mobile Legends
Rank: Rp ${rank}
Login Via: ${metode}
Email: ${email}
Password: ${password}`;

  window.open(`https://wa.me/6285709518077?text=${encodeURIComponent(pesan)}`, "_blank");
}