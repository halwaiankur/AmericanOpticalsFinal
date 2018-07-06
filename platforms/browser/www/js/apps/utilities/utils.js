define(["app"], function(App){
	/**
	* This is a description		
	* @method showDocumentList
	* @return null
	* @Description This function shows the document tabs list
	*/	
	var object = {
		/**
		* This is a description		
		* @method validateFields
		* @return null
		* @Description This function validates model
		*/	
		validateFields: function(model, fieldArr) {
			console.log(model);
			console.log(fieldArr);
			var isValid = model.isValid(fieldArr);
            if (!isValid) {
                var msg = "";
                var no = 1;
                var msgArr = model.validate();
                for (i in msgArr) {
                    for (j in fieldArr) {
                        if (i == fieldArr[j]) {
                            msg = msg + no + '. ' + msgArr[i] + '\n';
                            no = no + 1;
                        }
                    }
                }
                alert(msg);
            }
            return isValid;
        }
	}
	return object;
});