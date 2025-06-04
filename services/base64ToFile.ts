export function base64ToFile(base64String: any, fileName: string) {
  // Remover el prefijo 'data:image/jpeg;base64,' si está presente
  const base64WithoutPrefix = base64String.split(",")[1] || base64String;
  // Decodificar Base64 a un array de bytes
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  // Crear un ArrayBuffer y una vista Uint8Array
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], fileName, { type: "image/jpeg" });
  return file;
}
