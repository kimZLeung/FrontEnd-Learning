function setSong (song_name, s_source) {		/*设定歌曲的方法,传入歌名和原地址*/
	if(!document.getElementById) return false;
	if(!s_source) return false;
	if(!document.getElementById('player')||!document.getElementById('songName')) return false;
	var player = document.getElementById('player');							/*用id获取audio元素*/
	var nameContainer = document.getElementById('songName');		/*用id获取放置歌名的元素*/
	player.setAttribute('src', s_source);												/*通过传进来的地址设定播放歌曲*/
	player.setAttribute('autoplay', 'autoplay');
	var song_text = document.createTextNode(song_name);
	var old_songName = nameContainer.firstChild;
	if(old_songName) {																					/*通过传进来的歌名更改歌名那个节点里的文本节点*/									
		nameContainer.replaceChild(song_text, old_songName);		/*如果本来存在有歌名,用新歌名来替换本来的歌名*/
	}
	else {
		nameContainer.appendChild(song_text);											/*如果本来没有歌名就直接加入*/
	}
	return true;
}

function shortName (interval, short_x, long_x) {						/*改名歌名节点宽度的动画函数,传入间隔时间,最小宽度和最大宽度*/
	if(!document.getElementById) return false;
	if(!document.getElementById('songName')) return false;
	var songName = document.getElementById('songName');
	var _length = parseInt(document.defaultView.getComputedStyle(songName).width);	/*获取本来的宽度*/
	if(songName.movement) {
		clearTimeout(songName.movement);
	}
	_length = _length-2;
	songName.style.width = _length+'px';
	if(_length == short_x) {																		/*如果到达最小宽度,设定下一个调用增加宽度的方法*/
		songName.movement = setTimeout('longName('+interval+','+short_x+','+long_x+')', interval);
	}
	else {																											/*如果还没到最小宽度就继续*/
		songName.movement = setTimeout('shortName('+interval+','+short_x+','+long_x+')', interval);
	}
}

function longName (interval, short_x, long_x) {							/*增加宽度的方法,传入间隔时间,最小宽度和最大宽度*/
	if(!document.getElementById) return false;
	var songName = document.getElementById('songName');
	var _length = parseInt(document.defaultView.getComputedStyle(songName).width);
	if(songName.movement) {
		clearTimeout(songName.movement);
	}
	if(_length == long_x) {																		/*如果到达最大宽度就结束*/
		return true;																						/*还没就继续设定时间继续执行*/
	}
	_length = _length+2;
	songName.style.width = _length+'px';
	songName.movement = setTimeout('longName('+interval+','+short_x+','+long_x+')', interval);
}

function shortBar(ele_id, short_wid, long_wid, interval) {			/*移动下方装饰的动画方法,传入元素的id,最小宽度*/
	if(!document.getElementById) return false;										/*最大宽度和间隔时间*/
	if(!document.getElementById(ele_id)) return false;
	if(!document.getElementById('player')) return false;
	var ele = document.getElementById(ele_id);
	var Player = document.getElementById('player');
	if(ele.move) {
		clearTimeout(ele.move);
	}
	var wid = parseInt(document.defaultView.getComputedStyle(ele).width);
	if(wid == short_wid) {																/*如果到了最小宽度就调用增长的方法*/
		ele.style.width = wid +'px';
		ele.move = setTimeout("longBar('"+ele_id+"',"+short_wid+','+long_wid+','+interval+')', interval);
	}
	else {
		wid=wid-2;
		ele.style.width = wid +'px';
		ele.move = setTimeout("shortBar('"+ele_id+"',"+short_wid+','+long_wid+','+interval+')', interval);
	}
}

function longBar(ele_id, short_wid, long_wid, interval) {		/*增长装饰的方法,传入元素id,最小宽度,最大宽度*/
	if(!document.getElementById) return false;								/*和间隔时间为参数*/
	if(!document.getElementById(ele_id)) return false;
	var ele = document.getElementById(ele_id);
	var Player = document.getElementById('player');
	if(ele.move) {
		clearTimeout(ele.move);
	}
	var wid = parseInt(document.defaultView.getComputedStyle(ele).width);
	if(wid == long_wid) {														/*当到达最大长度时会调用缩短的方法*/
		ele.style.width = wid +'px';
		ele.move = setTimeout("shortBar('"+ele_id+"',"+short_wid+','+long_wid+','+interval+')', interval);
	}
	else {
		wid=wid+2;
		ele.style.width = wid +'px';
		ele.move = setTimeout("longBar('"+ele_id+"',"+short_wid+','+long_wid+','+interval+')', interval);
	}
}

function playSong () {				/*为3首歌曲连接添加onclick事件，使点击时会播放音乐并更换歌名*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.getElementById('music')) return false;
	var music = document.getElementById('music');
	var list = music.getElementsByTagName('a');
	list[0].onclick = function () {
		var song_name = list[0].getAttribute('title') ? list[0].getAttribute('title'):'';
		var s_source = list[0].getAttribute('href');
		if(setSong(song_name, s_source)) {
			shortName(3, 10, 160);
			return false;	
		}
		else {
			return true;
		}
	}
	list[1].onclick = function () {
		var song_name = list[1].getAttribute('title') ? list[1].getAttribute('title'):'';
		var s_source = list[1].getAttribute('href');
		if(setSong(song_name, s_source)) {
			shortName(3, 10, 160);
			return false;
		}
		else {
			return true;
		}
	}
	list[2].onclick = function () {
		var song_name = list[2].getAttribute('title') ? list[2].getAttribute('title'):'';
		var s_source = list[2].getAttribute('href');
		if(setSong(song_name, s_source)) {
			shortName(3, 10, 160);
			return false;
		}
		else {
			return true;
		}
	}
}

addLoadEvent(playSong);

function moveBar() {
	if(!document.getElementById) return false;
	var player = document.getElementById('player');
	player.onplaying = function() {					/*为audio的播放和暂停事件添加方法*/
		shortBar('musicBar1', 100, 180, 10);	/*当audio开始播放的时候,这5条东西开始动*/
		shortBar('musicBar2', 130, 230, 10);
		shortBar('musicBar3', 150, 250, 10);
		shortBar('musicBar4', 100, 170, 10);
		shortBar('musicBar5', 120, 160, 10);
	}
	player.onpause = function() {						/*当音乐暂停播放的时候,清除掉他们的动画*/
		clearTimeout(musicBar1.move);
		clearTimeout(musicBar2.move);
		clearTimeout(musicBar3.move);
		clearTimeout(musicBar4.move);
		clearTimeout(musicBar5.move);
	}
}

addLoadEvent(moveBar);
