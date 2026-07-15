import ThemeToggler from "@/components/ui/theme-toggler";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="flex item-center flex-col w-screen">
        <nav className="flex item-center justify-between py-4 px-10">
          <div>
            <span className="text-lg">Batein</span>
          </div>
          <div className="flex item-center justify-between gap-4">
            <ThemeToggler />
            <Show when="signed-out">
              <SignInButton forceRedirectUrl={"/dashboard"} />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
        <div>
          Not Authenticated
        </div>
      </main>
    </div>
  );
}
