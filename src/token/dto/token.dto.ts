export interface AuthorizationCodeDto {
  scope: string[],
  clientId: string,
  userId: number,
  redirectUri: string
}

export interface AccessTokenDto {
  scope: string[],
  clientId: string,
  userId: number
}
