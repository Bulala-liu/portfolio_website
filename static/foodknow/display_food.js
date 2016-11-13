function disp_and_save(data){
        foods = JSON.parse(data);
        disp_to_html(foods);
        // to store to localStorage
        save_food = [];
        save_food.push(foods[0]);
        localStorage.setItem(window.current_food, JSON.stringify(save_food));
}

function disp_to_html(foods){
        if (foods.length == 0){
            alert("No result!");
        }
        name = foods[0]['名称'];
        cal = foods[0]['能量'];
        pro = foods[0]['蛋白质'];
        fat= foods[0]['脂肪'];
        ch = foods[0]['碳水化合物'];
        na = foods[0]['钠'];
        ca = foods[0]['钙'];
        $('#food_area').empty();
        $('#food_area').append("<table><caption></caption><tr><th>营养成分</th><th>含量 (/100g)</th></tr>"
            + "<tr><td>能量</td><td id='en'></td></tr>"
            + "<tr><td>蛋白质</td><td id='proo'></td></tr>"
            + "<tr><td>脂肪</td><td id='fat'></td></tr>"
            + "<tr><td>钠</td><td id='na'></td></tr>"
            + "<tr><td>钙</td><td id='ca'></td></tr></table>");
        $('caption').text(name+': '+'营养成分表');
        $('#en').text(cal+' (kJ)');
        $('#proo').text(pro+' (g)');
        $('#fat').text(fat+' (g)');
        $('#na').text(na+' (mg)');
        $('#ca').text(ca+' (mg)');
}

$(document).ready(function(){
    $('input').keypress(function(e){
        if(e.which == 13) {
        var food_name = $("#food_name").val();
           
        if (localStorage.hasOwnProperty(food_name)){
            var foods = JSON.parse(localStorage.getItem(food_name));
            // alert(localStorage['大米']);
            disp_to_html(foods);
        } else{
            window.current_food = food_name;
            var pd = {"food_name":food_name};
            $.ajax({
                type:"post",
                url:"/query",
                data:pd,
                cache:false,
                success: disp_and_save,
                error:function(xhr){
                    alert('status: ' + xhr.status+'statusText: ' + xhr.statusText);
                },
            });
          }
     }
    });
    $('button').click(function(){
        var food_name = $("#food_name").val();
        if (localStorage.hasOwnProperty(food_name)){
            var foods = JSON.parse(localStorage.getItem(food_name));
            // alert('in localStorage!!!');
            disp_to_html(foods);
        } else {
            window.current_food = food_name;
            var pd = {"food_name":food_name};
            $.ajax({
                type:"post",
                url:"/query",
                data:pd,
                cache:false,
                success: disp_and_save,
                error:function(xhr){
                    alert('status: ' + xhr.status +'statusText: ' + xhr.statusText);
                },
            });            
        }

    })
})
