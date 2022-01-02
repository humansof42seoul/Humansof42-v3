export const regExpConstants = {
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
};

export const bcryptConstants = {
  saltOrRounds: 10,
};
