import React, {useEffect, useRef, useState} from "react";
import './lottery.css'
const  category = [
    {
        id: 1,
        value: 1
    },{
        id: 2,
        value: 2
    }
    ,{
        id: 3,
        value: 3
    },{
        id: 4,
        value: 4
    },{
        id: 5,
        value: '点击抽奖'
    },{
        id: 6,
        value: 5
    },{
        id: 7,
        value: 6
    },{
        id: 8,
        value: 7
    },{
        id: 9,
        value: 8
    }
]
let award = 5
export const Lottery = () => {
    const [startBtn, setStartBtn] = useState(false);
    const [active, setActive] = useState(0)
    // const [award, setAward] = useState(5)
    // 按钮点击
    const handleClick = (key) => {
        if(key===5){
            start(startBtn)
        }
    }
    const timer = useRef()
    //  正在抽奖
    const doingLottery = () => {
        let currId = 0
        const idArr = [1, 2, 3, 6, 9, 8, 7, 4]
        const idLength = idArr.length
        timer.current = setInterval(() => {
            setActive(idArr[currId])
            if(currId < idLength) {
                currId++
            } else {
                currId = 0
            }
            stopLottery(currId)
        }, 200)

        return timer.current
    }
    // 抽奖结束
    const stopLottery = (currId) => {
        console.log('getAward',award, currId)
        if( award!== 5 && currId === award) {
            clearInterval(timer.current)
            setActive(0)
            setStartBtn(false)
        }
    }
    const start = (isStart) => {
        if(!isStart) {
            setStartBtn(true)
            doingLottery()
        } else {
            console.log('正在抽奖中')
        }
    }
    // 模拟服务器请求延迟 设置抽中奖品
    useEffect(()=>{
        const getAward = setTimeout(()=> {
            if(award === 5) {
                // setAward(7)
                award = 7
                console.log('changed')
            } else {
                clearTimeout(getAward)
            }
        },5000)
        return () => {
            clearTimeout(getAward)
        }
    }, [startBtn])
    return <ul className="lottery">
        {category.map((item)=><li className={item.id===5? 'start' : ''} style={{background: active === item.id? '#ffe6a6' : ''}} key={item.id} onClick={()=>handleClick(item.id)}>{item.value}</li>)}
    </ul>
}