import { GoogleUserInfoType } from "../model/auth"

export const getGoogleUserInfo = async (accessToken: string): Promise<GoogleUserInfoType> => {
  const userInfo = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return userInfo.json()
}