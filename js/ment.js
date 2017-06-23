
//  吸顶

var ws,dh,top;
var x = 1;

  window.onscroll = sce;
             function sce(){
               var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
               if(scrollTop >= 205){
                  $(".ceiling").css({"display":"block"});
                    $(".popout").addClass("attach");
                  
               }else{
                  $(".ceiling").css({"display":"none"});
                    $(".popout").removeClass("attach"); 
               }
                 dH= $("#vista").height()
                 ws = $(window).scrollTop()
                top = $(window).height()
                console.log(top)
                var wtop = ws + top.innerHeight;
                if(wtop >= dH){

                    x++;
                    
                    if(x >= 10){
                        console.log("没有")
                    }else{
                    shop (x)
                    return;
                        
                    }

                }

             }
              //  api获取
  
function shop (x){
    console.log(x+"sad")
        var html = "";
           $.ajax({
                  type: "get",
                  url: "http://v3.wufazhuce.com:8000/api/onelist/idlist/",
                  dataType: "json",
                  
                  success: function(data) {		
                      	 objx = data.data; 
                    $.ajax({
                                type: "get",
                                url: "http://v3.wufazhuce.com:8000/api/onelist/"+ objx[x]+"/0",
                                dataType: "json",
                                success: function(data) {
                                        obj = data.data.content_list; 
                                        console.log(typeof data)
                                        console.log(obj)
                                 $.each(obj, function(index, vl) {
                                    // 文字
                                    forward = vl.forward;
                                    // 图片
                                    img_url = vl.img_url;
                                    // 时间
                                    last_update_date = vl.last_update_date;
                                    // 链接
                                    share_url =vl.share_url;
                                    // 名字
                                    words_info =vl.words_info;

                              html = '<div class="news">'+
                                '<a href='+share_url+'><img src='+img_url+' alt=""></a>'+
                                '<div class="news-detail col-md-9 col-xs-6">'+
                                    '<h3><a href="#">'+forward+'</a></h3>'+
                                    '<p></p>'+
                                    '<div class="note1">'+
                                        '<span class="glyphicon glyphicon-comment "></span>'+
                                    '<span class="note-t">0</span>'+
                                        '<span class="glyphicon glyphicon-thumbs-up "></span>'+
                                        '<span class="note-t">0</span>'+
                                    '</div>'+
                                    '<div class="note2">'+
                                        '<span class="note-t">'+words_info+'</span>'+
                                        '<span class="note-t">'+last_update_date+'</span>'+
                                '</div>'+

                                '</div>'+
                            '</div>';
                            $('#vista').append(html);
                           
                             
                    
                              })          
                            }
                        })	
                    }
                  })	
                }
           
