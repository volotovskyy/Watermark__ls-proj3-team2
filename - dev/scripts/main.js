// Fake input main img
$(document).ready(function() {

	var setUpListnerFileupload = function (){
		$('#main_img').on('change', changefileUpload);
	};
    
	var changefileUpload = function (){
		var 
			inputFile = $('#main_img'),
            filepath = inputFile.val(),	
            input = $("#main_img_name");
            
            filepath = filepath.replace(/c:\\fakepath\\/gmi,""),
            input.val(filepath)
	};

	setUpListnerFileupload();

	changefileUpload();
	
	var setUpListnerFileupload = function (){
	$('#watermark').on('change', changefileUpload);
	};
    
	
	var changefileUpload = function (){
		var 
			inputFile = $('#watermark'),
            filepath = inputFile.val(),	
            input = $("#watermark-name");
            
            filepath = filepath.replace(/c:\\fakepath\\/gmi,""),
            input.val(filepath)
	};

	setUpListnerFileupload();

	changefileUpload();
});

// opacity slider
$(function() {
    $( ".opacity__slider" ).slider({
      range: "min",
      value: 37,
      min: 0,
      max: 1,
	  step: 0.1,
      slide: function( event, ui ) {
        $( "#opacity__input" ).val( "$" + ui.value );
      }
    });
	$( "#opacity__input" ).val( "$" + $( ".opacity__slider" ).slider( "value" ) );
  });
  });

