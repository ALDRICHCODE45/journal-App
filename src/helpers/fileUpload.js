export const fileUpload = async (file) => {
  if (!file) throw new Error("no hay ningun archivo");

  const cloudURL = "https://api.cloudinary.com/v1_1/dnjtrhvtn/upload";

  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("no se pudo subir imagen");

    const cloudRespond = await resp.json();
    return cloudRespond.secure_url;
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};
