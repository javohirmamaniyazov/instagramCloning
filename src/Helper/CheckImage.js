export const checkImage = (url, setIsImageExists) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = () => {
    const status = request.status;
    if (status === 200) {
      setIsImageExists(true);
    } else {
      setIsImageExists(false);
    }
  };
};


