import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { revalidatePath } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { accessToken } = req.body;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("response:: " + response.status);
      if (response.status === 200) {
        res.status(200).json({ message: "Logout successful" });
      } else {
        res.status(response.status).json({ message: "Logout failed" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
