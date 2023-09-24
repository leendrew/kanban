const env = {
  env: 'NODE_ENV',
  port: 'SERVER_PORT',
  dbName: 'DB_NAME',
  dbHost: 'DB_HOST',
  dbPort: 'DB_PORT',
  dbUsername: 'DB_USER',
  dbPassword: 'DB_PASS',
};

function checkEnv(env: string) {
  const envValue = process.env[env];

  if (envValue === undefined) {
    throw new Error(`Make sure that '${env}' really exist in your .env file`);
  }

  return envValue;
}

export const getConfig = () => ({
  env: env.env,
  port: parseInt(checkEnv(env.port), 10),
  db: {
    name: checkEnv(env.dbName),
    host: checkEnv(env.dbHost),
    port: parseInt(checkEnv(env.dbPort), 10),
    user: checkEnv(env.dbUsername),
    pass: checkEnv(env.dbPassword),
  },
});
export type Config = ReturnType<typeof getConfig>;
