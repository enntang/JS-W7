let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(function (response) {
        data = response.data.data;
        renderData(data);
        //現在取回來的資料是陣列包物件，要另外把資料整理成C3用的陣列包陣列
        chartData();
    })
    .catch(function (error) {
        console.log(error.message)
    });


// 整理C3用資料的function

function chartData() {
    // 先宣告一個空物件來提取地區和計算數量
    let chartData = {};
    data.forEach(function (item) {
        // 如果 chartData 還沒有被寫入地區的計數，則由 1 開始
        if (chartData[item.area] === undefined) {
            chartData[item.area] = 1;
        } else {
            chartData[item.area] += 1;
        }
    });
    // chartData 返回 {高雄: 1, 台北: 1, 台中: 1}
    // 定義一個變數 area 把物件的index轉為陣列
    let area = Object.keys(chartData);
    // area 返回 ['高雄', '台北', '台中']
    // 再定義一個空陣列 newData 來裝準備給C3用的格式
    let newData = [];
    area.forEach(function (item) {
        //每一項地區必須單獨再裝一個陣列
        let ary = [];
        ary.push(item);
        ary.push(chartData[item]);
        // 推回去給 newData
        newData.push(ary)
    })
    console.log(newData);

    //渲染 C3 chart
    const chart = c3.generate({
        bindto: '#chart',
        data: {
            // 把 newData 餵給 columns
            columns: newData,
            type: 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); },
            colors: {
                '高雄': '#E68618',
                '台北': '#26BFC7',
                '台中': '#5151D3'
            }
        },
        donut: {
            title: "套票地區比重",
            width: 15,
            label: {
                show: false
            }
        }
    });
}

