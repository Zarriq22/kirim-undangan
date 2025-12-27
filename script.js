document.getElementById("generatorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const list = document.getElementById("guestList").value.trim();
  const link = document.getElementById("inputLink").value;
  if (!list) return alert("Masukkan daftar tamu dulu bro 😄");

  const lines = list.split("\n").map(l => l.trim()).filter(l => l);
  const resultDiv = document.getElementById("resultList");
  resultDiv.innerHTML = "";

  lines.forEach(line => {
    const [name, rawPhone] = line.split("-").map(v => v.trim());
    if (!name || !rawPhone) return;

    let phone = rawPhone.replace(/[^0-9]/g, ""); // hapus karakter non-digit
    if (phone.startsWith("0")) {
      phone = "62" + phone.substring(1); // ubah 08xx jadi 628xx
    } else if (!phone.startsWith("62")) {
      phone = "62" + phone; // kalau gak ada 0 atau 62 di awal, tambahkan 62
    }

    const encodedName = encodeURIComponent(name);
    const inviteLink = `${link}?to=${encodedName}`;

    const message = `
Kepada Yth.
Bapak/Ibu/Saudara/i
${name}

_____________________

Assalaamualaikum Warahmatullaahi Wabarakaatuh.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

Berikut link undangan kami, untuk info lengkap dari acara, bisa kunjungi:

${inviteLink}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Wassalaamualaikum Warahmatullaahi Wabarakaatuh.

Terima Kasih

Hormat Kami,
Zalza & Azhar
_________________`;

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `
      <span>${name}</span>
      <button style="width: 130px">Kirim WhatsApp</button>
    `;

    const btn = item.querySelector("button");
    btn.addEventListener("click", () => {
      window.open(whatsappURL, "_blank");
      btn.disabled = true;
      btn.textContent = "✅ Terkirim";
      btn.style.background = "#aaa";
    });

    resultDiv.appendChild(item);
  });
});
