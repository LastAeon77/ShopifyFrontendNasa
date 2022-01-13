import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Props } from "./types";

const ImageBox: React.FC<Props> = ({
  ndata,
  num,
  localstoragedata,
  likefunction,
  dislikefunction,
}) => {
  const [liked, setliked] = useState<boolean>(false);
  const OnClickLike = (id: number) => {
    likefunction(id);
    setliked(true);
  };
  const OnClickDislike = (id: number) => {
    dislikefunction(id);
    setliked(false);
  };
  useEffect(() => {
    setliked(localstoragedata.has(ndata.id));
  }, [ndata.id]);
  return (
    <div key={num} id={ndata.id.toString()} className="flex content-center">
      <Box
        m={3}
        p={2}
        sx={{
          width: 440,
          height: 400,
        }}
        style={{
          backgroundColor: "black",
          margin: "6px",
          boxShadow: `1px -20px 60px -20px blue inset, 0px 0px 5px -1px blue inset`,
        }}
      >
        <div className="flex flex-col content-center justify-center items-center">
          <div className="text-white ">
            <img src={ndata.img_src} style={{ width: 300, height: 200 }}></img>
            <div className="flex flex-row">
              <div className="text-white w-3/4">
                ID: {ndata.id} <br />
                Sol: {ndata.sol}
                <br />
                Camera: {ndata.camera.full_name}
                <br />
                earth_date: {ndata.earth_date}
                <br />
                rover: {ndata.rover.name}
                <br />
                rover_active: {ndata.rover.status}
                <br />
              </div>
              <div className="w-1/4">
                {liked ? (
                  <IconButton
                    color="error"
                    style={{ transform: "scale(1.8)" }}
                    onClick={() => OnClickDislike(ndata.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="error"
                    style={{ transform: "scale(1.8)" }}
                    onClick={() => OnClickLike(ndata.id)}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ImageBox;
