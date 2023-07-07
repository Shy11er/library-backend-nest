export default () => ({
  port: process.env.PORT ?? 3333,
  JWTSecret: process.env.JWT_SECRET ?? 'secret-123',
  JWTExpiresIn: process.env.JWT_EXPIRES_IN ?? 30,
});
