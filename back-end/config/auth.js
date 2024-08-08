module.exports = {
  secret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  tokenLife: process.env.TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
};
