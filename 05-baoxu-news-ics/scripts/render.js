/**
 * Author: Baoxu
 * Date:   12-11-29
 * Time:   下午2:52
 */

function renderHeadline(data, columnId){
	var dataList = data[columnId];
	var headImgArea = $$("head-img").getElementsByTagName("ul")[0].getElementsByTagName("li")[0];
	headImgArea.getElementsByTagName("img")[0].setAttribute("src", dataList[0].imgsrc);
	headImgArea.getElementsByTagName("h6")[0].innerHTML = dataList[0].title;

	for(var i = 1 ; i < dataList.length ; i++){

	}
}
