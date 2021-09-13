import React, {useRef, useState} from "react";
import './lottery.css'
import {Win} from "../Win";
import {store} from '../../Store'
import axios from "axios";
axios.get('/api/live').then((res) => {
    store.dispatch({
        type: "UPDATE_CATEGORY",
        value: res.data
    })
}).catch((err) => {
    console.log('数据请求失败', err)
})
let {category, startBtn} = store.getState()
export const Lottery = () => {
    const [active, setActive] = useState(0)
    const [win, setWin] = useState(0)
    // 按钮点击
    const handleClick = (key) => {
        if(key===5){
            //将点击的按钮值传入进去，false表示为非冻结状态，true表示为冻结状态
            start(startBtn)
        }
    }
    const timer = useRef() //设置定时器
    //  正在抽奖
    const doingLottery = () => {
        let currId = 0
        const idArr = [1, 2, 3, 6, 9, 8, 7, 4] //旋转的顺序
        const idLength = idArr.length
        //以0.2秒的速度进行旋转，通过active显示样式
        timer.current = setInterval(() => {
            setActive(idArr[currId])
            if(currId < idLength) {
                currId++
            } else {
                currId = 0 //循环
            }
            stopLottery(currId)  //将现在的物品与后台确定的奖品进行对比是否一致
        }, 200)

        return timer.current
    }
    // 抽奖结束
    const stopLottery = (currId) => {
        //确定是抽中奖品，则点击按钮还原功能 active初始化
        const {award} = store.getState()
        if( award!== 5 && currId === award) {
            clearInterval(timer.current)
            setActive(0)
            store.dispatch({
                type: 'CLICK_START_BTN',
                value: false
            })
            setWin(currId)
            // console.log('恭喜获得奖品', currId)
        }
    }
    //点击开始抽奖，向后台请求获奖数据
    const start = (isStart) => {
        // isStart 为false表示非冻结状态，改变值为true表示已冻结“正在抽奖中”，并进入抽奖环节
        if(!isStart) {
            store.dispatch({
                type: 'CLICK_START_BTN',
                value: true
            })
            doingLottery()
            store.dispatch({
                type: 'GET_AWARD',
                value: 7
            })
        } else {
            console.log('正在抽奖中')
        }
    }

    return <div>
        <ul className="lottery">
            {category.map((item)=><li className={item.id===5? 'start' : ''} style={{background: active === item.id? '#ffe6a6' : ''}} key={item.id} onClick={()=>handleClick(item.id)}>{item.value}</li>)}
        </ul>
        {
            win === 0? '': <Win currId={win}/>
        }

    </div>

}