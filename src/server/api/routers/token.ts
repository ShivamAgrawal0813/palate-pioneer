import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tokenRouter = createTRPCRouter({
  getAccessToken: publicProcedure.mutation(async ({  }) => {
    const response = await fetch(
      "https://cosylab.iiitd.edu.in/api/auth/realms/bootadmin/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "username=forkit-hackathon&password=forkitiiitdelhi&grant_type=password&client_id=app-ims&scope=openid",
      },
    );

    const tokenResponse = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const token = tokenResponse.access_token;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return token;
  }),
});
