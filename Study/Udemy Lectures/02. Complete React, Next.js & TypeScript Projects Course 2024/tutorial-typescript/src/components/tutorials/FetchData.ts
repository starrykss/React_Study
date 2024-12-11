import { z } from 'zod';

const url = 'https://www.course-api.com/react-tours-project';

// zod를 이용하면 런타입 때 타입을 체크할 수 있다.
// - zod를 이용하지 않을 경우 빌드타임 때만 타입을 체크할 수 있다.
const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string(),
  // something: z.number(),
});

type Tour = z.infer<typeof tourSchema>;

async function fetchData(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // 요청이 성공했는지 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: Tour[] = await response.json();

    const result = tourSchema.array().safeParse(rawData);
    console.log(result);

    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`);
    }

    return result.data;
  } catch (error) {
    // error 값이 Error 클래스의 인스턴스인지 확인
    const errMsg =
      error instanceof Error ? error.message : 'There was an error...';
    console.error(errMsg);

    // throw error;
    return [];
  }
}

const tours = await fetchData(url);

tours.map((tour: any) => {
  console.log(tour.name);
});
