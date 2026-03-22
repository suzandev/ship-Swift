import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import warehouses from "../../data/warehouses.json";

// Fix marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Fly animation
const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, {
        duration: 1.5,
      });
    }
  }, [position, map]);

  return null;
};

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState([23.685, 90.3563]);
  const [marker, setMarker] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSearch = () => {
    const key = search.toLowerCase().trim();

    const found = warehouses.find(
      (item) =>
        item.district.toLowerCase() === key || item.city.toLowerCase() === key,
    );

    if (found) {
      const coords = [found.latitude, found.longitude];

      setPosition(coords);
      setMarker(coords);
      setSelectedDistrict(found.district);
    } else {
      alert("District not found 😢");
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16 rounded-2xl mx-4 md:mx-8 lg:mx-16 my-10">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
        We are available in 64 districts
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="flex items-center w-full sm:max-w-md bg-gray-200 rounded-full px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search district (e.g. Dhaka)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-lime-400 hover:bg-lime-500 text-black font-medium px-6 py-2 rounded-full transition">
          Search
        </button>
      </div>

      <hr className="mb-6 border-gray-300" />

      <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className="w-full h-64 md:h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={true}
          className="w-full h-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToLocation position={position} />

          {marker && (
            <Marker position={marker}>
              <Popup>
                <strong>{selectedDistrict}</strong> <br />
                Delivery Available ✅
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
