<!--
 * @Author: Sukie-Chen
 * @Description: 幸运抽奖前台页面-react
 * @Date: 2021-08-26 17:17:13
-->
### 功能
- [x] 九宫格抽奖
  
### 攻克点
1. Store更新后页面数据修改 
```JavaScript
useEffect(() => {
        axios.get('/api/list').then((res) => {
            console.log(res.data)
            store.dispatch({
                type: "UPDATE_CATEGORY",
                value: res.data
            })
        }).catch((err) => {
            console.log('数据请求失败', err)
        })
        return store.subscribe(()=>{
            update({})
        })
    }, []); 
```
2. 定时器
```JavaScript
const timer = useRef() //设置定时器 以0.2秒的速度进行旋转，通过active显示样式
timer.current = setInterval(() => {
    setActive(idArr[currId])
    if(currId < idLength) {
        currId++
        console.log(currId)
    } else {
        currId = 0 //循环
    }
    stopLottery(currId)  //将现在的物品与后台确定的奖品进行对比是否一致
}, 200)
```
3. 