const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  let jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse};
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response2 = await fetch(baseURL + `product/${id}`);
  const data2 = await convertToJson(response2);
  return data2.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(user) {
  
  console.log(baseURL);
  try {
    const response = await fetch(baseURL + "login");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    console.log(response);
    

  return response.json();
  } catch(err) {
    console.log(err);
  }
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}