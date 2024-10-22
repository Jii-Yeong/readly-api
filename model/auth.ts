export type SignUpRequest = {
  email: string
  profile_image: string
  nickname: string
}

export type GoogleUserInfoType = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
}