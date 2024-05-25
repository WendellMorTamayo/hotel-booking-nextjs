/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { refreshToken } = req.body as { refreshToken: string };

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh_token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(401).json({ message: "Token refresh failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
