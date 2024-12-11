import { fetchUsers, saveUser } from '@/utils/actions';
import { NextRequest, NextResponse } from 'next/server';

// 유저 정보 가져오기
export const GET = async (req: NextRequest) => {
  console.log(req.url); // URL 가져오기
  console.log(req.nextUrl.searchParams.get('id')); // 쿼리 파라미터 값 가져오기

  const users = await fetchUsers();

  return Response.json({ users });
};

// 유저 정보 저장하기
export const POST = async (req: Request) => {
  const user = await req.json();
  const newUser = { ...user, id: Date.now().toString() };

  await saveUser(newUser);

  return Response.json({ msg: 'user created' });
};
