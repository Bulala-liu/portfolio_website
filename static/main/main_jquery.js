
// jQuery method
$(document).ready(function(){
	$('input:text').keypress(function(e){
       if (e.which == 13) {
       	
    	var title = $('input:text').val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0'
    +'&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var results = [];
        $.ajax({
            url: api+title,
            type: 'POST',
            dataType: 'jsonp',
            crossDomain: true,
            // headers: { 'Api-User-Agent': 'Example/1.0' },
            success: function(data) {
            	var result = data.query.pages;
            	var page = 'https://en.wikipedia.org/?curid=';
            	var valHrefs=[];
            	var valH1s = [];
            	var valPs = [];
                $.each(result, function(i,item) {
                	valHrefs.push(page + item.pageid);
                	valH1s.push(item.title);
                	valPs.push(item.extract);
                    $('.wrapper-ul').append(" <ul><a href='x' target='_blank'><li><h1></h1><p></p> </li></a></ul> ");  
                });
                var length = valPs.length;
                for(var i =0; i < length; i++){
                	$('.wrapper-ul ul:eq('+i+') a').attr('href', valHrefs[i]);
                	$('.wrapper-ul ul:eq('+i+') li > h1').text(valH1s[i]);
                	$('.wrapper-ul ul:eq('+i+') li > p').text(valPs[i]);
                };
            }
        });
    };

  });

});