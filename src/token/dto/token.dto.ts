export interface AuthorizationCodeDto {
  scope: string[],
  clientId: string,
  userId: string,
  redirectUri: string
}

export interface AccessTokenDto {
  scope: string[],
  clientId: string,
  userId: string
}
