'use server';

import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import dayjs from 'dayjs';

import prisma from './db';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';

// 로그인한 사용자ID 정보 가져오기
function authenticateAndRedirect(): string {
  const { userId } = auth();

  // console.log(('userId', userId));

  // 인증이 안되었을 경우 홈 화면으로 이동
  if (!userId) {
    redirect('/');
  }

  return userId;
}

// 구직 공고 생성하기
export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();

  try {
    // 유효성 검사
    createAndEditJobSchema.parse(values);

    // 구직 공고 DB에 생성하기
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    console.error(error);

    return null;
  }
}

// 타입 정의
type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

// 모든 구직 공고 가져오기
export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();

  try {
    // WHERE 문에 반복해서 사용될 내용 변수로 만들기
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;
    // page: 1 -> skip: 0
    // page: 2 -> skip: 10

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 전체 게시글 수
    const count: number = await prisma.job.count({
      where: whereClause,
    });

    // 전체 페이지 수
    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages: totalPages };
  } catch (error) {
    console.error(error);

    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

// 구직 공고 삭제하기
export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();

  try {
    // DB에서 구직 공고 항목 삭제하기
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    console.error(error);

    return null;
  }
};

// 구직 공고 1개 가져오기
export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  let job: JobType | null = null;

  const userId = authenticateAndRedirect();

  try {
    // DB에서 해당 직업 공고 가져오기
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.log(error);

    job = null;
  }

  // 해당 직업 공고가 없을 경우
  if (!job) {
    redirect('/jobs');
  }

  return job;
};

// 구직 공고 업데이트하기
export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();

  try {
    // DB에서 구징 공고 업데이트하기
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values, // 업데이트
      },
    });

    return job;
  } catch (error) {
    console.log(error);

    return null;
  }
};

// 통계 정보 가져오기
export const getStatsAction = async (): Promise<{
  Pending: number;
  Interview: number;
  Declined: number;
}> => {
  const userId = authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ['status'],
      _count: {
        // 키 이름 앞에 _를 붙이면, 집계 함수를 의미한다.
        status: true,
      },
    });

    // console.log(stats);

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    //
    // { status: "Pending", _count: { status: 10 } },
    // { status: "Declined", _count: { status: 5 } },
    //
    // => { Pending: 10, Declined: 5 }

    const defaultStats = {
      Pending: 0,
      Declined: 0,
      Interview: 0,
      ...statsObject,
    };

    return defaultStats;
  } catch (error) {
    console.log(error);

    // /jobs 페이지로 이동
    redirect('/jobs');
  }
};

// 차트 정보 얻기
export const getChartsDataAction = async (): Promise<
  Array<{ date: string; count: number }>
> => {
  const userId = authenticateAndRedirect();

  // 6개월 전
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo, // gte : greater than or equal to (>=)
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY'); // Nov 24

      // 연-월이 일치하는 경우 찾기
      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1; // 카운팅
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    console.log(error);

    // /jobs 페이지로 이동
    redirect('/jobs');
  }
};
