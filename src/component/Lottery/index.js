import React from "react";
import './lottery.css'
const arr = [1, 2, 3, 4, 5, 6, 7, 8]

export const Lottery = () => {
    return <ul className="lottery">
        {arr.map((item)=><li>{item}</li>)}
        <li>点击抽奖</li>
    </ul>
}