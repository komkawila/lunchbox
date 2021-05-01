if(typeof lnw_store=='undefined'){window.lnw_store=new Vuex.Store({})}
var lnw_module_user=(function(){function queryString_from_object(obj){var keys=Object.keys(obj);if(keys.length==0){return ''}
var ppps=[];function buildParams(prefix,ddd){if(ddd==null){ppps.push(prefix+"=")}else if(Array.isArray(ddd)){ddd.forEach(function(dd){buildParams(prefix+'[]',dd)})}else if(typeof ddd=='object'){var kkk=Object.keys(ddd);kkk.forEach(function(kk){var dd=ddd[kk];buildParams(prefix+'['+kk+']',dd)})}else{ppps.push(prefix+"="+encodeURIComponent(ddd))}}
keys.forEach(function(key){var val=obj[key];buildParams(key,val)})
return ppps.join("&")}
function queryString_to_object(str){if(str.substr(0,1)=='?'){str=str.substr(1)}
return JSON.parse('{"'+decodeURI(str).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}')}
function buildURL(url,params){var queryString=queryString_from_object(params);if(queryString==''){return url}
var rquery=(/\?/);return url+(rquery.test(url)?"&":"?")+queryString}
function json_post(opt){var xhr=new XMLHttpRequest();var method='POST';if(opt.method){method=opt.method}
xhr.open(method,opt.url,!0);xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');xhr.setRequestHeader('Content-type','application/json; charset=utf-8');xhr.responseType='json';xhr.onload=function(){if(xhr.status!=200){if(typeof opt.error=='function'){opt.error()}else{alert('Load error')}
if(typeof opt.complete=='function'){opt.complete()}
return}
if(xhr.response==null){if(typeof opt.error=='function'){opt.error('RESPONSE_FAIL')}else{alert('Response error')}
if(typeof opt.complete=='function'){opt.complete()}
return}
if(typeof opt.success=='function'){if(typeof xhr.response.success=='undefined'){opt.success(xhr.response)}else if(xhr.response.success){var rdata=xhr.response.data||{};opt.success(rdata)}else{var rkey=xhr.response.key||'ERROR';var rdata=xhr.response.data||{};if(typeof opt.error=='function'){opt.error(rkey,rdata)}}}else{console.info(xhr.response)}
if(typeof opt.complete=='function'){opt.complete()}};xhr.onerror=function(){alert("Request failed");if(typeof opt.complete=='function'){opt.complete()}};if(typeof opt.start=='function'){opt.start()}
var ajaxdata=JSON.parse(JSON.stringify(opt.data||{}));ajaxdata.ajaxxxx=!0;ajaxdata.ajaxxxx_dataType='json';if(typeof opt.cache!=='undefined'&&opt.cache){}else{ajaxdata._=Date.now()}
if(lnw_store&&lnw_store.state.user.data&&lnw_store.state.user.data.csrf_token){ajaxdata.csrf_token=lnw_store.state.user.data.csrf_token}
xhr.send(JSON.stringify(ajaxdata))}
function json_get(opt){var xhr=new XMLHttpRequest();var url=opt.url;var ajaxdata=JSON.parse(JSON.stringify(opt.data||{}));ajaxdata.ajaxxxx=!0;ajaxdata.ajaxxxx_dataType='json';if(typeof opt.cache!=='undefined'&&opt.cache){}else{ajaxdata._=Date.now()}
url=buildURL(url,ajaxdata);xhr.open("GET",url,!0);xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');xhr.setRequestHeader('Content-type','application/json; charset=utf-8');xhr.responseType='json';xhr.onload=function(){if(xhr.status!=200){if(typeof opt.error=='function'){opt.error('LOAD_FAIL')}else{alert('Load error')}
if(typeof opt.complete=='function'){opt.complete()}
return}
if(xhr.response==null){if(typeof opt.error=='function'){opt.error('RESPONSE_FAIL')}else{alert('Response error')}
if(typeof opt.complete=='function'){opt.complete()}
return}
if(typeof opt.success=='function'){if(typeof xhr.response.success=='undefined'){opt.success(xhr.response)}else if(xhr.response.success){var rdata=xhr.response.data||{};opt.success(rdata)}else{var rkey=xhr.response.key||'ERROR';var rdata=xhr.response.data||{};opt.error(rkey,rdata)}}else{console.info(xhr.response)}
if(typeof opt.complete=='function'){opt.complete()}};xhr.onerror=function(){alert("Request failed");if(typeof opt.complete=='function'){opt.complete()}};if(typeof opt.start=='function'){opt.start()}
xhr.send(null);return xhr}
var jsonp_get=(function(){var expando='lnw'+('142'+Math.random()).replace(/\D/g,'');var unique=Date.now();var rjsonp=/(=)\?(?=&|$)|\?\?/;return function(opt){var callback_name=expando+'_'+(unique++);var url=opt.url;var ajaxdata=JSON.parse(JSON.stringify(opt.data||{}));ajaxdata.ajaxxxx=!0;if(rjsonp.test(url)){url=url.replace(rjsonp,"$1"+callback_name)}else if(opt.callback_key){ajaxdata[opt.callback_key]=callback_name}
url=buildURL(url,ajaxdata);var script=document.createElement('script');script.type='text/javascript';script.src=url;window[callback_name]=function(data){opt.success.call(window,data);document.getElementsByTagName('head')[0].removeChild(script);script=null;delete window[callback_name]};document.getElementsByTagName('head')[0].appendChild(script)}})();return{namespaced:!0,state:function(){var state={data:null,favshops:[],point:null,msg:{noti_list:null,noti_num:null},is_loading_msg:!1};if(typeof USERDATA!='undefined'){state.data=USERDATA}
return state},getters:{is_login:function(state){return(state.data!=null)&&(state.data.is_login)}},mutations:{set_init_data:function(state,payload){if(payload.userdata){state.data=payload.userdata}},set_favshops:function(state,payload){state.favshops=payload.favshops},set_user_data:function(state,payload){if(state.data){Object.keys(payload.userdata).forEach(function(ukey){Vue.set(state.data,ukey,payload.userdata[ukey])})}},add_favshop:function(state,shop){if(state.favshops!=null){var xxx=state.favshops.filter(function(favshop){return(favshop.shop_id==shop.shop_id)}).length;if(xxx==0){state.favshops.unshift(shop)}}},remove_favshop:function(state,shop_id){if(state.favshops!=null){var remove_idx=null;state.favshops.forEach(function(favshop,idx){if(favshop.shop_id==shop_id){remove_idx=idx}});if(remove_idx!=null){state.favshops.splice(remove_idx,1)}}}},actions:{load_init:function(context){var url=window.location.href;var xhr=json_get({url:site_url('json/init_data'),data:{url:url},success:function(response){context.commit('set_init_data',response)
context.dispatch('load_point');context.dispatch('count_msg')}})},load_favshops:function(context){var xhr=json_get({url:site_url('json/load_favshops'),success:function(response){if(response.userdata&&response.userdata.favshops){context.commit('set_favshops',response.userdata)}}})},load_userpanel:function(context){var that=this;var xhr=json_get({url:site_url('json/load_userpanel'),success:function(response){context.commit('set_user_data',response)}})},load_point:function(context,point_data){if(!context.getters.is_login){return}
if(!context.state.data.lnwpoint_data){return}
var data={data:context.state.data.lnwpoint_data};var url='https://www.lnwpay.com/2/api/point/lnwshop/jsonp';jsonp_get({callback_key:'lnwpay_jsonp',url:url,data:data,success:function(response){context.state.point={available_balance:response.available_balance,available_money:response.available_money}}})},load_msg:function(context,isclear){if(!context.getters.is_login){return}
if(!context.state.data.ACCOUNTS_DATA){return}
var limit=10;if(context.state.is_loading_msg){return}
var offset=0;if(!isclear){if(context.state.msg.noti_list.length%limit!=0){return}
offset=context.state.msg.noti_list.length}
var data={data:context.state.data.ACCOUNTS_DATA,offset:offset,limit:limit};is_loading_msg=!0;var lnwmsg_url="https://lnwmsg.com/";var lnwmsg_noti_url=lnwmsg_url+"jsonp/notifications?lnwmsg_jsonp=?";jsonp_get({url:lnwmsg_noti_url,data:data,success:function(response){if(response.success){if(isclear){context.state.msg.noti_list=response.notifications}else{context.state.msg.noti_list.concat(response.notifications)}
context.state.msg.noti_num=null}
context.state.is_loading_msg=!1}})},count_msg:function(context){if(!context.getters.is_login){return}
if(!context.state.data.ACCOUNTS_DATA){return}
var data={data:context.state.data.ACCOUNTS_DATA};var lnwmsg_url="https://lnwmsg.com/";var lnwmsg_count_url=lnwmsg_url+"jsonp/count_notifications?lnwmsg_jsonp=?";jsonp_get({url:lnwmsg_count_url,data:data,success:function(response){if(response.success){context.state.msg.noti_num=response.count}}})},read_msg:function(context){if(!context.getters.is_login){return}
if(!context.state.data.ACCOUNTS_DATA){return}
var data={data:context.state.data.ACCOUNTS_DATA};var lnwmsg_url="https://lnwmsg.com/";var lnwmsg_read_url=lnwmsg_url+"jsonp/read?lnwmsg_jsonp=?";jsonp_get({url:lnwmsg_read_url,data:data,success:function(response){if(response.success){}}})}}}})();lnw_store.registerModule('user',lnw_module_user);var lnw_module_web={namespaced:!0,state:function(){var state={data:null};if(typeof WEBDATA!='undefined'){state=WEBDATA}
return state}}
lnw_store.registerModule('web',lnw_module_web);var vm_lnwbar=new Vue({el:'#lnwbar-app',store:lnw_store,components:{'lnwpay-rank-icons':{props:['rank_class','rank_level'],computed:{icon_url:function(){var icon_names={'a':'gr','b':'sv','c':'gd'};var icon_name=icon_names[this.rank_class]+'3.png';return base_url('system/application/templates/lnwshop/default/_images/lnwpay/icon-rank/')+icon_name},icon_num:function(){return this.rank_level}},template:`<span><template v-for="i in icon_num">&nbsp;<div class="lnwpay_iconrank"><img :src="icon_url" alt="lnwpay icon ranking" width="16" height="16"></div></template></span>`},'lnwpay-score-icons':{props:['score'],computed:{icons:function(){var score=this.score;var icons=[];var step_texts=[null,'one','two','three','four','five','six','seven','eight','nine','full']
for(var i=0;i<5;i++){var icon={value:i+1,className:['heart']}
if(score==null){icon.className.push('full-gray')}else if(score>i){icon.className.push('full')}else{var step=Math((score-i)*10);icon.className.push(step_texts[step])}
icons.push(icon)}
return icons}},template:`<span><div v-for="icon in icons" :class="icon.className" :value="icon.value"></div></span>`},},data:{show_favshops_num:8,show_myshops_num:4,is_show_lnwpay_helper:!1,show_popup_key:null,product_list:[{key:'lnwshop',url:'https://www.lnwshop.com',desc:'เปิดร้านค้าออนไลน์ฟรี การันตี 600,000 ร้าน',is_new:!1},{key:'lnwpay',url:'https://www.lnwpay.com',desc:'ระบบรับชำระเงินแทน ประกันได้รับสินค้า 100%',is_new:!1},{key:'lnwmall',url:'https://www.lnwmall.com',desc:'ห้างสุดชิคช้อปปิ้งออนไลน์ รีวิวจากผู้ซื้อตัวจริง',is_new:!1},{key:'lnwdropship',url:'https://www.lnwdropship.com',desc:'รวมสินค้าที่รับตัวแทนจำหน่าย เริ่มขายได้ทันที',is_new:!0},{key:'lnwpickpack',url:'https://www.lnwpickpack.com',desc:'บริการโกดังสินค้าพร้อม เก็บ-แพ็ค-ส่ง',is_new:!0},{key:'bloglnw',url:'https://blog.lnw.co.th',desc:'ติดตามข้อมูลล่าสุด บล็อกน่ารู้ โปรโมชั่นเด็ด',is_new:!1}],heart_types:[{type:'friendly',text:'ใส่ใจบริการ'},{type:'convenient',text:'ติดต่อรวดเร็ว'},{type:'delivery',text:'ความเร็วจัดส่ง'},{type:'packaging',text:'การแพ็คสินค้า'}],local_login:!1,admin_info_html:null},computed:{favshops:function(){return this.$store.state.user.favshops},lnwpoint:function(){return this.$store.state.user.point||null},msg:function(){return this.$store.state.user.msg},lb_class:function(){var className=[];if(this.is_hide){}else{if(this.webdata.lnwbar&&this.webdata.lnwbar.is_lnwpay){className.push('lnwpayBar');className.push('doubleLayer')}
className.push('lb_lnwshop')}
return className},wrapper_class:function(){var className=[];if(this.webdata.lnwbar){className.push('bb-color'+this.webdata.lnwbar.color)}
return className},is_hide:function(){return(document.body.classList.contains('lnw-mobile'))},is_mini:function(){return !1;return(this.$el.classList.contains('lnwbar-mini'))},is_manage_page:function(){return(document.body.id=='managebody')||(this.$el.classList.contains('lnwbar-mini'))},is_show_lnwpay:function(){return this.webdata.lnwbar&&this.webdata.lnwbar.is_lnwpay},userdata:function(){return this.$store.state.user.data},webdata:function(){return this.$store.state.web},lnwpay_url:function(){return 'https://www.lnwpay.com/'},template_image_url:function(){return base_url('system/application/templates/lnwshop/default/_images/')},module_image_url:function(){return base_url('system/application/modules/lnwshop/_images/')},lnwpay_data:function(){return this.webdata.lnwpay},is_mobile_site:function(){return !1},is_login:function(){return this.userdata&&this.userdata.is_login},head:function(){var h={is_bb:!1,image:base_url('system/application/templates/lnwshop/default/_images/lnwpay/lnwpaybar/lnwshop_logo_white.png'),image_alt:'LnwShop',text:null,width:70,height:11,url:null,};if(this.webdata.lnwbar){if(this.webdata.lnwbar.head_image||this.webdata.lnwbar.head_text){h.is_bb=!0;if(this.webdata.lnwbar.head_image){h.image=this.webdata.lnwbar.head_image;h.width=null;h.height=40}else{h.image=null}
if(this.webdata.lnwbar.head_text){h.text=this.webdata.lnwbar.head_text;h.image_alt=this.webdata.lnwbar.head_text}else{h.text=null}
if(this.webdata.lnwbar.head_url){h.url=this.webdata.lnwbar.head_url}}}
return h},is_favshop:function(){var that=this;if(this.favshops!=null){var len=this.favshops.filter(function(shop){return(shop.shop_id==that.webdata.id)}).length;return(len>0)}
return !1},notis:function(){var that=this;var lnwmsg_url="https://lnwmsg.com/";if(!this.$store.state.user.msg.noti_list){return[]}
return this.$store.state.user.msg.noti_list.map(function(nt){var nt_extra={};if((typeof nt.extra=='undefined')||(nt.extra==null)){}else if(typeof nt.extra=='string'){nt_extra=JSON.parse(nt.extra)}else{nt_extra=nt.extra}
var url='';if(typeof nt_extra.url!='undefined'){var url=nt_extra.url;if(typeof nt.tmp_secret!='undefined'){url=lnwmsg_url+'url?n='+nt.notification_id+'&t='+nt.tmp_secret}}
var className=[];className.push(that.get_msg_class(nt.type));if(nt.status!='read'){className.push('new_noti')}
var nt_message=nt.message;nt_message=text(nt_message);nt_message=nt_message.replace('[b][/b]','');nt_message=nt_message.replace(/\[b\](.+?)\[\/b\]/g,'<b>$1</b>');nt_message=nt_message.replace('[i][/i]','');nt_message=nt_message.replace(/\[i\](.+?)\[\/i\]/g,'<i>$1</i>');var image=null;var image_class=[];var nt_type=nt.type.split('/');var nt_extra=nt.extra;if(nt_type.length>2){if(nt_type[1]=='owner'){if(typeof nt_extra.user_avatar!='undefined'){image=img_src(nt_extra.user_avatar,'user',50,50);image_class.push('user_format')}
if(typeof nt_type[2]!='undefined'&&nt_type[2]=='broadcast'){image=img_src('images/lnwshop_admin_avatar.png');image_class.push('user_format')}}else if(nt_type[1]=='user'&&nt_type[2]=='webboard'){if(typeof nt_extra.user_avatar!='undefined'){image=img_src(nt_extra.user_avatar,'user',50,50);image_class.push('user_format')}}else if(nt_type[1]=='user'){if(typeof nt_extra.owner_avatar!='undefined'){image=img_src(nt_extra.owner_avatar,'user',50,50);image_class.push('shop_format')}}else if(nt_type[1]=='buyer'){if(typeof nt_extra.seller_avatar!='undefined'){image=img_src(nt_extra.seller_avatar,'user',50,50);image_class.push('shop_format')}}else if(nt_type[1]=='seller'){if(typeof nt_extra.buyer_avatar!='undefined'){image=img_src(nt_extra.user_avatar,'user',50,50);image_class.push('user_format')}}}
return{className:className,url:url,image:image,image_class:image_class,message:nt_message,time:nt.time,time_diff:nt.time_diff}})}},watch:{show_popup_key:function(new_val,old_val){if(new_val==old_val){return}
if(old_val=='userpanel'){document.body.classList.remove('show_lbUser');var eles=document.getElementsByClassName('body-skin');if(eles.length>0){eles[0].style.position=''}
var ele=document.getElementById('lnwbody');if(ele){ele.style.position=''}
var ele=document.getElementById('lbUserPanel');if(ele){ele.style.position=''}
function scrollToTop(scrollDuration){var scrollStep=-window.scrollY/(scrollDuration/15),scrollInterval=setInterval(function(){if(window.scrollY!=0){window.scrollBy(0,scrollStep)}
else clearInterval(scrollInterval)},15)}
var action=function(){if(typeof scrollToTop)
scrollToTop(0)};setTimeout(action,600)}else if(old_val=='product'){document.body.classList.remove('show_lbProductPopup')}else if(old_val=='favshop'){document.body.classList.remove('show_lbFavPopup')}else if(old_val=='msg'){document.body.classList.remove('show_lbNotiPopup')}else if(old_val=='msg2'){document.body.classList.remove('show_lbUser');var eles=document.getElementsByClassName('body-skin');if(eles.length>0){eles[0].style.position=''}
var ele=document.getElementById('lnwbody');if(ele){ele.style.position=''}
var ele=document.getElementById('lbUserPanel');if(ele){ele.style.position=''}
function scrollToTop(scrollDuration){var scrollStep=-window.scrollY/(scrollDuration/15),scrollInterval=setInterval(function(){if(window.scrollY!=0){window.scrollBy(0,scrollStep)}
else clearInterval(scrollInterval)},15)}
var action=function(){if(typeof scrollToTop)
scrollToTop(0);var ele=document.getElementById('lbUserPanel');ele.classList.remove('message')};setTimeout(action,600)}
if(new_val=='userpanel'){if(this.userdata.is_owner?!this.userdata.myshops:!this.userdata.order_nums){this.$store.dispatch('user/load_userpanel')}
document.body.classList.add('show_lbUser');var action=function(){var eles=document.getElementsByClassName('body-skin');if(eles.length>0){eles[0].style.position='fixed'}
var ele=document.getElementById('lnwbody');if(ele){ele.style.position='fixed'}
var ele=document.getElementById('lbUserPanel');if(ele){ele.style.position='absolute'}};setTimeout(action,600)}else if(new_val=='product'){document.body.classList.add('show_lbProductPopup')}else if(new_val=='favshop'){this.$store.dispatch('user/load_favshops');document.body.classList.add('show_lbFavPopup')}else if(new_val=='msg'){this.$store.dispatch('user/load_msg',!0);document.body.classList.add('show_lbNotiPopup')}else if(new_val=='msg2'){document.body.classList.add('show_lbUser');var ele=document.getElementById('lbUserPanel');this.$store.dispatch('user/load_msg',!0);ele.classList.add('message');var action=function(){var eles=document.getElementsByClassName('body-skin');if(eles.length>0){eles[0].style.position='fixed'}
var ele=document.getElementById('lnwbody');if(ele){ele.style.position='fixed'}
var ele=document.getElementById('lbUserPanel');if(ele){ele.style.position='absolute'}};setTimeout(action,600)}}},methods:{handle_noti_scroll:function(event){var element=event.target;if((element.scrollHeight-element.scrollTop-10)<element.clientHeight){this.$store.dispatch('user/load_msg',!1)}},close_popup:function(){this.show_popup_key=null},toggle_productPopup:function(){if(this.show_popup_key=='product'){this.show_popup_key=null}else{this.show_popup_key='product'}},show_lang:function(){if(arguments.length==0){return ''}
if(typeof __lnw__!=='undefined'&&typeof __lnw__.show_lang!=='undefined'){return __lnw__.show_lang.apply(__lnw__,arguments)}
var dft_lang_texts={'LB-PROFILE':'ข้อมูลบุคคล','RECEIVER_ADDRESS':'ที่อยู่จัดส่ง','LB-RESET-PSW':'เปลี่ยนรหัสผ่าน','LB-NOTIFICATION':'ข้อความแจ้งเตือน','LB-NO-NOTIFICATION':'ไม่มีข้อความแจ้งเตือน','LB-ALL-NOTIFICATION':'รายการแจ้งเตือนทั้งหมด','LB-MY-FAVSHOP':'ร้านค้าโปรดของฉัน','VIEW_ALL':'ดูเพิ่ม','GADGET-CART-FAV':'บันทึกเป็นร้านโปรด','LB-FAV_DETAIL':'หากคุณต้องการเพิ่มเป็นร้านโปรด กรุณาคลิกเพื่อบันทึก','BUY-DELETE':'ลบ','LB-MY_LNWSHOP_ADDON':'บริการอัพเกรดของฉัน','LB-LOGOUT':'ออกจากระบบ','LB-MY_SHOP':'ร้านค้าของฉัน','LB-MANAGE_SHOP':'จัดการหลังร้าน','LB-CREATE_SHOP':'เริ่มธุรกิจกับ LnwShop เปิดร้านค้าฟรี','LB-CREATE_DETAIL':'แค่คุณมีฝัน เราจะช่วยทำให้เป็นจริง','ORDER-MY_ORDER':'รายการสินค้าของฉัน'};var key1=arguments[0];if(typeof dft_lang_texts[key1]=='undefined'){return key1}
return dft_lang_texts[key1]},get_msg_class:function(type){var li_class='';switch(type){case 'lnwshop/owner/webboard/topic':li_class='nTopic';break;case 'lnwshop/owner/webboard/post':case 'lnwshop/user/webboard/post':li_class='nPost';break;case 'lnwshop/owner/contact_us':li_class='nMessage';break;case 'lnwshop/owner/product/discuss':li_class='nDiscus';break;case 'lnwshop/owner/product/review':li_class='nRating';break;case 'lnwshop/owner/payment':case 'lnwshop/user/payment':li_class='nPayment';break;case 'lnwshop/user/order':case 'lnwshop/owner/order':case 'lnwshop/user/shipping':case 'lnwshop/owner/shipping':case 'lnwmall2/seller/order':case 'lnwmall2/buyer/order':case 'lnwmall2/seller/shipping':case 'lnwmall2/buyer/shipping':li_class='nOrder';break;case 'lnwshop/owner/broadcast':li_class='nNotice';break;case 'lnwpay/seller/order/created':li_class='npsCreated';break;case 'lnwpay/buyer/order/created':li_class='npbCreated';break;case 'lnwpay/buyer/payment/informed':li_class='npbInformed';break;case 'lnwpay/buyer/payment/rejected':li_class='npbRejected';break;case 'lnwpay/seller/payment/confirmed':case 'lnwpay/buyer/payment/confirmed':case 'lnwshop/user/payment_confirm':li_class='npConfirmed';break;case 'lnwpay/buyer/order/shipped':case 'lnwshop/user/shipping_confirm':li_class='npbShipped';break;case 'lnwpay/buyer/order/received':li_class='npbReceived';break;case 'lnwpay/seller/order/completed':li_class='npsCompleted';break}
return li_class},toggle_msg:function(ntype){if(this.show_popup_key=='msg'){this.show_popup_key=null}else{this.show_popup_key='msg'}},toggle_msg2:function(ntype){if(this.show_popup_key=='msg2'){this.show_popup_key=null}else{this.show_popup_key='msg2'}},toggle_fav:function(){if(this.show_popup_key=='favshop'){this.show_popup_key=null}else{this.show_popup_key='favshop'}},favshop_add:function(){__lnw__.favShop.add()},favshop_remove:function(shop_id){__lnw__.favShop.remove_by_id(shop_id)},toggle_user:function(){if(this.show_popup_key=='userpanel'){this.show_popup_key=null}else{this.show_popup_key='userpanel'}},show_favshops_more:function(){this.show_favshops_num=100},show_myshops_more:function(){this.show_myshops_num=100},show_lnwpay_helper:function(){this.is_show_lnwpay_helper=!0},hide_lnwpay_helper:function(){this.is_show_lnwpay_helper=!1},toggle_lnwpay_helper:function(){this.is_show_lnwpay_helper=!this.is_show_lnwpay_helper},open_admin_info:function(){if(typeof window.open_admin_info=='function'){window.open_admin_info()}}},created:function(){var link=document.createElement('link');link.rel='stylesheet';link.href=base_url('system/application/modules/lnwbar/_css/color_style.min.css');link.type='text/css';document.getElementsByTagName('body')[0].appendChild(link);if(document.getElementsByClassName('lnwwall').length==0){var div=document.createElement('div');div.className='lnwwall';document.getElementsByTagName('body')[0].appendChild(div)}
if(!this.userdata||!this.userdata.MANAGE_URL){this.$store.dispatch('user/load_init')}
var that=this;document.addEventListener("click",function(event){if(that.show_popup_key!=null){if(event.target.closest('.lb-popup-area')==null){if(event.target.closest('.lb-popup-btn')==null){that.show_popup_key=null;event.stopPropagation();event.preventDefault()}}}});if(typeof __lnw__!='undefined'){__lnw__.favShop.bind('add-success',function(rdata){if(typeof rdata.shop!='undefined'){that.$store.commit('user/add_favshop',rdata.shop)}});__lnw__.favShop.bind('remove-success',function(rdata){if(typeof rdata.shop_id!='undefined'){that.$store.commit('user/remove_favshop',rdata.shop_id)}});__lnw__.favShop.bind('remove_by_id-success',function(shop_id,rdata){if(typeof rdata.shop_id!='undefined'){that.$store.commit('user/remove_favshop',rdata.shop_id)}})}
if(window._lnwbar_admin_info_html){that.admin_info_html=window._lnwbar_admin_info_html;delete window._lnwbar_admin_info_html}},template:`
<div id="lb" :class="lb_class">
	<template v-if="is_hide">
	<lnwbar-localhost-login v-if="!is_login && webdata.id && webdata.is_localhost" :force_show="local_login"></lnwbar-localhost-login>
	</template>
	<div v-else-if="is_mini" id="lbWrapper-mini" :class="wrapper_class">
		<div>
			<a class="lbweb" :href="webdata.front_url"><img :title="webdata.name" :src="webdata.avatar" /></a>
		</div>
		<div>
			<div v-if="is_login" id="lbMember">
				<a class="lbuser lb-popup-btn" @click="toggle_user"><img :title="userdata.name" :src="userdata.avatar" /></a>
			</div>
			<div id="lbNoti"><div class="noti_name" v-text="userdata.name"></div><div class="noti_general lb-popup-btn" @click="toggle_msg"><div v-if="msg.noti_num>0" class="noti_number" v-text="msg.noti_num"></div></div></div>
			<div id="lbNotiPopup" class="lbNotiPopup lb-popup-area">
				<div class="popup_general">
					<div class="title" v-text="show_lang('LB-NOTIFICATION')"></div><a class="all" href="https://www.lnwaccounts.com/manage/notifications">ทั้งหมด</a>
					<div class="list" @scroll="handle_noti_scroll">
						<div v-for="nt in notis" class="li hoverCircle hoverCircleX2" :class="nt.className">
							<a :href="nt.url">
								<div class="avatar"><img :src="nt.image" :class="nt.image_class" /></div>
								<div class="icon_info"></div>
								<div class="noti_info">
									<span class="info" v-html="nt.message"></span><br>
									<span class="time" :title="nt.time" v-text="nt.time_diff"></span>
								</div>
							</a>
						</div>
						<div v-if="notis.length == 0" class="li list-empty" style="text-align: center;">- {{show_lang('LB-NO-NOTIFICATION')}} -</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else :id="is_manage_page?'lbWrapper-manage':'lbWrapper'" :class="wrapper_class">
		<div class="component">
			<template v-if="webdata.id && !is_manage_page">
			<div id="lbProduct">
				<div v-if="head.is_bb" class="main-bb" :class="((head.image && head.text)?'':(head.image?'bb-image':'bb-text'))">
					<a :href="head.url"><img v-if="head.image" class="favicon" :src="head.image" :alt="head.image_alt" :title="head.image_alt" :width="head.width" :height="head.height" /><span v-if="head.text" class="txt" v-text="head.text"></span></a>
				</div>
				<div v-else class="main lb-popup-btn" @click="toggle_productPopup">
					<img v-if="head.image" class="favicon" :src="head.image" :alt="head.image_alt" :title="head.image_alt" :height="head.height" />
				</div>
			</div>
			<div v-if="!head.is_bb" id="lbProductPopup" class="lb-popup-area">
				<div class="lblists">
					<a v-for="product in product_list" class="lblist" :class="product.key" :product="product.key" :href="product.url" target="_blank" rel="nofollow noopener"><i></i><span v-text="product.desc"></span><b></b><div v-if="product.is_new" class="new_icon"></div></a>
				</div>
				<div class="close_lbProductPopup" @click="close_popup">X ปิดหน้าต่าง</div>
			</div>
			<div v-if="is_show_lnwpay" id="lnwpayStatistic" class="content">
				<ul :class="{superShop: lnwpay_data.is_supershop}">
					<li class="slogan">
						<a class="box" :href="lnwpay_url+'buy'" target="_blank" rel="noopener">
							&nbsp;<img :src="template_image_url+'lnwpay/lnwpaybar/lnwpay_shield.png'" alt="LnwPay Buyer Protection" width="21" height="24" />
							&nbsp;
							<span class="text">มั่นใจ จ่ายง่าย ได้ชัวร์ !</span>
						</a>
					</li>
					<li v-if="lnwpay_data.is_supershop" class="shopname">
						<a class="box" :href="lnwpay_url+'supershop'" target="_blank" rel="noopener">
							<div class="avatar">
								<s title="ร้านค้า SuperShop"></s>
							</div>
						</a>
					</li>
					<li class="shoprank">
						<a class="box" :href="lnwpay_url+'rank'" :title="(lnwpay_data.review_score==0)?'Rank':show_lang('LNWPAY-SELLER_SUMMARY_POINT', lnwpay_data.review_score)" target="_blank" rel="noopener">
							<div class="text"><span class="xx">ระดับ:</span><lnwpay-rank-icons :rank_class="lnwpay_data.rank_class" :rank_level="lnwpay_data.rank_level"></lnwpay-rank-icons>
							</div>
						</a>
					</li>
					<li id="service_bar" class="service" :class="{showHelper:(is_show_lnwpay_helper)}" @mouseover="show_lnwpay_helper" @mouseout="hide_lnwpay_helper">
						<a class="box" :href="lnwpay_url+'seller/'+webdata.id" target="_blank" rel="noopener" @click.stop.prevent="toggle_lnwpay_helper">
							<div class="barshopreview" :class="'feedback'+lnwpay_data.stat_standard">
								<span class="service_icon"><img :src="template_image_url+'lnwpay/lnwpaybar/icon_smile.png'" alt="" title="" width="24" height="24" /></span>
								<span class="text">&nbsp;รีวิว:</span>
								<span class="bargraphfeedback">
									<strong class="bar" :class="'bgfeedback'+lnwpay_data.stat_standard" :style="{width:lnwpay_data.stat_percent+'%'}"></strong>
								</span>
								<span>{{lnwpay_data.stat_percent?lnwpay_data.stat_percent+'% พอใจ':''}}</span>
								<span class="service_arrow"><img :src="template_image_url+'lnwpay/lnwpaybar/arrow.png'" alt="" title="" width="10" height="27" /></span>
							</div>
						</a>
						<div class="LnwPayHelper" :class="{LnwPayHelperBig:lnwpay_data.stat_percent}">
							<div class="body">
								<div :class="{feedbackStat:lnwpay_data.stat_percent}">
								<template v-if="lnwpay_data.stat_percent">
									<div class="header" :class="'feedback'+lnwpay_data.stat_standard">{{lnwpay_data.stat_up}} คน พอใจ</div>
									<div class="sub_header">ผู้ซื้อสินค้า {{lnwpay_data.stat_percent}}% พอใจในภาพรวมการบริการของร้านค้า</div>
								</template>
								<template v-else>
									<div class="header feedbackInit">ร้านนี้เพิ่งเปลี่ยนมาใช้ระบบรับชำระเงิน LnwPay</div>
									<div class="sub_header feedbackInit">ระบบยังไม่สามารถแสดงข้อมูลรีวิวและความพอใจของผู้ซื้อสินค้า ณ ขณะนี้ได้</div>
								</template>

									<div class="statistic" style="border:none;">
										<div class="sub_text">เปิดร้านตั้งแต่ : {{webdata.open_date_th}} <span style="float:right; color: rgba(255,255,255,0.8); font-size: 10px;">({{webdata.open_date_diff}})</span></div>
										<div class="sub_text">เริ่มใช้ LnwPay : {{lnwpay_data.start_date_th}} <span style="float:right; color: rgba(255,255,255,0.8); font-size: 10px;">({{lnwpay_data.start_date_diff}})</span></div>
									</div>
								</div>
								<template v-if="lnwpay_data.stat_percent">
								<div class="shopsmallBlock lnwpay_content feedbackHeart">
									<div v-if="lnwpay_data.premium_num > 0" class="feedbackPremium" style="margin-left:0;">
										<div v-for="heart_type in heart_types" class="shopPremiumBlock"  score-type="heart_type.type">
											<div class="score_title">{{heart_type.text}}</div>
											<div class="score_heart"></div>
											<div class="score_point">({{lnwpay_data.premium_scores[heart_type.type] || 'รอ'}})</div>
										</div>
									</div>
								</div>
								<div style="border-top: 1px solid #294181;" class="clear"></div>
								</template>
								<div class="content" style="line-height: 22px;">
									<img :src="template_image_url+'lnwpay/lnwpaybar/stats_logo.png'" alt="lnwpay stat icon" width="19" height="18" />
									<span>ข้อมูลรีวิวจากสถิติ 6 เดือนล่าสุด</span>
									<span class="feedBackFooterDesc">และรีวิวทั้งหมดมาจากผู้ที่ซื้อสินค้าจริงเท่านั้น</span>
									<div class="clear"></div>
								</div>
								<a class="gotoshopButton" :href="lnwpay_url+'seller/'+webdata.id" target="_blank" rel="noopener">ดูรีวิวทั้งหมดที่ LnwPay</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
			</template>
			<div v-if="is_login" id="lbMember">
				<a class="lbuser lb-popup-btn" @click="toggle_user"><img :title="userdata.name" :src="userdata.avatar" width="24" height="24" /></a>
			</div>
			<lnwbar-localhost-login v-else-if="webdata.id && webdata.is_localhost"></lnwbar-localhost-login>
			<div v-else-if="userdata" id="lbMember">
				<a :href="userdata.LOGIN_URL" rel="nofollow" class="lblogin"><span class="ico"></span><span class="txt">  {{show_lang('เข้าสู่ระบบ')}}</span></a><a :href="userdata.REGISTER_URL" class="lbregister" rel="nofollow"><span class="ico"></span><span class="txt"> {{show_lang('สมัครสมาชิก')}}</span></a>
			</div>
			<template v-if="is_login">
			<template v-if="!is_manage_page">
			<div id="lbFav" class="lb-popup-btn" @click="toggle_fav"><span class="ico"></span></div>
			<div id="lbFavPopup" class="lb-popup-area">
				<div v-if="favshops == null" class="lbLoading"></div>
				<div v-else class="favShopZone">
					<div class="title">{{show_lang('LB-MY-FAVSHOP')}}</div><div class="number">{{favshops.length}}</div>
					<a class="all" href="https://www.lnwshop.com/myaccount/favshop">{{show_lang('VIEW_ALL')}}</a>
					<div v-show="!is_favshop" class="add_fav"><a @click="favshop_add"><div class="addFav_ico"></div><b v-text="show_lang('GADGET-CART-FAV')"></b><br/>{{show_lang('LB-FAV_DETAIL')}}</a></div>
					<ul class="listShop">
						<li v-for="shop in favshops" class="shop hoverCircle hoverCircleX3" :class="{nowshop:(shop.shop_id == webdata.id)}">
							<div class="shopRemove" @click="favshop_remove(shop.shop_id)" v-text="show_lang('BUY-DELETE')"></div>
							<a :href="shop.url"><div class="shopAvatar"><img :src="shop.avatar" :alt="shop.shopname" /></div>
							<div class="shopName" v-text="shop.shopname"></div>
							<div class="shopDesc">#{{shop.shop_id}} <span class="shopStatus" :status="shop.close_status"></span></div></a>
						</li>
					</ul>
					<div v-if="(favshops.length > 8) && (show_favshops_num==8)" class="more" zone="favShopZone" @click="show_favshops_more"><span v-text="show_lang('VIEW_ALL')"></span></div>
				</div>
			</div>
			</template>
			<div id="lbNoti"><div class="noti_name" v-text="userdata.name"></div><div class="noti_general lb-popup-btn" @click="toggle_msg"><div v-if="msg.noti_num>0" class="noti_number" v-text="msg.noti_num"></div></div></div>
			<div id="lbNotiPopup" class="lbNotiPopup lb-popup-area">
				<div class="popup_general">
					<div class="title" v-text="show_lang('LB-NOTIFICATION')"></div><a class="all" href="https://www.lnwaccounts.com/manage/notifications">ทั้งหมด</a>
					<div class="list" @scroll="handle_noti_scroll">
						<div v-for="nt in notis" class="li hoverCircle hoverCircleX2" :class="nt.className">
							<a :href="nt.url">
								<div class="avatar"><img :src="nt.image" :class="nt.image_class" /></div>
								<div class="icon_info"></div>
								<div class="noti_info">
									<span class="info" v-html="nt.message"></span><br>
									<span class="time" :title="nt.time" v-text="nt.time_diff"></span>
								</div>
							</a>
						</div>
						<div v-if="notis.length == 0" class="li list-empty" style="text-align: center;">- {{show_lang('LB-NO-NOTIFICATION')}} -</div>
					</div>
				</div>
			</div>
			<div v-if="!is_manage_page && is_show_lnwpay && lnwpoint && (lnwpoint.available_balance != null)" class="content">
				<div class="lnwpoints">
					<a class="lbPoints" :href="lnwpay_url+'my/buyer/point'"><img :src="module_image_url+'lnwpoints.png'" style="vertical-align: middle;" width="20" height="20" /> <span class="show_lnwpoints" v-text="number_format(lnwpoint.available_balance)"></span> <span class="points_unit">Points</span></a>
					<div class="LnwPayHelper">
						<div class="body">
							<div class="header feedback95">ใช้เป็นส่วนลดได้ <span class="show_lnwpoints_price" v-text="lnwpoint.available_money"></span> บาท</div>
							<a style="font-size: 12px; display:block; margin: 10px 0px;" :href="lnwpay_url+'my/buyer/point'"><u>ประวัติการใช้คะแนนสะสมของฉัน</u></a>
							<div class="statistic" style="margin: 15px 0px 7px 0px; padding: 0px;"></div>
							<div class="footer">
								<div style="font-size: 16px; margin: 5px 0px 5px 0px; "><img :src="module_image_url+'lnwpoints.png'" style="vertical-align: middle;" width="20" height="20" /> คะแนนสะสม LnwPoints</div>
								<div class="sub_text">คุณจะได้รับคะแนนสะสม 1% ทุกครั้งที่กลับมารีวิวการสั่งซื้อสินค้า คะแนนนี้จะสามารถใช้เป็นส่วนลดได้ทุกร้านที่ใช้ระบบ LnwPay</div><br>
								<a v-if="true" target="_blank" rel="noopener" href="lnwpay_url+'my/buyer/myreview'"><div style="margin: 0px 0px 10px 0px;" class="sub_button">รีวิวเพื่อรับคะแนนสะสมเพิ่ม</div></a>
								<a v-else href="lnwpay_url+'my/buyer/myreview'"><div style="margin: 0px 0px 10px 0px;" class="sub_button">คุณยังไม่มีรายการสั่งซื้อให้รีวิว</div></a>
								<a target="_blank" rel="noopener" :href="lnwpay_url+'lnwpoints'"><u>รายละเอียด LnwPoints เพิ่มเติม</u></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			</template>
		</div>
	</div>
	<div v-if="!is_hide && webdata.is_localhost && is_show_lnwpay" id="lnwpayBarMini">
		<div id="lnwpayStatistic" class="content">
			<ul>
				<li class="slogan">
					<a class="box" :href="lnwpay_url+'buy'" target="_blank" rel="noopener">
						&nbsp;<img :src="template_image_url+'lnwpay/lnwpaybar/lnwpay_shield.png'" alt="LnwPay Buyer Protection" width="18" height="20" />
						&nbsp;
						<span class="text">มั่นใจ จ่ายง่าย ได้ชัวร์ !</span>
					</a>
				</li>
				<li id="service_bar" class="service" :class="{showHelper:(is_show_lnwpay_helper)}" @mouseover="show_lnwpay_helper" @mouseout="hide_lnwpay_helper">
					<a class="box" :href="lnwpay_url+'seller/'+webdata.id" target="_blank" rel="noopener" @click.stop.prevent="toggle_lnwpay_helper">
						<div class="barshopreview" :class="'feedback'+lnwpay_data.stat_standard">
							<span class="service_icon"><img :src="template_image_url+'lnwpay/lnwpaybar/icon_smile.png'" alt="" title="" width="16" height="16" /></span>
							<span class="text">&nbsp;รีวิว:</span>
							<span class="bargraphfeedback">
								<strong class="bar" :class="'bgfeedback'+lnwpay_data.stat_standard" :style="{width:lnwpay_data.stat_percent+'%'}"></strong>
							</span>
							<span>{{lnwpay_data.stat_percent?lnwpay_data.stat_percent+'% พอใจ':''}}</span>
							<span class="service_arrow"><img :src="template_image_url+'lnwpay/lnwpaybar/arrow.png'" alt="" title="" width="10" height="27" /></span>
						</div>
					</a>
					<div class="LnwPayHelper" :class="{LnwPayHelperBig:lnwpay_data.stat_percent}">
						<div class="body">
							<div :class="{feedbackStat:lnwpay_data.stat_percent}">
							<template v-if="lnwpay_data.stat_percent">
								<div class="header" :class="'feedback'+lnwpay_data.stat_standard">{{lnwpay_data.stat_up}} คน พอใจ</div>
								<div class="sub_header">ผู้ซื้อสินค้า {{lnwpay_data.stat_percent}}% พอใจในภาพรวมการบริการของร้านค้า</div>
							</template>
							<template v-else>
								<div class="header feedbackInit">ร้านนี้เพิ่งเปลี่ยนมาใช้ระบบรับชำระเงิน LnwPay</div>
								<div class="sub_header feedbackInit">ระบบยังไม่สามารถแสดงข้อมูลรีวิวและความพอใจของผู้ซื้อสินค้า ณ ขณะนี้ได้</div>
							</template>

								<div class="statistic" style="border:none;">
									<div class="sub_text">เปิดร้านตั้งแต่ : {{webdata.open_date_th}} <span style="float:right; color: rgba(255,255,255,0.8); font-size: 10px;">({{webdata.open_date_diff}})</span></div>
									<div class="sub_text">เริ่มใช้ LnwPay : {{lnwpay_data.start_date_th}} <span style="float:right; color: rgba(255,255,255,0.8); font-size: 10px;">({{lnwpay_data.start_date_diff}})</span></div>
								</div>
							</div>
							<template v-if="lnwpay_data.stat_percent">
							<div class="shopsmallBlock lnwpay_content feedbackHeart">
								<div v-if="lnwpay_data.premium_num > 0" class="feedbackPremium" style="margin-left:0;">
									<div v-for="heart_type in heart_types" class="shopPremiumBlock"  score-type="heart_type.type">
										<div class="score_title">{{heart_type.text}}</div>
										<div class="score_heart"></div>
										<div class="score_point">({{lnwpay_data.premium_scores[heart_type.type] || 'รอ'}})</div>
									</div>
								</div>
							</div>
							<div style="border-top: 1px solid #294181;" class="clear"></div>
							</template>
							<div class="content" style="line-height: 22px;">
								<img :src="template_image_url+'lnwpay/lnwpaybar/stats_logo.png'" alt="lnwpay stat icon" width="19" height="18" />
								<span>ข้อมูลรีวิวจากสถิติ 6 เดือนล่าสุด</span>
								<span class="feedBackFooterDesc">และรีวิวทั้งหมดมาจากผู้ที่ซื้อสินค้าจริงเท่านั้น</span>
								<div class="clear"></div>
							</div>
							<a class="gotoshopButton" :href="lnwpay_url+'seller/'+webdata.id" target="_blank" rel="noopener">ดูรีวิวทั้งหมดที่ LnwPay</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-if="userdata && userdata.is_login" id="lbUserPanel" class="lb-popup-area">
		<div class="hhhZone"><div class="backbtn" @click="close_popup">&lsaquo; <span>กลับ</span></div></div>
		<div class="adminZone" v-if="userdata.is_admin && admin_info_html" v-html="admin_info_html"></div>
		<div class="accountZone"><div class="hoverCircle hoverCircleX3"><a :href="userdata.MANAGE_URL"><img :src="userdata.avatar" :alt="userdata.name" width="24" height="24" /><div class="name" v-text="userdata.name"></div><div class="email" v-text="userdata.email"></div></a></div></div>
		<div v-if="!userdata.is_owner" class="orderZone"><a :href="webdata.order_url"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('ORDER-MY_ORDER')}} <span v-if="userdata.order_nums && userdata.order_nums.all" class="orderCount" v-text="userdata.order_nums.all"></span></div></div></a></div>
		<div v-else-if="userdata.myshops == null" class="myShopZoneLoading lbLoading xx"></div>
		<div v-else class="myShopZone">
			<div class="title" v-text="show_lang('LB-MY_SHOP')"></div><div class="number" v-text="userdata.myshops.length"></div><a class="all" href="https://www.lnwshop.com/myaccount/shop" v-text="show_lang('VIEW_ALL')"></a>
			<div class="list_bg"></div>
			<ul class="listShop">
				<li v-if="userdata.myshops.length == 0" class="zero"><a href="https://www.lnwshop.com/openshop"><div class="shopAvatar">+</div><div class="shopName" v-text="show_lang('LB-CREATE_SHOP')"></div><div class="shopDesc" v-text="show_lang('LB-CREATE_SHOP_DETAIL')"></div></a></li>
				<li v-else v-for="(shop,idx) in userdata.myshops" class="shop" v-if="idx<show_myshops_num" :class="{single:(userdata.myshops.length == 1)}">
					<a :href="shop.url">
						<div class="shopAvatar"><img :src="shop.avatar" :alt="shop.shopname" /></div>
						<div class="shopName" v-text="shop.shopname"></div>
						<div class="shopDesc">#{{shop.shop_id}} <span class="shopStatus" :status="shop.close_status"></span></div></a>
						<a class="shopManage" :href="shop.url+'/manage'" v-text="show_lang('LB-MANAGE_SHOP')">
					</a>
				</li>
			</ul>
			<div v-if="(userdata.myshops.length > show_myshops_num)" class="lb-popup-btn more" zone="myShopZone" @click="show_myshops_more"><span v-text="show_lang('VIEW_ALL')"></span></div>
		</div>
		<div class="otherZone">
			<div v-if="webdata.id && webdata.is_x_ads" class="lnwshopZone lnwXZone">
				<a href="https://www.lnwx.com/manage"><div class="list-item"><div class="hoverCircle hoverCircleX3">จัดการบัญชี  LnwX</div></div></a>
			</div>
			<div v-else class="lnwshopZone">
				<a href="https://www.lnwshop.com/myaccount/main"><div class="list-item"><div class="hoverCircle hoverCircleX3">My LnwShop</div></div></a>
				<a href="https://www.lnwshop.com/myaccount/favshop"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-MY-FAVSHOP')}}</div></div></a>
				<a href="https://www.lnwshop.com/myaccount/service"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-MY_LNWSHOP_ADDON')}}</div></div></a>
			</div>
			<div class="lnwaccountsZone">
				<a :href="userdata.MANAGE_URL+'/main/profile'"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-PROFILE')}}</div></div></a>
				<a :href="userdata.MANAGE_URL+'/main/address'"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('RECEIVER_ADDRESS')}}</div></div></a>
				<a :href="userdata.MANAGE_URL+'/setting'"><div class="list-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-RESET-PSW')}}</div></div></a>
			</div><div class="clear"></div>
			<a v-if="webdata.id && webdata.is_localhost" @click.prevent.stop="accounts_logout" :href="userdata.LOGOUT_URL"><div class="logout-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-LOGOUT')}} <span>Copyright © <?=date('Y')?> <div class="lnwLogo"></div></span></div></div></a>
			<a v-else :href="userdata.LOGOUT_URL"><div class="logout-item"><div class="hoverCircle hoverCircleX3">{{show_lang('LB-LOGOUT')}} <span>Copyright © <?=date('Y')?> <div class="lnwLogo"></div></span></div></div></a>
		</div>
		<div class="messageZone">
			<div class="lbNotiPopup">
				<div class="popup_general">
					<div class="title" v-text="show_lang('LB-NOTIFICATION')"></div><a class="all" href="https://www.lnwaccounts.com/manage/notifications">ทั้งหมด</a>
					<div class="list" @scroll="handle_noti_scroll">
						<div v-for="nt in notis" class="li hoverCircle hoverCircleX2" :class="nt.className">
							<a :href="nt.url">
								<div class="avatar"><img :src="nt.image" :class="nt.image_class" /></div>
								<div class="icon_info"></div>
								<div class="noti_info">
									<span class="info" v-html="nt.message"></span><br>
									<span class="time" :title="nt.time" v-text="nt.time_diff"></span>
								</div>
							</a>
						</div>
						<div v-if="notis.length == 0" class="li list-empty" style="text-align: center;">- {{show_lang('LB-NO-NOTIFICATION')}} -</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`})