// Fake input
$(document).ready(function() {

	var setUpListnerFileupload = function (){
		$('#fileupload').on('change', changefileUpload);
	};
    
    var $inputfile = $("#add_project_picture");
	var changefileUpload = function (){
		var 
			inputFile = $('#fileupload'),
            filepath = inputFile.val(),	
            input = $("#filename");
            
            filepath = filepath.replace(/c:\\fakepath\\/gmi,""),
            input.val(filepath)
	};

	setUpListnerFileupload();

	changefileUpload();
});