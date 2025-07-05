import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage/LandingPage"
import { AuthLayout } from "./components/layouts/AuthLayout/AuthLayout"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { SignUpPage } from "./pages/SignUpPage/SignUpPage"
import { PasswordResetPage } from "./pages/PasswordResetPage/PasswordResetPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignUpPage/>}/>
        <Route path="password-reset" element={<PasswordResetPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
