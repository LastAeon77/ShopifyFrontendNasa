import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ImageBox from "../../components/ImageBox";
import {
  nasa_photo,
  nasa_camera,
  nasa_rover,
  nasa_data,
} from "../../components/types";

function Nasapage() {
  const [data, setdata] = useState<Array<nasa_photo>>();
  const [likedset, setlikedset] = useState<Set<number>>(new Set<number>());
  const router = useRouter();
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
  useEffect(() => {
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
  );
}

export default Nasapage;
