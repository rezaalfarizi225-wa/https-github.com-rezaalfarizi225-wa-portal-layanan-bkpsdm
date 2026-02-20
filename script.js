let extractedData = {};

// ============================
// PREVIEW GAMBAR
// ============================

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const prosesBtn = document.getElementById("prosesBtn");
const kirimBtn = document.getElementById("kirimBtn");
const hasilOCR = document.getElementById("hasilOCR");

imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        preview.src = reader.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// ============================
// PROSES OCR
// ============================

prosesBtn.addEventListener("click", async function () {

    const file = imageInput.files[0];
    if (!file) {
        alert("Upload foto struk terlebih dahulu");
        return;
    }

    hasilOCR.innerText = "Memproses... mohon tunggu";

    const result = await Tesseract.recognize(
        file,
        "eng",
        {
            logger: m => console.log(m)
        }
    );

    const text = result.data.text;
    hasilOCR.innerText = text;

    parseText(text);
});

// ============================
// PARSING DATA PENTING
// ============================

function parseText(text) {

    // Normalisasi karakter umum
    text = text.replace(/O/g, "0");
    text = text.replace(/,/g, ".");

    // Ambil tanggal + jam
    const datetime = text.match(/\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}/);

    // Ambil angka desimal kecil (liter)
    const decimalNumbers = text.match(/\d+\.\d+/g);
    let liter = "";
    if (decimalNumbers) {
        liter = decimalNumbers.find(n => parseFloat(n) < 20);
    }

    // Ambil angka ribuan besar (total)
    const ribuan = text.match(/\d{2,3}\.\d{3}/g);
    let total = "";
    if (ribuan) {
        total = ribuan.sort((a, b) =>
            parseInt(b.replace(/\./g, "")) -
            parseInt(a.replace(/\./g, ""))
        )[0];
    }

    // Ambil produk
    const produkMatch = text.match(/Pertalite|Pertamax|Dexlite|Solar/i);

    extractedData = {
        tanggal: datetime ? datetime[0] : "",
        produk: produkMatch ? produkMatch[0] : "",
        liter: liter || "",
        total: total || ""
    };

    console.log("Data Terbaca:", extractedData);
}

// ============================
// KIRIM KE GOOGLE SHEET
// ============================

kirimBtn.addEventListener("click", async function () {

    const nama = document.getElementById("nama").value;
    const nip = document.getElementById("nip").value;

    if (!nama || !nip) {
        alert("Nama dan NIP wajib diisi");
        return;
    }

    const data = {
        nama: nama,
        nip: nip,
        ...extractedData
    };

    // GANTI DENGAN URL GOOGLE APPS SCRIPT
    const url = "ISI_URL_WEB_APP_DISINI";

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });

    alert("Data berhasil dikirim ke bendahara");
});