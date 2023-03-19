import React, { useState, useEffect } from "react";
import { FaRegWindowClose, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

var places = [];
export default function Sidebar({ apiKey }) {
  const { isSideBarOpen, closeSideBar } = useGlobalContext();

  const [data, setData] = useState([]);

  //getting the location names
  const reverseGeoCoding = async (long, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${apiKey}`
      );
      const data = await response.json();
      const result = data.features;
      places.push(result[0].place_name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("./api");
      const data = await response.json();

      setData(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetails = () => {
      data.forEach((item) => {
        const { lat, long } = item;
        reverseGeoCoding(long, lat);
      });
    };
    fetchDetails();
  }, [data]);

  const deleteItem = async (dbTime) => {
    const response = await fetch(`./api/deleteitem?id=${dbTime}`, {
      method: "DELETE",
    });
    const data = await response.json();
  };
  return (
    <aside className={`${isSideBarOpen ? "sidebar show-sidebar" : "sidebar"} `}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">Recent Accident Zones</h1>
        <button className="sidebar-close-btn" onClick={closeSideBar}>
          <FaTimes className="close-btn-icon" />
        </button>
      </div>

      <div className="recent">
        {data.map((item, index) => {
          const { dttm } = item;

          // let temp = new Date(dttm).getTime();

          // //+5:30 GMT
          // let dttime24 = String(new Date(temp + 19800000)).replace(
          //   "GMT+0530 (India Standard Time)",
          //   ""
          // );

          // //to local time
          // let dttime12 = new Date(dttime24).toLocaleTimeString("en-US", {
          //   timeZone: "IST",
          //   hour12: true,
          //   month: "numeric",
          //   year: "numeric",
          //   day: "numeric",
          //   hour: "numeric",
          //   minute: "numeric",
          //   second: "numeric",
          // });

          //use this when you host

          let tempdbTime = dttm.replace("T", " ");
          let dbTime = tempdbTime.replace(".000Z", "");

          let temp = new Date(dbTime).getTime();
          let dttime24 = String(new Date(temp + 19800000)).replace(
            "GMT+0530 (India Standard Time)",
            ""
          );

          //to local time
          let dttime12 = new Date(dttime24).toLocaleTimeString("en-US", {
            timeZone: "IST",
            hour12: true,
            month: "numeric",
            year: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });

          let place = places[index];
          return (
            <div className="recent-item" key={temp}>
              <p className="date">{dttime12}</p>
              <p className="place">{place}</p>

              <span className="remove-item">
                <button
                  onClick={() => {
                    // deleteItem(dttime24);
                    deleteItem(dbTime);
                    window.location.reload();
                  }}
                >
                  <FaRegWindowClose />
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
