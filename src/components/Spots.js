import { text } from "@fortawesome/fontawesome-svg-core";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "./Button";

const Spots = ({ spot, fetchSpots, toggleFavorite, setSpots }) => {
  var goldIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  var blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const getSpots = async () => {
      const spotsFromServer = await fetchSpots();

      setSpots(spotsFromServer);
    };
    getSpots();
  }, []);

  return (
    <>
      {Array.isArray(spot)
        ? spot.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.long]}
              icon={spot.favourite ? goldIcon : blueIcon}
            >
              <Popup>
                <h1 className="font-sans font-bold text-base">{spot.name}</h1>
                <h3 className="font-sans font-bold text-base">
                  {spot.country}
                </h3>
                <p className="font-sans font-medium text-slate-400  m-0">
                  WIND PROBABILITY:
                  <br />
                  <span className="font-sans font-bold text-base text-black">
                    {spot.probability}%
                  </span>
                </p>

                <p className="font-sans font-medium text-slate-400  m-0">
                  LONGITUDE:
                  <br />
                  <span className="font-sans font-bold text-base text-black">
                    {spot.long}
                  </span>
                </p>
                <p className="font-sans font-medium text-slate-400  m-0">
                  LATITUDE:
                  <br />
                  <span className="font-sans font-bold text-base text-black">
                    {spot.lat}
                  </span>
                </p>
                <p className="font-sans font-medium text-slate-400  m-0">
                  WHEN TO GO:
                  <br />
                  <span className="font-sans font-bold text-base text-black">
                    {spot.month}
                  </span>
                </p>
                {/* Favorite OR Delete favorite btn */}

                <button
                  className={
                    spot.favourite
                      ? "bg-red-400 font-sans text-black text-base rounded px-2 py-[0.15rem] hover:bg-red-500"
                      : "bg-yellow-400 font-sans text-black text-base rounded px-2 py-[0.15rem] hover:bg-yellow-500"
                  }
                  onClick={() => {
                    toggleFavorite(spot.id);
                  }}
                >
                  {spot.favourite
                    ? "Delete from favourite"
                    : "Add to favourite"}
                </button>
              </Popup>
            </Marker>
          ))
        : null}
    </>
  );
};

export default Spots;
