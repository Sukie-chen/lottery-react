import React from "react";
import './win.css'
export const Win = (props) => {
    const {currId} = props
    return <div className="winBox">恭喜抽中奖品{currId}</div>
}