function generateQRCode() {
  // Mengambil data dari input
  const inputData1 = document.getElementById("inputData1").value.trim();
  const inputData2 = document.getElementById("inputData2").value.trim();
  const inputData3 = document.getElementById("inputData3").value.trim();
  const companyName = "RSU Santo Yusup Boro";
  // const companyName = document.getElementById("companyName").value.trim();

  // Gabungkan semua data menjadi satu string, dengan label untuk masing-masing input
  let combinedData = "";
  if (inputData1) combinedData += "Nama: " + inputData1;
  if (inputData2)
    combinedData += (combinedData ? ", " : "") + "Kode: " + inputData2;
  if (inputData3)
    combinedData += (combinedData ? ", " : "") + "Data Tambahan: " + inputData3;

  // Pastikan ada data yang digabungkan
  if (combinedData) {
    // Pastikan elemen #qrCode adalah elemen canvas
    const canvasElement = document.getElementById("qrCode");
    const ctx = canvasElement.getContext("2d");

    // Kosongkan canvas sebelum menggambar QR code
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear previous QR code

    // Menentukan ukuran canvas agar cocok dengan QR code
    const qrSize = 512;
    canvasElement.width = qrSize;
    canvasElement.height = qrSize;

    // Menghasilkan QR code pada canvas
    QRCode.toCanvas(
      canvasElement,
      combinedData,
      { width: qrSize },
      function (error) {
        if (error) {
          console.error(error);
        } else {
          // Menambahkan logo ke tengah QR code
          const logo = new Image();
          logo.src = "logo.png"; // Ganti dengan URL logo perusahaan Anda

          // Setelah logo selesai dimuat, gambar logo di atas QR code
          logo.onload = function () {
            // Ukuran logo (menyesuaikan ukuran QR code)
            const logoSize = qrSize / 4; // Ukuran logo 1/4 dari ukuran QR code
            const logoX = (qrSize - logoSize) / 2; // Posisi X untuk menempatkan logo di tengah
            const logoY = (qrSize - logoSize) / 2; // Posisi Y untuk menempatkan logo di tengah

            // Gambar logo di atas QR code
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

            // Mengonversi canvas menjadi gambar PNG
            const pngDataUrl = canvasElement.toDataURL("image/png"); // Gunakan PNG agar kualitas lebih baik

            // Menampilkan tombol unduh
            const downloadLink = document.getElementById("downloadLink");
            const downloadBtn = document.getElementById("downloadBtn");
            downloadLink.href = pngDataUrl; // Menetapkan URL gambar PNG untuk unduhan
            downloadLink.download = "qrcode.png";
            downloadLink.style.display = "inline-block"; // Menampilkan tombol unduh
            downloadBtn.disabled = false; // Mengaktifkan tombol unduh
          };
        }
      }
    );

    // Menampilkan nama perusahaan (jika ada) di atas QR code
    const companyNameDiv = document.createElement("div");
    companyNameDiv.innerText = companyName || "RSU SANTO YUSUP BORO";
    companyNameDiv.style.fontWeight = "bold";
    document.getElementById("qrContainer").prepend(companyNameDiv);
  } else {
    alert("Silakan masukkan data untuk membuat QR code.");
  }
}
