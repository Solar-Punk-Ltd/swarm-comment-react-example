function getEnv(name: string): string {
  const value = import.meta.env[name as keyof ImportMetaEnv];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const config = {
  beeUrl: getEnv('VITE_BEE_URL'),
  commentStamp: getEnv('VITE_COMMENT_STAMP'),
};
