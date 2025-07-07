
document.getElementById('flashBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('binFile');
  if (!fileInput.files.length) {
    alert("Seleziona un file .bin prima di flashare.");
    return;
  }

  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 115200 });

  const writer = port.writable.getWriter();
  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const chunkSize = 1024;

  for (let i = 0; i < arrayBuffer.byteLength; i += chunkSize) {
    const chunk = arrayBuffer.slice(i, i + chunkSize);
    await writer.write(new Uint8Array(chunk));
  }

  writer.releaseLock();
  await port.close();
  alert("Flash completato!");
});
