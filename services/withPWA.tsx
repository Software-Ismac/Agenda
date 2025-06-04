import path from "path";
import fs from "fs/promises";
import download from "image-downloader";
export const downloadImage = async (uri: string, fileName: string) => {
  await download.image({ url: uri, dest: fileName });
};
export const withPWA = async (name: string, img: string, Opt?: any) => {
  const withs = ["16", "32", "152", "167", "180", "192", "384", "512"];
  const withsTauri = [32, 128, 256];
  withsTauri.forEach(async (x) => {
    await downloadImage(
      `https://wsrv.nl/wsrv.nl/?url=${img}&output=webp&w=${x}&h=${x}&q=80`,
      path.join(__dirname, `../../../src-tauri/icons/logo${x}.png`)
    );
  });
  withs.forEach(async (x) => {
    await downloadImage(
      `https://wsrv.nl/wsrv.nl/?url=${img}&output=webp&w=${x}&h=${x}&q=80`,
      path.join(__dirname, `../../../public/icons/logo${x}.webp`)
    );
    await downloadImage(
      `https://wsrv.nl/wsrv.nl/?url=${img}&output=png&w=${x}&h=${x}&q=80`,
      path.join(__dirname, `../../../public/icons/logo${x}.png`)
    );
  });

  const data = {
    name,
    short_name: name,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#181811",
    background_color: "#181811",
    description: "This app is util for business manager",
    icons: [
      {
        src: "/icons/logo192.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable any",
      },
      {
        src: "/icons/logo384.webp",
        sizes: "384x384",
        type: "image/webp",
        purpose: "maskable any",
      },
      {
        src: "/icons/logo512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable any",
      },
    ],
  };
  await fs.writeFile(
    path.join(__dirname, "../../../public/manifest.json"),
    JSON.stringify(data)
  );
};
export default withPWA;
