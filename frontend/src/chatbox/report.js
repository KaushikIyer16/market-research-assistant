import React,{Fragment, useState} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function MajorProducts(props) {
  let [filter, setFilter] = useState("")
  let products = props.productInfo;
  if(filter !== "") {
    products = products.filter(product => product.activity.toLowerCase().includes(filter))
  }
  return (
    <Fragment>
      <h2>Major products:</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" onChange={event => setFilter(event.target.value)}/>
            </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Company
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Activity
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Revenue (past year)
                    </th>
                </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr className="bg-white border-b hover:bg-gray-50" key={product.activity}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.company}
                  </th>
                  <td className="px-6 py-4">
                    {product.activity}
                  </td>
                  <td className="px-6 py-4">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </Fragment>
  )
}

function getRandomColor() {
  return "#"+Math.floor(Math.random()*16777215).toString(16);
}

function MarketShare(props) {
  const data = {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: props.colors,
      hoverOffset: 4
    }]
  }
  const options = {
    legend: {
      display: true,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  return (
    <div className="w-1/4 chat-box">
      <Doughnut data={data} options={options}/>
    </div>
  )
}

export function CompetitionReport(props) {
  const {market_split:{market,companies}, activities} = props.marketInfo;
  let labels=[],data=[],colors=[];
  for(const company of companies) {
    labels.push(company.company)
    data.push(parseFloat(company.share))
    colors.push(getRandomColor())
  }
  return (
    <div className="flex flex-col chat-box w-3/4">
      <h1><strong>Market: {market}</strong></h1>
      <MarketShare labels={labels} data={data} colors = {colors}/>
      <MajorProducts productInfo={activities}/>
    </div>
  )
}