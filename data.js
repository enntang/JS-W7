let data = [];
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json') 
    .then(function (response) {
        data = response.data.data;
        renderData(data);
        //現在取回來的資料是陣列包物件
    })
    .catch(function (error) {
        console.log(error.message)
    });

//把資料整理成C3用的陣列包陣列

