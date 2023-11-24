import { NextRequest, NextResponse } from "next/server";

type User = {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {

  try {
    const user: User = JSON.parse((await req.json()));
    const currentUser =  await prisma?.user.findFirst({
      where: {
        email: user.email,
        // password: user.password,
      }
    })
    if (currentUser) {
      return NextResponse.json(
        {
          status: 200,
          body: {
            message: 'Success',
            user: currentUser,
          }
        }
      )

    }
  }
  catch (error) {
    return NextResponse.json(
      {
        status: 500,
        body: {
          message: 'Error in signin',
          error: error,
        }
      }
    )
  }

}
