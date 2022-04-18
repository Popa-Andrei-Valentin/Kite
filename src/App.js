import Spots from "./components/Spots";
import Table from "./components/Table";
import "./App.css";
import "./components/Nav.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import Login from "./components/Login";

function App() {
  const [spot, setSpots] = useState(null);
  const [spotTemp, setSpotTemp] = useState();
  // For loggedin status
  const [login, setLogin] = useState();
  // For -- ADD SPOT -- //
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState();
  const [name, setLocation] = useState();
  const [country, setCountry] = useState();
  // ---- //

  // For -- FILTER -- //
  const [filterModal, setFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState();
  const [filterValueWind, setFilterValueWind] = useState();
  const [filterOn, setFilterOn] = useState();
  // ---- //

  // Add spot modal state
  const [addSpot, setAddSpot] = useState(false);

  // Fetching Spots Data
  useEffect(() => {
    const getSpots = async () => {
      const spotsFromServer = await fetchSpots();
      const loginFromServer = await fetchLogin(1);
      setLogin(loginFromServer.loggedin);
      setSpots(spotsFromServer);
      setSpotTemp(spot);
    };
    getSpots();
  }, []);

  const fetchSpots = async () => {
    const res = await fetch("https://6255722e8646add390d70c22.mockapi.io/spot");
    const data = await res.json();
    return data;
  };

  // Fetch Spots by id
  const fetchSpotsById = async (id) => {
    const res = await fetch(
      `https://6255722e8646add390d70c22.mockapi.io/spot/${id}`
    );
    const data = await res.json();
    return data;
  };

  // -- ADD SPOT -- //
  const handleSubmit = async (e) => {
    var arr = date.split("-");
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var month_index = parseInt(arr[1], 10) - 1;
    const month = months[month_index];

    const spotTemp = { name, country, month };

    const result = await fetch(
      "https://6255722e8646add390d70c22.mockapi.io/spot",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotTemp),
      }
    );
    const data = await result.json();
    setSpots([...spot, data]);
    setSpotTemp(spot);
    setShowModal(false);
  };
  // ---- //
  const letters = /[a-zA-Z]/;

  // -- FILTER DATA AND DISPLAY FUNCTION -- //
  const filtered = () => {
    if (letters.test(filterValue)) {
      setSpotTemp(spot);
      setSpots(spot.filter((e) => e.country === filterValue));
    }
  };

  // ---- //
  // Fetch Login INFO
  const fetchLogin = async (id) => {
    const res = await fetch(
      `https://6255722e8646add390d70c22.mockapi.io/login/${id}`
    );
    const data = await res.json();
    // setLogin(data.loggedin);
    return data;
  };

  const toggleLogin = async (id) => {
    const toToggle = await fetchLogin(id);
    const updateLogin = { ...toToggle, loggedin: !toToggle.loggedin };

    const res = await fetch(
      `https://6255722e8646add390d70c22.mockapi.io/login/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateLogin),
      }
    );
    const data = await res.json();
    console.log(data.loggedin);
    setLogin(data.loggedin);
  };
  // Toggle Favourite

  const toggleFavorite = async (id) => {
    const spotToToggle = await fetchSpotsById(id);
    const updSpot = { ...spotToToggle, favourite: !spotToToggle.favourite };

    const res = await fetch(
      `https://6255722e8646add390d70c22.mockapi.io/spot/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updSpot),
      }
    );

    const data = await res.json();

    setSpots(
      spot.map((spot) =>
        spot.id === id
          ? {
              ...spot,
              favourite: data.favourite,
            }
          : spot
      )
    );
  };
  // LEAFLET
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];

  return (
    <div>
      {login === false ? <Login toggleLogin={toggleLogin} /> : null}
      {/* Logo + Add Spot Button + Sign Out Button */}
      <div className="nav-container">
        <h1 className="p-2 font-bold">Kite</h1>
        <div className="right-0 space-x-4">
          {/* -- Add Spot Button -- */}
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add Spot
          </button>
          {showModal ? (
            <>
              <div className="w-100 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Add New Spot</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="p-2 font-semibold">Location Name</p>
                      <input
                        className="px-2 py-1 border-2 rounded-md "
                        type="text"
                        placeholder="Enter location name..."
                        onChange={(e) => {
                          let temp = e.target.value.toLocaleString("en-us", {
                            month: "long",
                          });
                          setLocation(temp);
                        }}
                      ></input>
                      <p className="p-2 font-semibold ">Country</p>
                      <input
                        className="px-2 py-1 border-2 rounded-md"
                        type="text"
                        placeholder="Enter country..."
                        onChange={(e) => {
                          setCountry(e.target.value);
                          console.log(/\d/.test(filterValueWind));
                        }}
                      ></input>
                      <p className="p-2 font-semibold">When to go </p>
                      {/* Date picker */}
                      <p className="font-semibold">from</p>
                      <input
                        className="bpx-2 py-1 border-2 rounded-md"
                        type="date"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                      <p className="font-semibold">to</p>
                      <input
                        className="bpx-2 py-1 border-2 rounded-md"
                        type="date"
                      />
                    </div>

                    {/*Button (add spot) footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <button
            className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              toggleLogin(1);
            }}
          >
            Sign out
          </button>
        </div>
      </div>
      {/* //---// */}
      {/* Leaflet contaienr start*/}
      <div className="map">
        {/* Filter on map */}
        <div>
          <button
            className="absolute z-10 px-5 py-1 right-0 mr-8 top-20 bg-white  shadow-md hover:shadow-xl hover:bg-blue-500 hover:text-white inline-block font-normal text-normal "
            onClick={() => {
              if (filterModal) setFilterModal(false);
              else {
                setFilterModal(true);
              }
            }}
          >
            FILTERS <BsFilterLeft className="inline " />
          </button>

          {/* Filter on CLICK modal */}
          {filterModal && (
            <div
              className="absolute z-10 bg-white shadow-md 
         px-5 py-2 right-0 mr-6 top-[7.5rem]"
            >
              <p>Country</p>
              <input
                className="py-1 my-2"
                type="text"
                placeholder="Enter country..."
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              />
              {/* <p>Wind Prob.</p>
              <input
                className="py-1 my-2"
                type="text"
                placeholder="Enter wind..."
                onChange={(e) => {
                  setFilterValueWind(e.target.value);
                }}
              /> */}
              <br />
              <button
                className=" px-2 py-2 bg-white text-blue-500 border-2 rounded hover:bg-blue-500 hover:text-white inline-block font-medium text-sm "
                onClick={() => {
                  setFilterOn(true);
                  filtered();
                }}
              >
                APPLY FILTERS
              </button>
              <button
                className=" px-2 py-2 bg-white text-blue-500 border-2 rounded hover:bg-blue-500 hover:text-white inline-block font-medium text-sm "
                onClick={() => {
                  if (filterOn) setSpots(spotTemp);
                }}
              >
                DELETE FILTERS
              </button>
            </div>
          )}

          {/* //--// */}
        </div>
        {/* //---// */}
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={3}
          maxZoom={10}
          zoomOut={1}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            noWrap={true}
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Spots
            spot={spot}
            fetchSpots={fetchSpots}
            toggleFavorite={toggleFavorite}
            setSpots={setSpots}
          />
        </MapContainer>
      </div>
      {/* Leaftlet container end */}

      {login === true ? (
        <Table spot={spot} setSpots={setSpots} fetchSpots={fetchSpots} />
      ) : null}
    </div>
  );
}

export default App;
