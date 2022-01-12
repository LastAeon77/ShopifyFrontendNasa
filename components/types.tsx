export type nasa_camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type nasa_rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
};
export type nasa_photo = {
  id: number;
  sol: number;
  camera: nasa_camera;
  img_src: string;
  earth_date: string;
  rover: nasa_rover;
};

export type nasa_data = {
  photos: Array<nasa_photo>;
};

export interface Props {
  ndata: nasa_photo;
  num: number;
  localstoragedata: Set<number>;
  likefunction: (id: number) => void;
  dislikefunction: (id: number) => void;
}
