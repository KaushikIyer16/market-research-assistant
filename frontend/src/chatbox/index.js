import React, { useEffect, useState } from "react";
import {CompetitionReport} from './report';

function fetchMarketDetails(company){
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/market_details?company=${company}`)
            .then(data => data.json())
}

function Chat() {

  const [company, setCompany] = useState("")
  const [marketInfo, setMarketInfo] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    if(company !== ""){
      fetchMarketDetails(company)
        .then(details => {
          setMarketInfo(details)
          setLoading(false)
        })

    } else {
      setLoading(false)
    }
    return () => setMarketInfo({})
  }, [company])

  return (
    <div className="space-y-4">
      <form className="w-1/2 chat-box" onSubmit={event => {
          event.preventDefault();
          setCompany(event.target.search.value);
        }}>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search" id="search" name="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="List companies comma seperated. eg: Nvidia,Apple" required/>
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>

      {loading && <div>Loading.....</div>}
      {!loading && marketInfo.hasOwnProperty("market_split") && <CompetitionReport marketInfo={marketInfo}/>}

      
    </div>
  );
}

export default Chat;