import { cn } from "@/lib/utils";
import Link from "next/link";


export function NavLinks({hamburgerIsOpen}: {hamburgerIsOpen?: boolean}) {
  return (
    <ul
              className={cn(
                "flex h-full flex-col md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-none",
                "ease-in [&_a:hover]:text-gray-500 [&_a]:flex [&_a]:pr-2 pr-2 [&_a]:h-[calc(var(--navigation-height)_-_1.5rem)] [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors",
                // hamburgerMenuIsOpen && "[&_a]:translate-y-0",
                hamburgerIsOpen && "[&_a]:text-gray-500",
                "lg:border rounded-full border-opacity-40 border-gray-700 backdrop-blur-md bg-opacity-10 bg-slate-800 md:transition-all p-0"
              )}
            >
              <li>
                <Link href="#">Features</Link>
              </li>

              <li className="md:hidden lg:block">
                <Link href="#">Customers</Link>
              </li>

              <li className="md:hidden lg:block">
                <Link href="#">Integrations</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Join</Link>
              </li>
            </ul>
  )
}
