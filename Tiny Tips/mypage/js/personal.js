function dispalyRewrite() {				/*用于把修改信息的表单隐藏起来*/
	if(!document.getElementById) return false;
	if(!document.getElementById('rewrite')) return false;
	var setData = document.getElementById('rewrite');
	setData.style.display = 'none';
}

addLoadEvent(dispalyRewrite);

function toRewrite() {				/*给修改按钮的onclick事件添加方法,把本来信息预览的模块隐藏,把修改信息的模块显示出来*/
	if(!document.getElementById) return false;
	if(!document.getElementById('toRewrite')||!document.getElementById('rewrite')||!document.getElementById('data')) return false;
	var to_Rewrite = document.getElementById('toRewrite');
	var rewrite = document.getElementById('rewrite');
	var data = document.getElementById('data');
	to_Rewrite.onclick = function () {
		data.style.display = 'none';
		rewrite.style.display = 'inline-block';
		return false;
	}
}

addLoadEvent(toRewrite);

function setSubmit() {			/*用来给提交按钮添加onclick方法,判断表单内容并修改信息*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.getElementById('rewrite')||!document.getElementById('data')) return false;
	var rewrite = document.getElementById('rewrite');
	var data = document.getElementById('data');
	var home_data = document.getElementById('personalData');
	var submit = rewrite.getElementsByTagName('button')[0];			
	submit.onclick = function() {																	/*应该显示这些内容的元素节点*/
		var newName = document.getElementById('setName').value;			/*取得所有表单的内容和通过id获得*/
		var newSex = document.getElementById('setSex').value;
		var newAge = document.getElementById('setAge').value;
		var newSchool = document.getElementById('setSchool').value;
		var newBirth = document.getElementById('setBirth').value;
		var newPlace = document.getElementById('setPlace').value;
		var data_infor = data.getElementsByTagName('td');
		var home_infor = home_data.getElementsByTagName('td');
		if(newName.length<8) {
				if(newName.replace(/\s+/g, '') != '') {											/*对表单填入的内容进行判断*/			
				data_infor[1].firstChild.nodeValue = newName;										/*如果内容为空则不修改信息*/													
				home_infor[1].firstChild.nodeValue = newName;								/*同时把主页的个人基本信息内容进行修改*/
			}	
		}
		else {
			alert('姓名输入过长');
			return false;
		}									/*下面进行相同操作*/
		if(newAge) {
			if(newAge > 0 && newAge <100) {														/*对年龄范围的认证*/
				data_infor[5].firstChild.nodeValue = newAge;
				home_infor[5].firstChild.nodeValue = newAge;
			}
			else {
				alert('请输入正确的年龄');
				return false;
			}
		}
		if(newSchool.length<15) {
				if(newSchool.replace(/\s+/g, '') != '') {
				data_infor[7].firstChild.nodeValue = newSchool;
				home_infor[7].firstChild.nodeValue = newSchool;
			}
		}
		else {
			alert('学校输入过长');
			return false;
		}
		if(newBirth) {
			data_infor[9].firstChild.nodeValue = newBirth;
		}
		if(newPlace<15) {
				if(newPlace.replace(/\s+/g, '') != '') {
				data_infor[11].firstChild.nodeValue = newPlace;
			}
		}
		else {
			alert('地名输入过长');
			return false;
		}
		data_infor[3].firstChild.nodeValue = newSex;
		home_infor[3].firstChild.nodeValue = newSex;					/*修改主页显示的部分个人内容*/
		rewrite.style.display = 'none';											/*点击提交的同时把表单隐藏,把本来显示的内容弹出*/
		data.style.display = 'inline-block';
		document.getElementById('setName').value='';				/*把表单的内容设为空*/
		document.getElementById('setAge').value='';
		document.getElementById('setBirth').value='';
		document.getElementById('setSchool').value='';
		document.getElementById('setPlace').value='';
		return false;																				/*返回false保证没有触发提交跳转*/
	}
}

addLoadEvent(setSubmit);