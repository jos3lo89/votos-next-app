export const openPopup = (
  url: string,
  title: string,
  width: number,
  height: number
) => {
  const screenLeft = window.screenLeft || window.screenX;
  const screenTop = window.screenTop || window.screenY;
  const innerWidth = window.innerWidth || document.documentElement.clientWidth;
  const innerHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const left = screenLeft + (innerWidth - width) / 2;
  const top = screenTop + (innerHeight - height) / 2;

  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no`;

  const popupWindow = window.open(url, title, windowFeatures);

  return popupWindow;
};

// // doc.save(`${title}.pdf`);
// const blob = doc.output("blob");
// const url = URL.createObjectURL(blob);
// // window.open(url, "_blank");

// const link = document.createElement("a");
// link.href = url;
// link.download = `${title}.pdf`;
// link.click();

// URL.revokeObjectURL(url);
