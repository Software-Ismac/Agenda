const result = {
  result: {
    id: "",
    requireSignedURLs: false,
    filename: "",
  },
};

function useUploadImages() {
  const uploadImages = async (files: File[] | undefined) => {
    if (files != undefined) {
      const res = await Promise.all(
        files?.map(async (file) => {
          const form = new FormData();
          //@ts-ignore
          form.append("file", file);
          const uri = `https://upload.llampukaq.com/`;
          const res = await fetch(uri, {
            method: "POST",
            body: form,
            //@ts-ignore
            headers: {
              Authorization: "821623252255455",
            },
          });
          const response: typeof result = await res.json();

          //@ts-ignore
          const src = response?.src;

          const re = {
            id: response.result.id,
            name: response.result.filename,
            src,
            size: file.size,
          };

          return re;
        })
      );
      if (files.length == 1) {
        return res[0];
      } else {
        return res;
      }
    }
  };
  return { uploadImages };
}

export default useUploadImages;
