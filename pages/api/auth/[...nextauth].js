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

        var httpConfig = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        console.log(`${process.env.API_HOST}/auth/login`);
        const res = await fetch(
          `${process.env.API_HOST}/auth/login`,
          httpConfig
        );

        if (res.status === 200) {
          const data = await res.json();
          if (data) {
            return data;
          }
        } else {
          console.dir(res);
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
        return {
          ...token,
          userId: user.data.user.id,
          userName: user.data.user.username,
          fullName: user.data.user.full_name,
          email: user.data.user.email,
          role: user.data.user.role,
          avatar_url: user.data.user.avatar_url,
          accessToken: `${user.data.type} ${user.data.token}`,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.userName = token.userName;
      session.user.fullName = token.fullName;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.isAdmin = false;
      if (token.role?.title === "Administrator") {
        session.user.isAdmin = true;
      }
      session.user.avatar_url = token.avatar_url;
      session.user.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
