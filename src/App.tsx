import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage/LandingPage"
import { AuthLayout } from "./components/layouts/AuthLayout/AuthLayout"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { SignUpPage } from "./pages/SignUpPage/SignUpPage"
import { PasswordResetPage } from "./pages/PasswordResetPage/PasswordResetPage"
import { AppLayout } from "./components/layouts/AppLayout/AppLayout"
import { HomePage } from "./pages/HomePage/HomePage"
import { LibraryPage } from "./pages/LibraryPage/LibraryPage"
import { AttemptPage } from "./pages/AttemptPage/AttemptPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignUpPage/>}/>
        <Route path="password-reset" element={<PasswordResetPage/>}/>
      </Route>
      <Route path="/app" element={<AppLayout/>}>
        <Route path="home" element={<HomePage/>}/>
        <Route path="library" element={<LibraryPage/>}/>
        <Route path="attempts" element={<AttemptPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
