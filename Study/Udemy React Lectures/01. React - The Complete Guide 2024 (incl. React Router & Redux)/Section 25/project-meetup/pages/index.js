// our-domain.com/
import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

import { mongodbKey } from '../utils/keys';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://static.independent.co.uk/2022/12/29/14/iStock-464629385.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://cdn.britannica.com/57/75757-050-122EC2ED/Changgyong-Palace-background-Seoul.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a Second meetup!',
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// Server-side Rendering
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// Static Generation
// Pre-rendering 작업 중 실행 (HomePage 함수 호출 전 실행)
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(mongodbKey);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  // console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        const { title, address, image } = meetup.data;
        return {
          title,
          address,
          image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1, // 1초 마다 재갱신
  };
}

export default HomePage;
