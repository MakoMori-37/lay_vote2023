import axios from "axios"

interface RegisterResponse {
  status: "ok" | "error";
  message: string;
  token?: string;
  error?: string;
}

interface RegisterParams {
  fullName: string;
  tel: string;
}

const headers = {
//   'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json'
};

const config = {
  headers: headers
};

const register = async ( data : RegisterParams): Promise<RegisterResponse | null> => {
  try {
    const res = await axios.post(`${process.env.API_BASE}/register`, data, config);
    if (res.data.status !== "ok") {
      return { status: res.data.status, message: res.data.message, error: res.data.error };
    }
    return { status: "ok", message: res.data.message, token: res.data.token };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default register;
