import axios from 'axios';

import { FIREBASE_API_KEY } from '@env';

// 인증 작업 처리
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

// 회원가입
export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

// 로그인
export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
