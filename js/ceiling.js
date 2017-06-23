var url = window.location.href;
var valLue = url.split("?")[1];
val(valLue);
var htm1 = "";
var heml2 = "";
var heml3 = "";
var html4 = "";
 document.getElementById("translate").addEventListener('click', function() {
    var value = $(".discrete").val();
    $(".shyTab").children().remove();
    $(".nounul").children().remove();
    $(".tnav").children().remove();
    $(".wtcont").children().remove();
    val(value);
});
function val(value) {
    html1 = "";
    $.ajax({
        type: "get",
        url: "../php/api.php",
        data: { q: value },
        success: function(data) {
            // 单词
            var obj = JSON.parse(data.substr(value.length));
            var uKphone = obj.ec.word[0].ukphone;
            var uSphone = obj.ec.word[0].usphone;
            var name = obj.input;
            console.log(obj)

            // if(obj.longman.isGood == true){
            //         alert("有");
            //     }else{
            //         alert("没有")
            //     }
                
        
            var uKvideocal = obj.splongman.wordList[0].Entry.Head[0].VIDEOCAL[0]
            html1 = '<div class="shyTab">' +
                '<h2 class="h2-shy">' +
                '<span>' + name + '</span>' +
                '<a href="#" style="font-size:0.8em;color:#ccc;margin: 0px 0px 0px 8px;" class="glyphicon glyphicon-plus shy-josn" title="添加单词"></a>' +
                '<div class="pronounce">' +
                '<span class="pronoun" style="font-size: 0.7em;">' +
                '英' +
                '<span style="font-size:0.5em;margin:0 0.8em;">[' + uKphone + ']</span>' +
                '<span title="真人发音" class="glyphicon glyphicon-volume-up " id="playle" style="color:#ccc;top:0.3em;">' +
                '<audio class="playle"  src=' + uKvideocal + ' ></audio>' +
                '</span>' +
                '</span>' +
                '</div>' +
                '</h2>';
            $('.shyTab').append(html1);
            // 多解释
            var objTrs = obj.syno.synos
            $.each(objTrs, function(index, vl) {
                html2 = '<li>' + vl.syno.pos + vl.syno.tran + '</li>'
                $(".nounul").append(html2)
            })
            // 多组词
            
            var objPhrs = obj.phrs.phrs
            $.each(objPhrs, function(index, vl) {
                html3 = '<p class="danci"> <span>' +
                    '<a href="#" style="color:#35a1d4;margin: 0px 12px;">' + vl.phr.headword.l.i + '</a>' +
                    vl.phr.trs[0].tr.l.i +
                    '</span></p>'
                $(".tnav").append(html3)
            })
            var op = $(".danci")
            for (i = 0; i < op.length; i++) {
                if (i > 6) {
                    op[i].className = "display";
                }
            }
            // 更多
            autoplay()
            var x = 1;
            $(".footnav").click(function() {
                if (x) {
                    for (i = 0; i < op.length; i++) {
                        op[i].className = "danci";
                    }
                    $(".more").html("");
                    $(".more").append("返回")
                    $(".dowup").removeClass("glyphicon glyphicon-menu-down")
                    $(".dowup").addClass("glyphicon glyphicon-menu-up")
                    x = 0;
                } else {
                    for (i = 0; i < op.length; i++) {
                        if (i > 6) {
                            console.log("if" + i);
                            op[i].className = "display";
                        }
                    }
                    $(".more").html("");
                    $(".more").append("更多")
                    $(".dowup").removeClass("glyphicon glyphicon-menu-up")
                    $(".dowup").addClass("glyphicon glyphicon-menu-down")
                    x = 1;
                }

            })
        //   网络意译


            $.each(obj.web_trans,function(index,vl){
                $.each(vl[0].trans,function(ind,v){
                        console.log(v.value)
                        console.log(vl[0].trans)
                 html4 = ' <div class="wt-cont" style="margin-top:20px;">'+
                        '<div class="title">'+
                            '<a href="#" class="glyphicon glyphicon-minus" style="color:#35a1d4;">'+
                                '<span style="cursor:pointer;color:#000;">'+v.value+'</span>'+
                            '</a>'+
                        '</div>'+
                        '<p>'+v.summary.line[0]+'</p>'+
                        '<p>基于'+v.support+'个网页<span>-</span>'+
                        '<a href="http://www.youdao.com/?cookie=new" style="color: #35a1d4;font-size: 12px;">相关网页</a>'+
                        '</p>'+
                    '</div>'  
                
                     $(".wtcont").append(html4)

                })
            })


     






        },
        error: function(res) {
            console.log(res);
            console.log("错了");
        }
    });
    
}

function autoplay() {
    // 英

    $("#playle").mouseenter(function() {
        $('audio')[0].play()

    })

}