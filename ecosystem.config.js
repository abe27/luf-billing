module.exports = {
  apps: [
    {
      name: "next",
      script: "npm",
      args: "run dev",
      watch: ["."],
      watch_delay: 1000,
      ignore_watch: ["node_modules"],
    },
  ],
};
