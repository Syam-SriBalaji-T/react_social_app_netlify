import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>Well, that's disappointing.</p>
      <Link to='/' className='VisitHome'>Visit Our Homepage</Link>
    </main>
  )
}

export default Missing;