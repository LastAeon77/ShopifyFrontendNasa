import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import ImageBox from "../../components/ImageBox";
import Link from "next/link";
import {
  nasa_photo,
  nasa_camera,
  nasa_rover,
  nasa_data,
} from "../../components/types";

function Nasapage() {
  const [data, setdata] = useState<Array<nasa_photo>>();
  const [likedset, setlikedset] = useState<Set<number>>(new Set<number>());
  const [curr_page, setcurr_page] = useState<number>(1);
  const onclicklike = (id: number) => {
    likedset.add(id);
    setlikedset(likedset);
    localStorage.setItem("data_set", JSON.stringify(Array.from(likedset)));
  };
  const onclickdislike = (id: number) => {
    likedset.delete(id);
    setlikedset(likedset);
    localStorage.setItem("data_set", JSON.stringify(Array.from(likedset)));
  };
  const router = useRouter();
  useEffect(() => {
    if (router.query.page_num) {
      const num = router.query.page_num;
      setcurr_page(parseInt(num as string));
      if (parseInt(num as string) < 1) {
        router.push(`/nasapage/1`);
      }
    }
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${router.query.page_num}&api_key=M3rkT4gOMlZc2KUz1Vyu2yRcjdFvZYcsF4aSj1dp`
      )
      .then((res) => setdata(res.data.photos as Array<nasa_photo>))
      .catch((errors) => console.log(errors));
    const new_set = localStorage.getItem("data_set");
    if (new_set !== null) {
      setlikedset(new Set(JSON.parse(new_set)));
    }
  }, [router.isReady]);

  return (
    <div className="flex flex-col items-center">
      <h1>Mars Rover Images</h1>
      <div className="flex flex-row">
        <div className="flex w-1/12">
          <Link href={`/nasapage/${curr_page - 1}`} passHref>
            <Box
              sx={{
                width: 80,
                height: "auto",
                float: "left",
                border: "1px dashed grey",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Previous Page
            </Box>
          </Link>
        </div>
        <div className="flex flex-wrap content-center justify-center items-center">
          {data?.map((object, i) => (
            <ImageBox
              ndata={object}
              num={i}
              localstoragedata={likedset}
              likefunction={onclicklike}
              dislikefunction={onclickdislike}
            />
          ))}
        </div>
        <div className="flex w-1/12 text-red-900">
          <Link href={`/nasapage/${curr_page + 1}`} passHref>
            <Box
              sx={{
                width: 80,
                height: "auto",
                float: "right",
                border: "1px dashed grey",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Next Page
            </Box>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nasapage;
