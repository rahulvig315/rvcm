import Logo from "./components/Logo";
import { Login } from "./components/Login";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 p-24 md:flex-row fle">
      <Logo/>
      <Login />
    </main>
  )
}
