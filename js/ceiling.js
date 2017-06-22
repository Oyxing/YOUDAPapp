 
 
   document.getElementById("translate").addEventListener('click', function() {
                var value = $(".discrete").val();
                val(value)
		        });


        function val(value){
           $.ajax({
                type: "get",
                url: "../php/api.php",
                dataType: "json",
                data:{q:value,},
                success: function(data) {	
                        
                     console.log(data)   

                }
                
              });
         }       