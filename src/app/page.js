"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CREATE_GEO_URL } from "../config/constants";
export const MapComponent = dynamic(
  () => import("../components/MapComponent"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [geoData, setGeodata] = useState("");

  function onChange(geojson) {
    console.log("geojson changed", geojson);
    setGeodata(geojson);
  }
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/signin");
    }
  }, []);

  const handleCreategeo = () => {
    axios
      .post(CREATE_GEO_URL, { geodata: geoData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar token={localStorage.getItem("token")} />
      <div className="flex justify-between gap-10">
        <MapComponent onChange={onChange} />
        <div className="p-10 h-56 w-full bg-gray-900 mr-20 mt-10">
          <button
            onClick={handleCreategeo}
            className="p-3 border-none bg-blue-500"
          >
            Save your work
          </button>
        </div>
      </div>
    </div>
  );
}
