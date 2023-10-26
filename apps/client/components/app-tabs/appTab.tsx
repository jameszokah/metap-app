import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const AppTab = () => {



  return (
    <Tabs defaultValue="account" className="">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
  )
}
