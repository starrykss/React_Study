import { useState } from 'react';
import axios from 'axios';

const url = 'https://www.course-api.com/axios-tutorial-post';

const PostRequest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email);

    try {
      // POST 요청
      const resp = await axios.post(url, { name, email });

      if (resp.status === 201) {
        setContent(resp.data.msg);
      }

      console.log(resp);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <section>
      <h2 className="text-center">post request</h2>
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-block">
            register
          </button>
        </form>
        <h4>{content}</h4>
      </div>
    </section>
  );
};
export default PostRequest;
