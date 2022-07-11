import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Animated } from 'react-animated-css'

const TheApp = () => {
  let location = useLocation()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 767) {
      const openMenu = document.getElementById('open-menu')
      const hideMenu = document.getElementById('hide-menu')
      const sidebar = document.getElementById('sidebar')

      openMenu.style.display = 'block'
      hideMenu.style.display = 'none'
      sidebar.style.width = '0'
    }
  }, [location])

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="min-height">

        <div>
          <button
            className="ml-32 mt-32 bg-blue-500 text-white active:bg-blue-500
      font-bold px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Consult Doctor
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">General Info</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                      </button>
                    </div>
                    <div className="w-full max-w-xs">
                      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
                            Note
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Note"/>
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date" type="date" placeholder="Time"/>
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Book
                          </button>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="m-32 overflow-auto rounded-lg shadow">
          <h4 className="text-lg mb-8">Transaction History</h4>
          <table className="table-auto w-full">
            <thead className="text-black border-b-2 bg-gray-50 border-gray-200">
            <tr>
              <th className="text-sm tracking-wide p-3 text-left">From</th>
              <th className="text-sm tracking-wide p-3 text-left">To</th>
              <th className="text-sm tracking-wide p-3 text-left">Time</th>
              <th className="w-24 text-sm tracking-wide p-3 text-left">Note</th>
              <th className="text-sm tracking-wide p-3 text-left">Txn</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">14th Aug, 2022</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">Migrain Headache</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">436hBbe6ECc9105B2d703498D8490470255196f</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">14th Aug, 2022</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">Migrain Headache</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">436hBbe6ECc9105B2d703498D8490470255196f</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">0x5734fBbe6ECc9105B2d703498D8490470255196f</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">14th Aug, 2022</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">Migrain Headache</td>
              <td className="p-3 text-sm text-gray-700 whitespace-wrap">436hBbe6ECc9105B2d703498D8490470255196f</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Animated>
  )
}

export default TheApp