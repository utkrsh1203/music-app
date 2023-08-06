import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useStateValue } from "../Context/StateProvider";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { getAllArtist } from "../api";
import { actionType } from "../Context/reducer";

const DashboardArtist = () => {
  const [{ artists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly'>
        {artists &&
          artists.map((data, index) => (
            <>
              <ArtistCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className='relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    >
      <img
        src={data?.imageURL}
        className='w-full h-40 object-cover rounded-md'
        alt=''
      />

      <p className='text-base text-textColor'>{data.name}</p>
      <div className='flex items-center gap-4'>
        <a href={data.instagram} target='_blank'>
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoInstagram className='text-gray-500 hover:text-headingColor text-xl' />
          </motion.i>
        </a>
        <a href={data.twitter} target='_blank'>
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoTwitter className='text-gray-500 hover:text-headingColor text-xl' />
          </motion.i>
        </a>
      </div>
    </motion.div>
  );
};

export default DashboardArtist;
