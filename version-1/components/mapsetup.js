import React, { useRef, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import Sidebar from "./sidebar";

var markerList = [];

export default function MapSetUp({
  centerCoordinates = [79.8083, 11.9416],
  apiKey,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const geocoderContainer = useRef(null);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(centerCoordinates);
  const [coordinates, setCoordinates] = useState([]);

  const { openSideBar } = useGlobalContext();

  useEffect(() => {
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      accessToken: apiKey,
      container: mapContainer.current,
      center: center,
      zoom,
      style: "mapbox://styles/mapbox/streets-v12",
    });

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());

    //geocoder
    geocoder.current = new MapboxGeocoder({
      accessToken: apiKey,
      marker: false, // Do not use the default marker style
      placeholder: "Search Places",
      mapboxgl: mapboxgl,
    });

    geocoderContainer.current.appendChild(geocoder.current.onAdd(map.current));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("./api");
      const data = await response.json();
      setCoordinates(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //removing the previous markers
    if (markerList.length != 0) {
      for (let i of markerList) {
        i.remove();
      }
      markerList = [];
    }
    coordinates.forEach((item) => {
      const { lat, long } = item;
      var markerItem = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<p>Need help !!!</p>`)
        )
        .addTo(map.current);

      //adding the markers to the array
      markerList.push(markerItem);
    });
  }, [coordinates]);
  return (
    <>
      <div ref={mapContainer} className="map"></div>
      <div ref={geocoderContainer} className="geocoder"></div>
      <button className="sidebar-open-btn" onClick={openSideBar}>
        <FaBars className="open-btn-icon" />
      </button>
      <Sidebar apiKey={apiKey} />
    </>
  );
}
