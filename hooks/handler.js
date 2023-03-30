const getData = async (url, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(url, requestOptions);
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }

  if (!res.ok) {
    return null;
  }
};

export { getData };
