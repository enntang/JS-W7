let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(function (response) {
        data = response.data.data;
        renderData(data);
    })
    .catch(function(error){
        console.log(error.message)
    });
  
//定義文件中的關鍵位置
const selector = document.querySelector("#location-selector");
const resultNum = document.querySelector("#resultNum");
const resultListRow = document.querySelector("#result-list-row");
const addDataBtn = document.querySelector(".btn");

const form = document.querySelector("form");
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");

//定義出執行渲染的條件
function renderData(data) {
    //渲染出旅遊行程卡片
    data.forEach(function (item) {
        resultListRow.innerHTML +=
            `<div class="col-4">
                        <div class="card">
                            <p class="tag-location">${item.area}</p>
                            <img src="${item.imgUrl}" alt="">
                            <div class="d-flex flex-column p-3 position-relative h-100">
                                <p class="tag-rank">${item.rate}</p>
                                <h3 class="mb-2">${item.name}</h3>
                                <p class="description">
                                ${item.description}
                                </p>
                                <div class="price-block d-flex justify-content-between align-items-center">
                                    <p>剩下最後${item.group}組</p>
                                    <div class="d-flex align-items-center">
                                    <p>TWD</p>
                                    <p class="price">${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
    //顯示搜尋結果數量
    resultNum.textContent = `本次搜尋共${data.length}筆資料`
};

renderData(data);

//新增套票的功能
function addData() {
    let obj = {
        id: data.length,
        //加上trim清除不必要空白，以及針對該是數字的欄位加上自動轉型
        name: ticketName.value.trim(),
        imgUrl: ticketImgUrl.value.trim(),
        area: ticketRegion.value.trim(),
        description: ticketDescription.value.trim(),
        group: Number(ticketNum.value.trim()),
        price: Number(ticketPrice.value.trim()),
        rate: Number(ticketRate.value.trim()),
    };
    data.push(obj);
}
addDataBtn.addEventListener("click", function () {
    addData();

    // 按新增按鈕後會立即更新搜尋結果
    filterData();

    // 清空表單欄位
    form.reset();
});


//將原始資料和selector之間做對應，並且更新渲染結果
function filterData() {
    //清空舊的渲染結果
    resultListRow.innerHTML = "";
    //定義一個空陣列當容器
    let filterResult = [];
    //設定篩選條件
    if (selector.value === "全部地區") {
        //全部地區的時候，陣列即等於初始資料的全部範圍
        filterResult = data;
    } else {
        data.forEach(function (item) {
            //當資料中的地區和selector的value相同時，觸發function將符合條件的資料推到陣列
            if (item.area === selector.value) {
                filterResult.push(item);
            };
        });
    }

    //地區符合當前選項的資料，會儲存在filterResult裡面，此時抓filterResult裡的資料做渲染
    renderData(filterResult);
};


//監聽selector，當使用者改變（change）選項時，觸發function
selector.addEventListener("change", function () {
    filterData();
});