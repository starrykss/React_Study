// localhost:3000/meals/my-meal
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug); // mealSlug 대신 다른 단어를 사용해도 된다.

  // 잘못된 URL에 접근할 경우 404 Not Found
  if (!meal) {
    notFound();
  }

  // 항목 끝 마다 줄 바꾸기
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto: ${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            // HTML의 코드를 직접 삽입 (XSS 공격에 취약)
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
