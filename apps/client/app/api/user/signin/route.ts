import { NextApiRequest } from "next";

type User = {
  email: string;
  password: string;
}

export const POST = async (req: NextApiRequest) => {

  try {
    const user: User = JSON.parse(req.body);
    const currentUser =  await prisma?.user.findFirst({
      where: {
        email: user.email,
        // password: user.password,
      }
    })
    if (currentUser) {
      return {
        status: 200,
        body: {
          message: 'Success',
          user: currentUser,
        }
      }
    }
  }
  catch (error) {
    return {
      status: 500,
      body: {
        message: 'Error in signin',
        error: error,
      }
    }
  }

}
