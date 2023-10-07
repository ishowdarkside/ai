export async function convertByte(selectedBackground, setBackgroundByte) {
  const response = await fetch(`http://127.0.0.1:3000/${selectedBackground}`);
  const blob = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => {
    setBackgroundByte(reader.result);
  };
}
