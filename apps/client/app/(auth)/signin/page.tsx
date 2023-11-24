"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GithubIcon, Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import  z from "zod"
import { cn } from "@/lib/utils"


export default function SignInAccount() {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    const ProviderIcon = providers?.['github'].id === "github" ? GithubIcon : GithubIcon;

    useEffect(() => {
    getProviders().then((providers) => {

    setProviders(providers);
    });
  }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        if (!email || !password) {
          return;
        }
        const user = z.object({
          email: z.string().email(),
          password: z.string().min(8).max(100),
        });


        setLoading(true);

        const res = await fetch("/api/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user.parse({ email, password })),
        });
        if (res.ok) {
          const data = await res.json();
          setLoading(false);
          console.log(data);
        } else {
          setError("Incorrect username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className="flex my-auto items-center justify-center h-screen p-16">
    <Card className="lg:w-5/12 ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login into account</CardTitle>
        <CardDescription>
          Enter your email below to Sign In
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          {providers && Object.values(providers).map((provider) => {
            if (provider.name === "Credentials") {
              return null;
            }
            return (
              <Button variant="outline" key={provider.id} onClick={() => signIn(provider.id)}>
                <ProviderIcon className="mr-2 h-4 w-4" />
                {provider.name}
              </Button>
            );
            })
          }

        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value) } placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        </div>
      </CardContent>
      <CardFooter>
        <Button className={cn("w-full")} disabled={loading} type="submit" onClick={handleSubmit} >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Sign In</Button>
      </CardFooter>
    </Card>
  </div>
  )
}
