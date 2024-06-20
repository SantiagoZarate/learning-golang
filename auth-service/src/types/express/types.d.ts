export interface HealthCheckBody {
  ok: boolean,
  message: string,
  info: {
    date: string,
    version: string,
    mode: string
  }
}