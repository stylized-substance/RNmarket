const authConfig = {
  jwtAccessTokenExpiration: 3600, // 1 hour
  jwtRefreshTokenExpiration: 86400, // 24 hours
  jwtAccessTokenSecret: process.env.JWTACCESSTOKENSECRET,
  jwtRefreshTokenSecret: process.env.JWTREFRESHSECRET
};

export default authConfig;
