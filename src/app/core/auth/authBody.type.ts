export interface AuthRequest {
  affiliate_id: any;
  auth_code: number;
}

export interface AuthResponse {
  token: string;
  name: string;
}
