export const REGEXP = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
  NICKNAME: /^[A-Za-z0-9]{3,15}$/,
};

export const BCRYPT = {
  SALTORROUNDS: 10,
};
