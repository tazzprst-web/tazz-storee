const adminPhone = "+6285709518077"; // gunakan format internasional untuk wa.me
function parseSelect(sel){
  const v = sel.value;
  if(!v) return null;
  const parts = v.split("|");
  return {price: parts[0], label: parts[1]};
}

function buildOrder(){
  const chosen = [];
  const selects = [
    document.getElementById("am-select"),
    document.getElementById("cc-select"),
    document.getElementById("wk-select"),
    document.getElementById("nf-select")
  ];
  let total = 0;
  selects.forEach(s=>{
    const p = parseSelect(s);
    if(p){
      total += Number(p.price);
      chosen.push(p.label + " — Rp " + Number(p.price).toLocaleString('id-ID'));
    }
  });
  const name = document.getElementById("buyer-name").value.trim();
  const email = document.getElementById("buyer-email").value.trim();
  const note = document.getElementById("buyer-note").value.trim();

  return {chosen, total, name, email, note};
}

function renderSummary(obj){
  const el = document.getElementById("summary-content");
  if(obj.chosen.length===0){
    el.innerHTML = "<em>Belum ada paket yang dipilih.</em>";
  } else {
    el.innerHTML = "<strong>Paket dipilih:</strong><br>" + obj.chosen.map(x=>"• "+x).join("<br>") +
      "<br><br><strong>Total:</strong> Rp " + obj.total.toLocaleString('id-ID');
  }
  el.innerHTML += "<br><br><strong>Nama:</strong> " + (obj.name||"-") +
                  "<br><strong>Email:</strong> " + (obj.email||"-") +
                  "<br><strong>Catatan:</strong> " + (obj.note||"-") +
                  "<br><br><small>Setelah kirim, admin akan menghubungi Anda via WhatsApp untuk konfirmasi & instruksi pembayaran.</small>";
}

document.getElementById("btn-preview").addEventListener("click", ()=>{
  const order = buildOrder();
  renderSummary(order);
  document.getElementById("card-summary").style.display = "block";
  window.scrollTo({top:document.getElementById("card-summary").offsetTop - 80, behavior:'smooth'});
});

function makeWhatsAppMessage(order){
  let lines = [];
  lines.push("Pesanan Tazz Store:");
  if(order.chosen.length===0) lines.push("- (tidak ada paket dipilih)");
  else order.chosen.forEach(c=>lines.push("- "+c));
  lines.push("Total: Rp " + order.total.toLocaleString('id-ID'));
  lines.push("Nama: " + (order.name||"-"));
  lines.push("Email: " + (order.email||"-"));
  lines.push("Catatan: " + (order.note||"-"));
  lines.push("");
  lines.push("Metode bayar: Dana -> 085709518077");
  lines.push("");
  lines.push("Mohon konfirmasi. Terima kasih.");
  // encode for URL
  return encodeURIComponent(lines.join("\n"));
}

document.getElementById("btn-send-wa").addEventListener("click", ()=>{
  const order = buildOrder();
  // simple validation
  if(order.chosen.length===0){
    alert("Pilih minimal 1 paket sebelum mengirim pesanan.");
    return;
  }
  if(!order.name || !order.email){
    if(!confirm("Nama atau email belum diisi. Lanjut kirim tanpa informasi ini?")) return;
  }
  const msg = makeWhatsAppMessage(order);
  const url = "https://wa.me/" + adminPhone.replace(/^\+|[^0-9]/g,'') + "?text=" + msg;
  window.open(url, "_blank");
});

// second send button in summary
document.getElementById("btn-send-wa-2").addEventListener("click", ()=>{
  document.getElementById("btn-send-wa").click();
});

// copy summary text
document.getElementById("btn-copy").addEventListener("click", ()=>{
  const order = buildOrder();
  const text = decodeURIComponent(makeWhatsAppMessage(order)).replace(/\n/g,"\r\n");
  navigator.clipboard.writeText(text).then(()=> alert("Ringkasan pesanan disalin ke clipboard."), ()=> alert("Gagal menyalin."));
});

// basic WA open for top link
document.querySelectorAll(".wa-link").forEach(a=>{
  a.addEventListener("click", (e)=>{ /* nothing extra */});
});