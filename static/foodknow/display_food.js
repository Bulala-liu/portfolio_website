function disp(data){
                foods = JSON.parse(data);
                name = foods[0]['名称'];
                cal = foods[0]['能量'];
                pro = foods[0]['蛋白质'];
                fat= foods[0]['脂肪'];
                ch = foods[0]['碳水化合物'];
                na = foods[0]['钠'];
                ca = foods[0]['钙'];
                $('#food_area').empty();
                $('#food_area').append("<table><tr><th>营养成分</th><th>含量 (/100g)</th></tr>"
                    + "<tr><td>能量</td><td id='en'></td></tr>"
                    + "<tr><td>蛋白质</td><td id='proo'></td></tr>"
                    + "<tr><td>脂肪</td><td id='fat'></td></tr>"
                    + "<tr><td>钠</td><td id='na'></td></tr>"
                    + "<tr><td>钙</td><td id='ca'></td></tr></table>");
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
        var pd = {"food_name":food_name};
        $.ajax({
            type:"post",
            url:"/query",
            data:pd,
            cache:false,
            success: disp,
            error:function(){
                alert("error!");
            },
        });
        }
    });
    $('button').click(function(){
        var food_name = $("#food_name").val();
        var pd = {"food_name":food_name};
        $.ajax({
            type:"post",
            url:"/query",
            data:pd,
            cache:false,
            success: disp,
            error:function(){
                alert("error!");
            },
        });
    })
})
