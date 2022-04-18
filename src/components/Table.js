import { useState, useEffect } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

const Table = ({ spot, setSpots, fetchSpots }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");
  const [orderArrow, setArrow] = useState("");

  useEffect(() => {
    const getSpots = async () => {
      const spotsFromServer = await fetchSpots();

      setSpots(spotsFromServer);
    };
    getSpots();
  }, []);
  // Sorting function
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...spot].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSpots(sorted);
      setArrow("up");
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...spot].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSpots(sorted);
      setArrow("down");
      setOrder("ASC");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-7">
        <h1 className="text-2xl font-semibold pb-2">Locations</h1>
        <input
          type="text"
          placeholder="Search name,country & month..."
          className="p-2  border-2 rounded-md"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className=" flex justify-center py-7 relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-[95vw] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  bg-gray-700 text-gray-400">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sorting("name")}
              >
                NAME
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sorting("country")}
              >
                COUNTRY
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sorting("lat")}
              >
                LATITUDE
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sorting("long")}
              >
                LONGITUDE
              </th>
              <th
                className="px-6 py-3 cursor-not-allowed"
                onClick={() => sorting("probability")}
              >
                WIND PROB.
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sorting("month")}
              >
                WHEN TO GO
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 border-b border-gray-700 hover:bg-gray-50">
            {/* Checking if API fetch is done */}
            {Array.isArray(spot)
              ? spot
                  .filter((spot) => {
                    // Search function
                    if (searchTerm == "") {
                      return spot;
                    } else if (
                      // Searching location name
                      spot.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      // Searching location country
                      spot.country
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      // Searching month to go
                      spot.month
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return spot;
                    }
                  })
                  .map((spot) => (
                    <tr
                      key={spot.id}
                      className={
                        spot.favourite ? "bg-yellow-300" : "bg-gray-200"
                      }
                    >
                      <th className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                        {spot.name}
                      </th>
                      <td className="px-6 py-4 text-gray-700">
                        {spot.country}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{spot.lat}</td>
                      <td className="px-6 py-4 text-gray-700">{spot.long}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {spot.probability}%
                      </td>
                      <td className="px-6 py-4 text-gray-700">{spot.month}</td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.defaultProps = {
  currentSort: "default",
};
export default Table;
