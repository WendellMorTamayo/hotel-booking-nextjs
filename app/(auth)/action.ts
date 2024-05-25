import axios from "axios";

export type RegisterProps = {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export const registerUser = async (user: RegisterProps) => {
  try {
    console.log("Register user", user);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        username: user.username,
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    );

    console.log("Response: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);

    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
      throw new Error(error.response.data.message || "Failed to register user");
    } else {
      throw new Error("Failed to register user");
    }
  }
};
