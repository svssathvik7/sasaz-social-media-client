import React from 'react'
import { useState } from 'react'
import "./OnlineFriends.css";
export default function MiniOnlineFriends() {
  // dummy data
  const [frnds, setFrnds] = useState([
    {
      id: 1,
      username: "svs sathvik",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 2,
      username: "azeem shaik",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 3,
      username: "Friend 3",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 4,
      username: "Friend 4",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 5,
      username: "Friend 5",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 6,
      username: "Friend 6",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 7,
      username: "Friend 7",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 8,
      username: "Friend 8",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 9,
      username: "Friend 9",
      displaypicture: require("../../assets/image.png")
    },
    {
      id: 10,
      username: "Friend 10",
      displaypicture: require("../../assets/image.png")
    },
  ]);
  return (
    <div id='online-friends'>
      <div id='online-friends-scroller'>
        {frnds.map(frnd => (
          <div key={frnd.id} id='friend-div'>
            <img alt={"Dp"} src={frnd.displaypicture} />
          </div>
        ))}
      </div>
    </div>
  )
}