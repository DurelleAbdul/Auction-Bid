import { database} from "@/src/db/database";
import {bids as bidsSchema} from "@/src/db/schema";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {revalidatePath} from "next/cache";
import {SignIn} from "@/components/sign-in";
import {SignOut} from "@/components/signout-button";
import {auth} from "@/auth";
import UserAvatar from "@/components/UserAvatar";

export default async function HomePage(){

    const session = await auth()

    const bids = await database.query.bids.findMany();

  return (
      <main className= "container mx-auto py-12">
          {session ? <SignOut></SignOut> : <SignIn></SignIn>}


      <form
          action={async (formData: FormData) => {
            "use server"
            await database.insert(bidsSchema).values({});
            revalidatePath("/");
          }}
      >
        <Input name="bid" placeholder="Bid"/>
        <Button type="submit">Place bid</Button>
      </form>

          {bids.map(bid => (
              <div key = {bid.id}>
                  {bid.id}
              </div>
          ))}
  </main>
  );
}