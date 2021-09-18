/*
 * @Author: Sukie-Chen
 * @Description: 
 * @Date: 2021-09-13 16:37:32
 */
import React from "react";
import './win.css'
import { store } from "../../Store";
export const Win = () => {
    const {category, award} = store.getState()
    const result = category.filter((item => {
        return item.award_id === award
    }))
    // console.log(result)
    return <div className="winBox">恭喜抽中奖品{result[0].award_name}</div>
}