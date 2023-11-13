interface IJWTTokenResponse{
  "access_token": string,
  "refresh_token": string,
  "scope": string,
  "id_token": string
  "token_type": string,
  "expires_in": number
}

interface IUserRegistrationDTO{
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string
}

interface IUserDTO{
  username: string | null
}

export {
  IJWTTokenResponse,
  IUserRegistrationDTO,
  IUserDTO
}
