export interface JwtPayload {
  roles: string[];
  sub: string;
  iat: number;
  exp: number;
}
