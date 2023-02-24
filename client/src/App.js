import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [emails, setEmails] = useState({})
  const [emailHTML, setEmailHTML] = useState('')
  const getEmails = async () => {
    const response = await fetch('/apirefreshmails');
    const data = await response.json();

    var emails = data['emails'];
    setEmails(emails);
    console.log("Emails refreshed");
  }

  const displayEmail = (id) => {
    // console.log(emails[id]['html']);
    setEmailHTML(emails[id]['html']);
  }
  useEffect(() => {
    getEmails();
  }, []);

  return (
    <div className="App">
      <Navbar getEmails={getEmails} />

      <div className='flex flex-auto grid-flow-col'>
        <div className='row-span-1 bg-slate-400 w-1/4 h-full fixed'>
          <p className='text text-xl p-4 font-bold'>Email IDs</p>
          <ul className='list-none list-inside'>
            {Object.keys(emails).map((key) => {
              return <li key={key}>
                <div onClick={() => displayEmail(key)}>
                  <p className='btn btn-ghost' >
                    {emails[key]['envelope_to']}

                  </p>
                  {/* date */}
                  <p className='text text-sm'>{new Date(emails[key]['date']).toString()}</p>

                </div>
              </li>
            })}
          </ul>

        </div>
        <div className='row-span-2 bg-red-300 w-3/4 h-full fixed left-1/4 overflow-auto'>
          <p className='text text-xl p-4 font-bold'>Emails</p>

          <div dangerouslySetInnerHTML={{ __html: emailHTML }} />

        </div>

      </div>
    </div>
  );
}

export default App;
