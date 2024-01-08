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
  const [displayEmailList, setDisplayEmailList] = useState(true)
  const displayEmail = (id) => {
    // console.log(emails[id]['html']);
    setEmailHTML(emails[id]['html']);
    var htmlString = emails[id]['html'];
    var iframe = document.getElementById('content');
    var iframe2 = document.getElementById('content2');

    // open needed line commentary
    iframe.contentWindow.document.body.innerHTML = htmlString;
    iframe2.contentWindow.document.body.innerHTML = htmlString;
    //myIFrame.contentDocument.body.innerHTML = htmlString;
    //myIFrame.document.body.innerHTML = htmlString;
    //myIFrame.contentWindow.document.documentElement.innerHTML = htmlString;
  }
  useEffect(() => {
    getEmails();
  }, []);

  return (
    <div className="App">
      <Navbar getEmails={getEmails} />

      <div className='lg:flex flex-auto grid-flow-col hidden'>
        <div className='row-span-1 bg-slate-900 text-white w-1/4 h-full fixed left-0 overflow-auto'>
          <p className='text text-xl p-4 font-bold'>

            Email IDs</p>

          <ul className='list-none list-inside overflow-auto'>
            {Object.keys(emails).map((key) => {
              return <li key={key}>
                <div className='cursor-pointer bg-slate-600 rounded-md m-2' onClick={() => displayEmail(key)}>
                  <p className='mx-4 text-lg font-semibold my-2' >
                    {emails[key]['envelope_to']}

                  </p>
                  {/* date */}
                  <p className='text text-sm ml-4'>{new Date(emails[key]['date']).toString()}</p>

                </div>
              </li>
            })}
          </ul>
          <div style={{ height: '100px', width: "100%" }}></div>
        </div>
        <div className='row-span-2 bg-white w-3/4 h-full fixed left-1/4 overflow-auto'>
          <p className='text text-xl p-4 font-bold text-black'>Emails</p>
          <iframe className='w-full h-full' id='content' src="" frameborder="0"></iframe>

        </div>

      </div>
      <div className='flex flex-col lg:hidden'>
        <div className='bg-slate-900 text-white w-full p-4 flex justify-between'>
          <p className='text text-xl font-bold'>Email IDs</p>
          <button onClick={() => {
            setDisplayEmailList(!displayEmailList)
          }} className='btn btn-secondary'>
            {displayEmailList ? 'Hide' : 'Show'}
          </button>
        </div>
        {displayEmailList ?
          <ul className='list-none list-inside overflow-auto'>
            {Object.keys(emails).map((key) => {
              return <li key={key}>
                <div className='cursor-pointer bg-slate-600 rounded-md m-2' onClick={() => displayEmail(key)}>
                  <p className='mx-4 text-lg font-semibold my-2' >
                    {emails[key]['envelope_to']}

                  </p>
                  {/* date */}
                  <p className='text text-sm ml-4'>{new Date(emails[key]['date']).toString()}</p>

                </div>
              </li>
            })}
          </ul> : <div></div>}


        <div className='bg-white w-full p-4 h-screen'>
          <p className='text text-xl font-bold text-black'>Emails</p>
          <iframe className='bg-slate-600 w-full h-screen' id='content2' src="" frameborder="0"></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
