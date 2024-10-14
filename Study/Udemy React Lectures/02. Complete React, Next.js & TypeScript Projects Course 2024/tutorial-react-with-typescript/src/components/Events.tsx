import { useState } from 'react';

type Person = {
  name: string;
};

const EventsComponents = () => {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  // 다음과 같이 <input> 요소의 변화된 값을 가져올 수 있다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    console.log(data);

    const text = formData.get('text') as string;
    const person: Person = { name: data.text as string };
  };

  return (
    <section>
      <h2>Events Example</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="text"
          className="form-input mb-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="email"
          name="email"
          className="form-input mb-1"
          value={email}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </section>
  );
};

export default EventsComponents;
