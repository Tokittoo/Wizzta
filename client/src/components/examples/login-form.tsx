import { LoginForm } from '../login-form'

export default function LoginFormExample() {
  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    console.log('Login attempted with:', credentials)
    // TODO: remove mock functionality - replace with real authentication
  }

  return <LoginForm onLogin={handleLogin} />
}