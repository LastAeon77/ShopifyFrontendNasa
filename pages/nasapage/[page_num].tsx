import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { height } from "@mui/system";
import { useRouter } from "next/router";

type nasa_camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

type nasa_rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
};
type nasa_photo = {
  id: number;
  sol: number;
  camera: nasa_camera;
  img_src: string;
  earth_date: string;
  rover: nasa_rover;
};

type nasa_data = {
  photos: Array<nasa_photo>;
};

const Image_Box = (ndata: nasa_photo, num: string) => {
  return (
    <div id={num}>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>
          <img src={ndata.img_src} style={{ width: 300, height: 200 }}></img>
          ID: {ndata.id}
          Sol: {ndata.sol}
          Camera: {ndata.camera.full_name}
          earth_date: {ndata.earth_date}
          rover: {ndata.rover.name}
          rover_active: {ndata.rover.status}
        </div>
      </Box>
    </div>
  );
};

function Nasapage() {
  const [data, setdata] = useState<Array<nasa_photo>>();
  const router = useRouter();
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${router.query.page_num}&api_key=M3rkT4gOMlZc2KUz1Vyu2yRcjdFvZYcsF4aSj1dp`
      )
      .then((res) => setdata(res.data.photos as Array<nasa_photo>))
      .catch((errors) => console.log(errors));
  }, [router.isReady]);
  return (
    <div className="flex justify-center align-center">
      {data?.map((object, i) => Image_Box(object, i.toString()))}
    </div>
  );
}

export default Nasapage;
