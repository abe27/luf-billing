import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import https from "https";

// console.log(process.env.JWT_SECRET)
// console.log(process.env.API_HOST)

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "xpw-project",
      credentials: {},
      async authorize(credentials, req) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", credentials.username);
        urlencoded.append("password", credentials.password);

        // const httpsAgent = new https.Agent({
        //   rejectUnauthorized: false,
        // });

        // let httpConfig = {
        //   method: "POST",
        //   body: urlencoded,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   agent: httpsAgent,
        // };
        // if (process.env.API_HOST.indexOf(":4040") > 0) {
        //   httpConfig = {
        //     method: "POST",
        //     body: urlencoded,
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //   };
        // }
        var httpConfig = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
        const res = await fetch(`${process.env.API_HOST}/login`, httpConfig);

        if (res.status === 200) {
          const data = await res.json();
          if (data) {
            return data;
          }
        } else {
          console.dir(res)
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: "24h",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.dir(user)
        return {
          ...token,
          userId: user.data.user_id.id,
          // userName: user.data.user_id.user_name,
          // email: user.data.user_id.email,
          // imgUrl: user.data.profile.avatar_url,
          // isAdmin: user.data.is_admin,
          // accessToken: `${user.data.jwt_type} ${user.data.jwt_token}`,
          // Area: user.data.profile.area,
          // Whs: user.data.profile.whs,
          // Factory: user.data.profile.factory,
          // Position: user.data.profile.position,
          // Department: user.data.profile.department,
          // PrefixName: user.data.profile.prefix_name,
          // fullName: `${user.data.profile.first_name} ${user.data.profile.last_name}`,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // session.user.userId = token.userId;
      // session.user.userName = token.userName;
      // session.user.email = token.email;
      // session.user.imgUrl = token.imgUrl;
      // session.user.isAdmin = token.isAdmin;
      // session.user.accessToken = token.accessToken;
      // session.user.fullName = token.fullName;
      // session.user.Area = token.Area.title;
      // session.user.Whs = token.Whs.title;
      // session.user.WhsDescription = token.Whs.description;
      // session.user.Factory = token.Factory.title;
      // session.Position = token.Position.title;
      // session.Department = token.Department.title;
      // session.PrefixName = token.PrefixName.title;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);