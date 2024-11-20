import { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';

import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  // 더미 데이터
  const chartData = [
    { label: 'HTML', value: '13' },
    { label: 'CSS', value: '160' },
    { label: 'JavaScript', value: '80' },
  ];

  // 가져온 데이터로 필요한 정보 가공하기
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) {
      return total;
    }

    if (!total[language]) {
      // 예) total['javascript'] = { label: javascript, value: 1 }
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language] = {
        ...total[language], // 기존의 값 불러오기
        value: total[language].value + 1, // 1씩 카운팅 (Overriding)
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  // console.log(languages);
  // {
  //   C: { label: 'C', value: 5 },
  //   C#: { label: 'C#', value: 3 },
  //   ...
  // }

  // (1) 사용된 언어
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value; // 내림차순 정렬 (value)
    })
    .slice(0, 5); // 상위 5개만 추출

  // console.log(mostUsed);
  // [{ label: 'C', value: 5 }, { label: 'C#', value: 3 }]

  // (2) star 수
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars; // 내림차순 정렬 (stars)
    })
    .map((item) => {
      return {
        ...item,
        value: item.stars,
      };
    })
    .slice(0, 5); // 상위 5개만 추출;

  // (3) star, fork 수
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;

      total.stars[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };

      total.forks[forks] = {
        label: name,
        value: forks,
      };

      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }

  .fusioncharts-container {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
