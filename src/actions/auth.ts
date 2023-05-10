import API from '../lib/API';

type SignUpArgObj = {
  phoneNumber: string;
  fullName: string;
  age: number;
  gender: string;
  email?: string;
  password: string;
};

export const mutationFn = (args: SignUpArgObj) => {
  return API.post('/auth/register', {
    ...args,
  })
    .then(res => {
      console.log('booking res --> ', res);
      return res;
    })
    .catch(err => {
      console.log('error booking: ', err);
      throw err;
    });
};
