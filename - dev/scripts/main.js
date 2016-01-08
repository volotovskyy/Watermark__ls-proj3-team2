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
      min: 1,
      max: 700,
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.value );
      }
    });

  });

