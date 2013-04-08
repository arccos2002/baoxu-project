// JavaScript Document

//全局预定义变量
var X = 10;//总行数
var Y = 8;//总列数
var TYPE = 15;//图形种类

var st;//时间控件
var TmpTime = 0;//当前时间
var TotalTime = 60;//总时间
var TimeBarLen = 300;//时间条初始长度
var TimeBarAle = 8;//时间条警告长度

var clickCla = "url(img/clicked.png) no-repeat center";//点击之后，图片背景样式
var clickNoCla = "none";//点击之后，不同，没消除的背景
var clickYesCla = "url(img/click_right.png)  no-repeat center";//点击之后，相同，消除了的背景
var llkTable;//定义tbl为连连看表格容器

//====================================================================//
//                         全局通用函数                                 //
//====================================================================//

//用户简化ID索引
function CBX_SLCT(id){
	var id;
	return document.getElementById(id);
}

//系统初始化
function init(){
	//填充时间初始值，指向timer();
	CBX_SLCT("timeleft").innerHTML = TotalTime + "/" + TotalTime;
	//已走过的时间还原
	TmpTime = TotalTime;
	//清除计时定时器
	clearInterval(st);
	//激活开始按钮
	CBX_SLCT("start_button").disabled=false;
	//还原进度条的颜色
	CBX_SLCT("timebar").style.backgroundColor = "#0000CC";
	//还原进度条的长度
	CBX_SLCT("timebar").style.width = TimeBarLen + "px";
	//构造连连看表格变量
	llkTable = CBX_SLCT("llk_table");
	//隐藏连连看表格
	CBX_SLCT("llk_table").style.display="none";
}


//====================================================================//
//                       布局矩阵的算法模块                                                                          //
//====================================================================//

//为了算法方便，矩阵的第1行，第1列，最后1行，最后1列都标注为0，天然通路。
var arr = new Array(Y);//构建行数组
var p1 = null;//搜索路径用的第1个点的坐标
var p2 = null;//搜索路径用的第2个点的坐标
var e1 = null;//第1个点对应的元素
var e2 = null;//第2个点对应的元素

//路径搜索，给出两个点，搜索出通路
function getPath(p1, p2){
	//开始搜索前对p1,p2排序，使p2尽可能的在p1的右下方。
	//这样做可以简化算法
	if(p1.x>p2.x){
		var t = p1; 
		p1 = p2;
		p2 = t;	
	}
	else if(p1.x==p2.x){
		if(p1.y>p2.y){
			var t = p1; 
			p1 = p2;
			p2 = t;	
		}
	}
	//通过分析连连看中两点之间的位置关系，逐步由简到难分析每一种类型
	//第一种类型， 两点是否在一条直线上，而且两点之间可直线连通
	if((onlineY(p1, p2)||onlineX(p1, p2)) && hasLine(p1, p2)){
		status = 'type 1';
		return [p1,p2];
	}
	//第二种类型， 如果两点中任何一个点被全包围，则不通。
	if( !isEmpty({x:p1.x, y:p1.y+1}) && !isEmpty({x:p1.x, y:p1.y-1}) && !isEmpty({x:p1.x-1, y:p1.y}) && !isEmpty({x:p1.x+1, y:p1.y}) ){
		status = 'type 2';
		return null;
	}
	if( !isEmpty({x:p2.x, y:p2.y+1}) && !isEmpty({x:p2.x, y:p2.y-1}) && !isEmpty({x:p2.x-1, y:p2.y}) && !isEmpty({x:p2.x+1, y:p2.y}) ){
		status = 'type 2';
		return null;
	}
	//第三种类型， 两点在一条直线上，但是不能直线连接
	var pt0, pt1, pt2, pt3;
	//如果都在x轴，则自左至右扫描可能的路径，
	//每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通
	if(onlineX(p1, p2)){
		for(var i=0; i<Y; i++){
			if(i==p1.y){
				continue;
			}
			pt0 = p1;
			pt1 = {x: p1.x, y: i};
			pt2 = {x: p2.x, y: i};
			pt3 = p2;
			//如果顶点不为空，则该路不通。
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
				return [pt0, pt1, pt2, pt3];
			}
		}
	}
	//如果都在y轴，则自上至下扫描可能的路径，
	//每次构造4个顶点pt0, pt1, pt2, pt3，然后看他们两两之间是否连通
	if(onlineY(p1, p2)){
		for(var j=0; j<X; j++){
			if(j==p1.x){
				continue;	
			}
			pt0 = p1;
			pt1 = {x:j, y:p1.y};
			pt2 = {x:j, y:p2.y};
			pt3 = p2;
			//如果顶点不为空，则该路不通。
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
				return [pt0, pt1, pt2, pt3];
			}
		}
	}
	//第四种类型， 两点不在一条直线上。
	//先纵向扫描可能的路径
	//同样，每次构造4个顶点，看是否可通
	for(var k=0; k<Y; k++){
			pt0 = p1;
			pt1 = {x:p1.x, y:k};
			pt2 = {x:p2.x, y:k};
			pt3 = p2;
			status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
			//特殊情况，如果pt0和pt1重合
			if(equal(pt0,pt1)){
				//如果pt2不为空，则此路不通
				if(!isEmpty(pt2)){
					continue;
				}
				if( hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
					return [pt1, pt2, pt3];
				}
				else{
					continue;
				}
			}
			//特殊情况，如果pt2和pt3重合
			else if(equal(pt2,pt3)){
				//如果pt1不为空，则此路不通
				if(!isEmpty(pt1)){
					continue;
				}
				if( hasLine(pt0, pt1) && hasLine(pt1, pt2) ){
					return [pt0, pt1, pt2];
				}
				else{
					continue;
				}
			}
			//如果pt1, pt2都不为空,则不通
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				return [pt0, pt1, pt2, pt3];
			}
	}
	//横向扫描可能的路径
	for(var k=0; k<X; k++){
			pt0 = p1;
			pt1 = {x:k, y:p1.y};
			pt2 = {x:k, y:p2.y};
			pt3 = p2;
			status = '(x:' + pt0.x + ',y:' + pt0.y + ')' + ', (x:' + pt1.x + ',y:' + pt1.y + ')' + ', (x:' + pt2.x + ',y:' + pt2.y + ')' + ', (x:' + pt3.x + ',y:' + pt3.y + ')';
			if(equal(pt0,pt1)){
				if(!isEmpty(pt2)){
					continue;
				}
				if( hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
					return [pt1, pt2, pt3];
				}
			}
			if(equal(pt2,pt3)){
				if(!isEmpty(pt1)){
					continue;
				}
				if( hasLine(pt0, pt1) && hasLine(pt1, pt2) ){
					return [pt0, pt1, pt2];
				}
			}
			if(!isEmpty(pt1) || !isEmpty(pt2)){
				continue;
			}
			if( hasLine(pt0, pt1) && hasLine(pt1, pt2) && hasLine(pt2, pt3) ){
				return [pt0, pt1, pt2, pt3];
			}
	}
	//status='type4';
	return null;
	/********** end type 4 **************/
}

//判断是否重合
function equal(p1, p2){
	return ((p1.x==p2.x)&&(p1.y==p2.y));
}

//判断是否都在X轴上
function onlineX(p1, p2){
	return p1.y==p2.y;
}

//判断是否都在Y轴上
function onlineY(p1, p2){
	return p1.x==p2.x;	
}

//判断某点是否为空
function isEmpty(px){
	return (arr[px.y][px.x]==0);
}

//判断两点间是否有通路
function hasLine(p1, p2){
	//重合，肯定有通路
	if(equal(p1, p2)){
		return true;
	}
	//如果同在Y轴，且之间无阻碍，表示有通路
	if(onlineY(p1, p2)){
		var i = p1.y>p2.y?p2.y:p1.y;
		i = i+1;
		var max = p1.y>p2.y?p1.y:p2.y;
		for(; i<max; i++){
			var p = {x: p1.x, y: i};
			if(!isEmpty(p)){
				break;
			}
		}
		if(i==max){
			return true;
		}
		return false;
	}
	//如果同在X轴，且之间无阻碍，表示有通路
	else if(onlineX(p1, p2)){
		var j = p1.x>p2.x?p2.x:p1.x;
		j = j+1;
		var max = p1.x>p2.x?p1.x:p2.x;
		for(; j<max; j++){
			var p = {x: j, y: p1.y};
			if(!isEmpty(p)){
				break;
			}
		}
		if(j==max){
			return true;
		}
		return false;
	}
}


//====================================================================//
//                      连连看表格生成模块                                                                             //
//====================================================================//

var t1, t2;

//将tbl中的元素初始化清空
function tbl_init(){
	//得到tbl的子节点
	var tbl_children = llkTable.childNodes;
	//遍历并清空表中的行和列
	for(var a=0; a<tbl_children.length; a++){
		llkTable.removeChild(tbl_children[a]);
	}
}

//开始按钮事件，参数为用户图片地址组成的数组
function baoxu_start(user_play_photo){
	
	init();//系统初始化
	tbl_init();//表格初始化
	timer();//启动倒计时
	
	CBX_SLCT("llk_table").style.display="block";
	
	//构造图片库
	var imgs = [];
	imgs = user_play_photo;
	
	//构造table
	for(var row=0;row<Y-2;row++){
		var tr=llkTable.insertRow(-1);
		for(var col=0;col<X-2;col++) {
			var td=tr.insertCell(-1);
		}
	}
	//构造矩阵，arr定义为一维数组，现在重写为二维数组
	//arr[i][j]当前指向全表，包括连连看边界表格
	for(var i=0; i<Y; i++){
		arr[i] = new Array(X);
		for(var j=0; j<X; j++){
			arr[i][j] = 0;
		}
	}
	//total是连连看中有头像的表格个数
	var total = (X-2)*(Y-2);
	//tmp用于产生随机位置，个数等于有头像的格子个数
	var tmp = new Array(total);
	for(var i=0; i<total; i++){
		tmp[i] = 0;
	}
	//头像要成对出现
	for(var i=0; i<total; i++){
		if(tmp[i]==0){
			//如果这个格子没有头像，随机在头像库里给一个头像
			var t = Math.floor(Math.random()*TYPE);//t的集合如下：0<=t<=TYPE-1
			tmp[i] = t;
			//同时给另外一个随机的格子赋一个一样的头像值
			while(true){
				var c = Math.floor(Math.random()*total);
				if(tmp[c]==0){
					tmp[c] = t;
					break;
				}
			}
		}
	}
	//替换一个头像，最后能够配对
	while(true){
		var imgOld = Math.floor(Math.random()*total);
		var imgNew = Math.floor(Math.random()*total);
		if(imgOld!=imgNew){
			if(tmp[imgOld]!=tmp[imgNew]){
				tmp[imgOld]=tmp[imgNew];
				break;
			}
		}
	}
	//向表格中写入头像
	var c = 0;
	for(var i=1; i<Y-1; i++){
		for(var j=1; j<X-1; j++){
			arr[i][j] = tmp[c++];
			llkTable.rows[i-1].cells[j-1].innerHTML = "<img src=\"" + imgs[arr[i][j]] + "\" />";
		}	
	}	
	//全局绑定鼠标事件
	var img1, img2;
	//如果被点击的是TD，则赋值给img1或img2
	document.body.onclick = function(e){
		var el = document.all?event.srcElement:e.target;
		if(el.parentNode.tagName!="TD"){
			return;
		}
		if(!img1){
			img1 = el;
		}
		else{
			img2 = el;
		}
		//点击之后，做上标记，加边框
		el.parentNode.style.background = clickCla;
		
		el = el.parentNode;
		if(el.innerHTML==""){
			p1 = p2 = e1 = e2 = null;
		}
		var r = el.parentNode.rowIndex +1;
		var c = el.cellIndex +1;
		if(p1==null){
			p1 = {x:c, y:r};
			e1 = el;
		}
		else{
			p2 = {x:c, y:r};
			e2 = el;
			//如果p1和p2不是同一个，并且p1和p2里面的头像相同
			if(!equal(p1, p2)&&e1.innerHTML==el.innerHTML){
				//那么查看是否有通路
				var path = getPath(p1, p2);
				if(path!=null){
					//如果有通路，清空刚选择的两个格子
					e1.innerHTML = e2.innerHTML = "";
					//清空之后，背景变成对勾
					e1.style.background = e2.style.background = clickYesCla;
					//同时清空该格子对应的头像数组值
					arr[p1.y][p1.x] = arr[p2.y][p2.x] = 0;
					//检查是否完成
					CheckFinish();
					//奖励时间
					TmpTime = TmpTime+0.5;
				}
			}

			if(t1){t1.style.background = clickNoCla;}
			t1 = e1;
			if(t2){t2.style.background = clickNoCla;}
			t2 = e2;
			e1.style.background = e2.style.background = clickYesCla;
			//img1.style.border = 'solid #fff 3px';
			//img2.style.border = 'solid #fff 3px';
			p1 = p2 = e1 = e2 = img1 = img2 = null;
			//t1.style.backgroundColor = t2.style.backgroundColor = 'lightpink';
			//t1.style.background = t2.style.background = clickYesCla;
		}
	};
}


//====================================================================//
//                          时间处理模块                                                                                 //
//====================================================================//

//计时器
function timer(){
	//时间归零
	clearInterval(st);
	TmpTime = TotalTime;
	st = setInterval("ShowTime()",1000);//开始倒计时
	CBX_SLCT("timeleft").innerHTML = TotalTime + "/" + TotalTime;
	CBX_SLCT("start_button").disabled=true;
}

//更新时间显示
function ShowTime(){	
 	TmpTime--;//时间减1 
 	//更新时间显示 
 	CBX_SLCT("timeleft").innerHTML = Math.floor(TmpTime) + "/" + TotalTime; 
 	CBX_SLCT("timebar").style.width = Math.floor(TimeBarLen*TmpTime/TotalTime) + "px"; 
 	if( TmpTime < TimeBarAle ){ 
 		CBX_SLCT("timebar").style.backgroundColor = "red"; 
 	} 
	
 	var TmpTime_check = Math.floor(TmpTime);
 	
 	if(!TmpTime_check){//剩余时间为0 
 		clearInterval(st);//清除倒计时
 		CBX_SLCT("timeleft").innerHTML = ""; 
 		CBX_SLCT("timebar").style.backgroundColor = "white"; 
		CBX_SLCT("start_button").disabled=false;
 		baoxu_alert("时间到！"); 
 	} 
}

//检查是否已完成
function CheckFinish(){
	//记录已经有几个空的TD
	var bl_c=1;
	//计算总共有几个TD
	var bl_d=(Y-2)*(X-2);
	for(var bl_a=1; bl_a<Y-1; bl_a++){
		for(var bl_b=1; bl_b<X-1; bl_b++){
			//当TD不为空时，三个变量都还原，下一轮重新开始
			if(llkTable.rows[bl_a-1].cells[bl_b-1].innerHTML !=''){
				bl_a=1;
				bl_b=1;
				bl_c=1;
				return null;
			}else{
				//如果TD为空，那么bl_c加1
				bl_c++;
			}
			//如果已有的空格数等于总得空格数，表示用户已经结束了
			if(bl_c==bl_d){
				init();
				baoxu_alert("你赢了！"); 
				return [X,Y];
			}
		}	
	}
}

//====================================================================//
//                          结果反馈模块                                                                                 //
//====================================================================//

function baoxu_alert(str){
	var msgw,msgh,bordercolor; 
	msgw=400;//提示窗口的宽度 
	msgh=100;//提示窗口的高度 
	titleheight=25;//提示窗口标题高度 
	bordercolor="#c51100";//提示窗口的边框颜色 
	titlecolor="#c51100";//提示窗口的标题颜色 
	 
	var sWidth,sHeight;
	sWidth = document.documentElement.clientWidth;
	sHeight = document.documentElement.clientHeight;

	var bgObj=document.createElement("div"); 
	bgObj.setAttribute('id','bgDiv'); 
	bgObj.style.position="absolute"; 
	bgObj.style.top="0"; 
	bgObj.style.background="#cccccc"; 
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75"; 
	bgObj.style.opacity="0.6"; 
	bgObj.style.left="0"; 
	bgObj.style.width=sWidth + "px"; 
	bgObj.style.height=sHeight + "px"; 
	bgObj.style.zIndex = "10000"; 
	document.body.appendChild(bgObj); 
	 
	var msgObj=document.createElement("div");
	msgObj.setAttribute("id","msgDiv"); 
	msgObj.setAttribute("align","center"); 
	msgObj.style.background="white"; 
	msgObj.style.border="1px solid " + bordercolor; 
	msgObj.style.position = "absolute"; 
	msgObj.style.left = "50%"; 
	msgObj.style.top = "50%"; 
	msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif"; 
	msgObj.style.marginLeft = "-225px" ; 
	msgObj.style.marginTop = -75+document.documentElement.scrollTop+"px"; 
	msgObj.style.width = msgw + "px"; 
	msgObj.style.height =msgh + "px"; 
	msgObj.style.textAlign = "center"; 
	msgObj.style.lineHeight ="25px"; 
	msgObj.style.zIndex = "10001";

   var title=document.createElement("h4"); 
   title.setAttribute("id","msgTitle"); 
   title.setAttribute("align","right"); 
   title.style.margin="0"; 
   title.style.padding="3px"; 
   title.style.background=bordercolor; 
   title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);"; 
   title.style.opacity="0.75"; 
   title.style.border="1px solid " + bordercolor; 
   title.style.height="18px"; 
   title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif"; 
   title.style.color="white"; 
   title.style.cursor="pointer"; 
   title.innerHTML="关闭"; 
   title.onclick=function(){ 
		document.body.removeChild(bgObj); 
		CBX_SLCT("msgDiv").removeChild(title); 
		document.body.removeChild(msgObj); 
		init();
		};
   document.body.appendChild(msgObj); 
   CBX_SLCT("msgDiv").appendChild(title); 
   var txt=document.createElement("p"); 
   txt.style.margin="1em 0";
   txt.setAttribute("id","msgTxt"); 
   txt.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
   txt.innerHTML=str; 
   CBX_SLCT("msgDiv").appendChild(txt); 
}


//====================================================================//
//                      微博数据处理模块                                                                                  //
//====================================================================//

//判断用户的关注数够不够最低数目，不过不够，则没有办法玩游戏
function user_Enough(photoArray){
	//总共的好友数
	var all_friend = photoArray.length;
	//如果好友数量少于需要的头像TYPE数的话
	if(all_friend<TYPE){
		baoxu_alert("您关注的好友数量不足15人!")
	}
}

//Load表格数据，将用户关注的人的头像数组和ID数组传过来，并按照定义的行列显示
function user_Load(photoArray,idArray,nameArray,rowCount,colCount)
{
	//数据数组
	var ph_data=photoArray;
	var id_data=idArray;
	var na_data=nameArray;
	//定义table对象
	var userTable=CBX_SLCT("user_table");//获取表格ID
	//如果表格有内容，清空
	if (userTable.rows.length>0){
		for(var clr=userTable.rows.length-1;clr>=0;clr--){
			userTable.deleteRow(clr);
		}
	}
	
	if(ph_data.length > (rowCount*colCount)){
		var userFirstChange=ph_data.length-(rowCount*colCount);
		var userFirst=Math.floor(Math.random()*userFirstChange);
	}else{
		var userFirst=0;
	}
	//遍历表格
	for(var r=0;r<rowCount;r++){
		//获取行
		var row=document.createElement("tr");
		for (var i=0;i<colCount;i++){
			var chIndex = r*colCount+i+userFirst;
			if (chIndex >= ph_data.length){
				break;
			}
			var cell=document.createElement("td");
			//定义TD内部的label
			var td_innerHtml_lab_fir = "<label for=\"" + id_data[chIndex] + "\">";
			var td_innerHtml_lab_sec = "</label>";
			//定义TD内部的img
			var td_innerHtml_img = "<img title=\"" + na_data[chIndex] + "\" src=" + ph_data[chIndex] + " />";
			//定义img上的icon
			//var td_innerHtml_icon = "<img src=" + ph_data[chIndex] + " />";
			//定义TD内部的input
			var td_innerHtml_input = "<input type=\"checkbox\" id=\"" + id_data[chIndex] + "\" value=\"" + id_data[chIndex] + "\" name=\"" +ph_data[chIndex]+ "\" />";
			cell.innerHTML = td_innerHtml_lab_fir + td_innerHtml_img + td_innerHtml_lab_sec + td_innerHtml_input + na_data[chIndex].substr(0, 3);
			row.appendChild(cell);
		}
	userTable.appendChild(row);
	}
}

//随机选取好友头像
function selectUserRandom(rowCount,colCount){
	//所有的头像
	var input_all = CBX_SLCT("user_table").getElementsByTagName("input");
	//可供选取的范围
	var select_range = rowCount*colCount;
	//已经选择的数量
	var input_selected = 0;
	//如果选取数量少于15个，则继续选取
	while(input_selected < 15){
		input_selected = 0;
		//查询已经选择的数量
		for(var input_i=0;input_i<input_all.length;input_i++){ 
			if(input_all[input_i].type == 'checkbox' && input_all[input_i].checked == true){
				input_selected++;
			}
		}
		//随机给于一个头像进行选取
		var select_random = Math.floor(Math.random()*select_range);
		input_all[select_random].checked = true;
	}
}


//选择好友
function chooseUser(){ 
	var check_i;
	var userPlayPhoto = [];
	var userPlayId = [];
	var check_all = CBX_SLCT("user_table").getElementsByTagName("input");
	for(check_i=0;check_i<check_all.length;check_i++){ 
		if(check_all[check_i].type == 'checkbox' && check_all[check_i].checked == true){
			//alert( '选中的复选框的值包含： '+ check_all[check_i].value);
			userPlayPhoto.push(check_all[check_i].name);
			userPlayId.push(check_all[check_i].value);
		}
	}
	//开始游戏
	hideNode("user_control");
	hideNode("user_table");
	baoxu_start(userPlayPhoto);
}

//隐藏表格
function hideNode(nowNodeId){
	var nodeToHide = CBX_SLCT(nowNodeId);
	nodeToHide.style.display = "none";
}