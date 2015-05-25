;$(function(){
	/*	mailTips v0.1
	**	ah.yiru@gmail.com 
	**	https://github.com/ahyiru/mailTips
	*/
	var mail=['@qq.com','@gmail.com','@126.com','@163.com','@hotmail.com','@yahoo.com','@live.com','@sohu.com','@sina.com'],
		ml=mail.length,
		cur=-1,
		mymail=$('#mymail');
	mymail.append('<input type=\"text\"><ul></ul>');
	var myinput=mymail.find('>input'),
		myul=mymail.find('>ul');
	var w=myinput.width()+2;
	myul.css('width',w);
	myul.hide();
	myinput
		.on('input',function(){
			cur=-1;
			var ival=$(this).val(),
				showmail=[];
				li='';
			//console.log(ival);
			if(ival==='') myul.hide();
			else myul.show();
			for(var i=0;i<ml;i++){
				li+='<li>'+ival+''+mail[i]+'</li>';
			}
			
			if(/@/.test(ival)){
				li='';
				var fi=ival.replace(/@.*/,''),
					ni=ival.replace(/.*@/,'');
				$.map(mail,function(n){
					var myreg=new RegExp(ni);
					if(myreg.test(n)){
						showmail.push(n);
					}
				})
				for(var i=0,sml=showmail.length;i<sml;i++){
					li+='<li>'+fi+''+showmail[i]+'</li>';
				}
			}
			
			myul.html(li);
			
			var myli=myul.find('li');
			myli.each(function(i){
				$(this).on('click',function(e){
					e.stopPropagation();
					myinput.val($(this).text());
					myul.hide();
				})
				
				$(this).on('mouseenter',function(){
					$(this).css('cursor','pointer');
					$(this).addClass('mail-sel').siblings().removeClass('mail-sel');
					cur=i;
					myinput.val($(this).text());
				})
			})
			
			
		})
		.on('keyup',function(e){
			var k=e.which||e.keyCode,
				li=myul.find('li'),
				l=li.length;
			switch(k){
				case 38:
					myul.show();
					cur--;
					if(cur<0) cur=l-1;
					li.eq(cur).addClass('mail-sel').siblings().removeClass('mail-sel');
					myinput.val(li.eq(cur).text());
					break;
				case 40:
					myul.show();
					cur++;
					if(cur==l) cur=0;
					li.eq(cur).addClass('mail-sel').siblings().removeClass('mail-sel');
					myinput.val(li.eq(cur).text());
					break;
				case 13:
					if(cur>-1){
						myul.hide();
						cur=-1;
						break;
					}
			}
		})
	
	$(document).on('click',function(e){
		e.stopPropagation();
		myul.hide();
	})
})