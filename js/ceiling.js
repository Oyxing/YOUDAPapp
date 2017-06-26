var url = window.location.href;
var valLue = url.split("?")[1];
val(valLue);
var htm1 = "";
var heml2 = "";
var heml3 = "";
var html4 = "";
// 英英释义
var html5 = "";
var html6 = "";
var html7 = "";
var html8 = "";
var html9 = "";
var html10 = "";
// 词典
var html11 = "";
var html12 = "";
var html13 = "";
// 双语
var html14 = "";

document.getElementById("translate").addEventListener('click', function() {
    var value = $(".discrete").val();
    $(".shyTab").children().remove();
    $(".nounul").children().remove();
    $(".tnav").children().remove();
    $(".wtcont").children().remove();
    $(".wt-h").children().remove();
    $(".wt-h-ul").children().remove();

    $(".dict-ul").children().remove();
    $(".dict-h4").children().remove();
    $(".dict-span").children().remove();
    $(".ovadi").children().remove();
    val(value);
});



$(".auth").click(function(){
    var value = $(".discrete").val();
    location.href = "http://www.youdao.com/w/eng/"+value+"/#keyfrom=dict2.index"
})

      // 创建数据库
        var config = { //初始化websql数据库的参数信息
			name: 'mages',
			version: '2.0',
			desc: 'manage my mysql',
			size: 10 * 20 * 1024,
		};
		var db = window.openDatabase(config.name, config.version, config.desc, config.size);
		crateTable(db);
       		function crateTable() {

            // 创建数据表
        var sql = 'create table if not exists mages(id INTEGER PRIMARY KEY ASC,price TEXT, account TEXT,  note_date TEXT)';
			db.transaction(function(tx) {
				tx.executeSql(sql, null, function(tx, rs) {
					console.log('执行sql成功');
				});
			});
        }
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
            if(obj.splongman == undefined){
                  $( ".ifrom-lf").removeClass("display");
            }else{
            // 单词头部
              $( ".ifrom-lf").add("display");
                    var uKvideocal = obj.splongman.wordList[0].Entry.Head[0].VIDEOCAL[0]
                        html1 = '<div class="shyTab">' +
                            '<h2 class="h2-shy">' +
                            '<span>' + name + '</span>' +
                            '<a href="#" style="font-size:0.8em;color:#ccc;margin: 0px 0px 0px 8px;" id="addition" class="glyphicon glyphicon-plus shy-josn" title="添加单词"></a>' +
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

            }
            document.getElementById("addition").addEventListener('click',function(){
                var values
                var price = obj.splongman.wordList[0].Entry.Head[0].HWD[0];
               
                    $.each(obj.syno.synos, function(index, vl) {
                             
                                console.log(vl.syno.pos + vl.syno.tran)
                    var account = vl.syno.pos + vl.syno.tran
                           
                    localStorage.setItem("account",account)
                         localStorage.setItem("value",price)
                values = [price,account]
                        })
                        console.log(values)
        var sql = "INSERT INTO mages (price, account, note_date) VALUES (?,?,DATETIME('now', 'localtime'))";
			db.transaction(function(tx) {
				tx.executeSql(sql, values, function(tx, rs) {
						var effectRow = rs.rows;
                        console.log(tx)
				});
			})
        })
                
            if( obj.syno == undefined){
                  $( ".ifrom-lf").removeClass("display");
            }else{
              $( ".ifrom-lf").add("display");
                
            // 多解释
            var objTrs = obj.syno.synos;
            $.each(objTrs, function(index, vl) {
                    html2 = '<li>' + vl.syno.pos + vl.syno.tran + '</li>'
                    $(".nounul").append(html2)
                })
            }
            
            if(obj.phrs == undefined){
                  $( ".ifrom-lf").removeClass("display");
            }else{
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
            $.each(obj.web_trans, function(index, vl) {
                $.each(vl[0].trans, function(ind, v) {
                    html4 = '<div class="wt-cont" style="margin-top:20px;">' +
                        '<div class="title">' +
                        '<a href="#" onclick=" return false; " class="glyphicon glyphicon-minus wt-jia" style="color:#35a1d4;">' +
                        '<span style="cursor:pointer;color:#000;">' + v.value + '</span>' +
                        '</a>' +
                        '</div>' +
                        '<p class="wt-cont-p" style="margin:inherit;margin-left:15px;">' + v.summary.line[0] + '</p>' +
                        '<p class="wt-cont-p1" style="margin:inherit;margin-left:15px;">基于' + v.support + '个网页<span>-</span>' +
                        '<a href="http://www.youdao.com/?cookie=new" style="color: #35a1d4;font-size: 12px;">相关网页</a>' +
                        '</p>' +
                        '</div>'
                    $(".wtcont").append(html4)
                })
            })
            var title = document.querySelectorAll(".title")
            for (i = 0; i < $(".title").length; i++) {
                title[i].index = i;
                if (i >= 1) {
                    $(".wt-cont-p").eq(i).addClass("display");
                    $(".wt-cont-p1").eq(i).addClass("display");
                    $(".wt-jia").eq(i).removeClass("glyphicon glyphicon-minus");
                    $(".wt-jia").eq(i).addClass("glyphicon glyphicon-plus");
                }
                var x = 1;
                title[i].onclick = function() {
                    if (x) {
                        $(".wt-jia").eq(this.index).removeClass("glyphicon glyphicon-minus");
                        $(".wt-jia").eq(this.index).addClass("glyphicon glyphicon-plus");
                        $(".wt-cont-p").eq(this.index).addClass("display");
                        $(".wt-cont-p1").eq(this.index).addClass("display");
                        x = 0;
                    } else {
                        $(".wt-jia").eq(this.index).removeClass("glyphicon glyphicon-plus");
                        $(".wt-jia").eq(this.index).addClass("glyphicon glyphicon-minus");
                        $(".wt-cont-p").eq(this.index).removeClass("display");
                        $(".wt-cont-p1").eq(this.index).removeClass("display");
                        x = 1;
                        return;
                    }
                }
            }

            if(obj.ee == undefined){

               $( ".ifrom-lf").removeClass("display");

            }else{
            //    英英意译
            // 单词
            $.each(obj.ee.word, function(index, vl) {
                $.each(vl.l, function(index, vl) {
                    html5 = '<h4>' + vl + '<span style= "margin:0em 0.5em;font-size:0.3em;">[' + obj.ee.word.phone + ']</span></h4>'
                    $(".wt-h").append(html5)
                })
            })
            $.each(obj.ee.word.trs, function(index, vl) {

                html8 = '<span>' + vl.pos + '</span>'

                $.each(vl.tr, function(i, v) {
                    // 词句1
                    html10 = '<p class="wt-ul-p2">' + v.l.i + '</p></p>';
                    // 词句2
                    $.each(v.exam, function(index, ve) {
                        $.each(ve.f.l, function(index, ve1) {
                            html9 = '<span class="wt-ul-sp">' + ve1.i + '</span>';
                        })
                    })
                })
            })
            html6 = ' <li>' +
                html8 +
                '<ul>' +
                '<li>' +
                html9 +
                html10 +
                '</li>' +
                '</ul>' +
                '</li>'
            $(".wt-h-ul").append(html6)
            }
            if(obj.ec21 == undefined){
                  $( ".ifrom-lf").removeClass("display");
            }else{
                // 词典
            html13 = '<span>[' + obj.ec21.word[0].phone + ']</span>';
            $(".dict-h4").append(html13)
            $.each(obj.ec21.word[0].trs, function(index, vle) {
                $.each(vle.tr, function(index, ivl) {
                    html11 = '<li class="dict-li" style="margin-left:20px;"><span>' + index + '</span><span style="margin:0em 0.5em;">' + ivl.l.i[0] + '</span></li>'
                    $(".dict-ul").append(html11)
                })
                // html12 = '<span class="dict-span">' + vle.pos + '</span>';
                // $(".dict-span").append(html12)
            })

            var odicli = $(".dict-li")
            for (var i = 0; i < odicli.length; i++) {
                if (i > 7) {

                    odicli[i].className = "display";
                }
            }
            }
            
            if(obj.media_sents_part == undefined){
                  $( ".ifrom-lf").removeClass("display");
            }else{
                // 双语
                    $.each(obj.media_sents_part.sent, function(index, vl) {
                        html14 = '<p class="ovadi-p" style="margin: 1.2em 0em 0em 2em;"><span>' + index + '</span> <span>' + vl.eng + '</span> <span class="glyphicon glyphicon-volume-down clickaud" title="点击播放"  style="font-size:1.7em;top: 0.3em;left: 0.3em; color:#ccc;"></span>' +
                            '<audio class="audplayle"  src=' + vl.snippets.snippet[0].streamUrl + ' ></audio>  </p>'
                        $(".ovadi").append(html14);
                    })
                    $(".clickaud")
                    var clickaud = document.querySelectorAll(".clickaud");
                    var cliplay = document.querySelectorAll(".audplayle");
                    for (i = 0; i < $(".clickaud").length; i++) {
                        clickaud[i].index = i;
                        var x = 1;
                        clickaud[i].onclick = function() {
                            if (x) {
                                cliplay[this.index].play();
                                x = 0;
                            } else {
                                cliplay[this.index].pause();
                                x = 1;
                            }
                        }
                    }
            }

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

var wordhtml = "";
    document.getElementById("dropword").addEventListener('click',function(){
         $(".menuword").children().remove();
        //读取数据
			db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM mages', [], function(tx, results) {
				len = results.rows.length;
                    console.log(results.rows)

                    $.each(results.rows,function(index,vl){
                        console.log(vl)
                        console.log(vl.account)
                        console.log(vl.price)

                        wordhtml = '<li><a href="#" onclick="return false;"><span>'+vl.price+'</span><span style="margin:0em 0.3em;">'+vl.account+'</span><span style="margin:0em 0.3em;background-color:red;float:right;" onclick="texDelete('+vl.id+')">删除</span></a></li>'    
                            $('.menuword').append(wordhtml)
                    })

    
            	})
			});

    })

    	function texDelete(id){
				db.transaction(function(tx) {
				tx.executeSql('DELETE FROM mages WHERE id='+id);
			});
		}