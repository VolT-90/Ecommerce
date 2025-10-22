export interface checkoutType {
  status: string
  session: Session
}

export interface Session {
  url: string
  success_url: string
}