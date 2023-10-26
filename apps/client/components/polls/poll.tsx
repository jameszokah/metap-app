import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'


interface PollProps {
  children: React.ReactNode
}

// Persistent data array (typically fetched from the server)
const resData = [
  { id: 0, text: 'Answer 1', votes: 0 },
  { id: 1, text: 'Answer 2', votes: 0 },
  { id: 2, text: 'Answer 3', votes: 0 }
]

// Object keys may vary on the poll type (see the 'Theme options' table below)
const customTheme = {
  textColor: 'black',
  mainColor: '#00B8AF65 ',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center'
}

function vote(item: Result, results: Result[]) {
  // Here you probably want to manage
  // and return the modified data to the server.
}

export function Poll({children}: PollProps) {
  return (
    <Sheet>
      <SheetTrigger asChild >
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <LeafPoll
      type='multiple'
      question='What you wanna ask?'
      results={resData}
      theme={customTheme}
      onVote={vote}
      isVoted={false}
    />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}










export default Poll
