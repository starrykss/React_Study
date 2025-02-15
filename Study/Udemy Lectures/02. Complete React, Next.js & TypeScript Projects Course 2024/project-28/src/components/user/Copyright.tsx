export default function Copyright() {
  return (
    <p
      className='copyright'
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        fontFamily: 'Consolas',
        textAlign: 'left',
        marginTop: '7rem',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'gray',
      }}
    >
      <span>Made By</span>
      <a href='https://www.github.com/starrykss'>@starrykss</a>
    </p>
  );
}
