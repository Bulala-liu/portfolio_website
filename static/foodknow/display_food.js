function disp(){
        var food_name = $("#food_name").val();
        var pd = {"food_name":food_name};
        $.ajax({
            type:"post",
            url:"/query",
            data:pd,
            cache:false,
            success:function(data){
                foods = JSON.parse(data);
                name = foods[0]['名称']
                ca = foods[0]['钙']
                var disp_str = '名称: '+ name +' ; 钙含量: ' + ca;
                $('#food_area').html(disp_str);

            },
            error:function(){
                alert("error!");
            },
        });
    }