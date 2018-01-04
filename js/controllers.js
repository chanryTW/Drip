angular.module('app.controllers', [])
  
// ----------------------------------------登入頁面----------------------------------------
.controller('page5Ctrl', ['$scope', '$stateParams', '$ionicPopup',
function ($scope, $stateParams, $ionicPopup) {
    // 登入
    var accountL = document.getElementById("page5-input1");
    var pwdL = document.getElementById("page5-input2");
    var loginSmtBtn = document.getElementById("page5-button1");
    loginSmtBtn.addEventListener("click",function(){
        console.log(accountL.value);
        firebase.auth().signInWithEmailAndPassword(accountL.value, pwdL.value).then(function(){
            console.log("登入成功");
            accountL.value="";
            pwdL.value="";
            open("/ChanryTW2/#/page1/page2",'_self');
            // window.location.reload();
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            switch(errorCode){
                case 'auth/user-not-found':
                    var alertPopup = $ionicPopup.alert({
                        title: '發生錯誤',
                        template: '查無此帳號。'
                    });
                        alertPopup.then(function(res) {
                        accountL.value="";
                        pwdL.value="";
                    });
                    break;
                case 'auth/invalid-email':
                    var alertPopup = $ionicPopup.alert({
                        title: '發生錯誤',
                        template: '電子信箱的格式有誤。'
                    });
                        alertPopup.then(function(res) {
                        accountL.value="";
                    });
                    break;
                case 'auth/wrong-password':
                    var alertPopup = $ionicPopup.alert({
                        title: '發生錯誤',
                        template: '密碼錯誤，如忘記密碼請點選下方忘記密碼。'
                    });
                        alertPopup.then(function(res) {
                        pwdL.value="";
                    });
                    break;
            }
        })
    },false);
}])

// ----------------------------------------主頁面----------------------------------------
.controller('page2Ctrl', ['$scope', '$stateParams', '$ionicPopup',
function ($scope, $stateParams, $ionicPopup) {
    // 檢查點擊何者設備
    $(document).click(function(e){ 
        e = window.event || e; // 兼容IE7
        obj = $(e.srcElement || e.target);
        firebase.database().ref('/aDi/device/').once('value').then(function(snapshot) {
            for (var i=1;i<=Object.keys(snapshot.val()).length;i++) {
                if ($(obj).is(".infobox"+i)) { 
                    console.log('這是編號A'+i+'的點滴');
                    // 彈出視窗
                    var Nowi = i;
                    $ionicPopup.prompt({
                        title: '是否更新容器容量',
                        template: '請輸入『點滴A'+i+'』的容器容量(ml)',
                        inputType: 'text',
                        cancelText: '否',
                        okText: '是'
                    }).then(function(res) {
                        if(res) {
                            firebase.database().ref("/aDi/device/A"+Nowi).update({capacity: res},function(error) {
                                if (error){
                                    console.log('更新A'+Nowi+'容器容量'+res+'失敗');
                                    console.log('錯誤訊息'+error);
                                }
                                else{
                                    console.log('更新A'+Nowi+'容器容量'+res+'成功');
                                }
                            });
                            $ionicPopup.prompt({
                                title: '是否更新剩餘水量',
                                template: '請輸入『點滴A'+Nowi+'』的剩餘水量(ml)',
                                inputType: 'text',
                                cancelText: '否',
                                okText: '是'
                            }).then(function(res) {
                                if(res) {
                                    firebase.database().ref("/aDi/device/A"+Nowi).update({remainingML: res},function(error) {
                                        if (error){
                                            console.log('更新A'+Nowi+'剩餘水量'+res+'失敗');
                                            console.log('錯誤訊息'+error);
                                        }
                                        else{
                                            console.log('更新A'+Nowi+'剩餘水量'+res+'成功');
                                        }
                                    });
                                } else {
                                    console.log('未輸入剩餘水量，維持不變');
                                }
                            });
                        } else {
                            console.log('未輸入容器容量，維持不變');
                        }
                    });
                }
            }
        });
    });

    // 計數器 更新頁面資料
    ShowData();        
    function ShowData(){
        $(".row1").empty();
        // 取得資料
        firebase.database().ref('/aDi/device/').once('value').then(function(snapshot) {
            var device = Object.keys(snapshot.val()); //取得設備名稱資料 將物件轉成矩陣
            
            // 計算水的顏色個數
            var counts_array=[];
            var counts = {};

            // 動態加入開始
            for (var i=1;i<=device.length;i++){
                var device_per = eval('snapshot.val().A'+i+'.護理師'); //取得(護理師名稱)
                var device_bed = eval('snapshot.val().A'+i+'.病床號'); //取得(病床號)
                var capacity = eval('snapshot.val().A'+i+'.capacity'); //取得(容器容量) ml
                var duration = eval('snapshot.val().A'+i+'.duration'); //取得(滴速) 一滴要花的秒數
                duration = Math.round(60/duration);
                var remainingML = eval('snapshot.val().A'+i+'.remainingML') ; //取得(剩餘水量) ml
                var remainingTIME = Math.round(remainingML*20/duration); //計算(剩餘時間) 分鐘
                var pa = remainingML/capacity*100; //計算百分比

                
                
                // 時間顯示
                var NowDate=new Date();
                NowDate = NowDate.getFullYear()+'/'+NowDate.getMonth()+1+'/'+NowDate.getDate()+' '+NowDate.getHours()+':'+NowDate.getMinutes();
                // 加入Element
                var txt1 = '<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" id="col'+i+'"><div class="infobox'+i+'">點滴編號：A'+i+'<br>更新時間：'+NowDate+'<br>護理師：'+device_per+'<br>病床號：'+device_bed+'<br>藥品名稱：tinidazole<br>滴速：'+duration+' 滴/分鐘<br>已滴水量:121 ml(待處理)<br>點滴容量：'+remainingML+'/'+capacity+' ml<br>預測剩餘時間：'+remainingTIME+' 分鐘<br></div><div class="bgbox'+i+'"></div><br><br><br><br><br><br><br><br><br></div>';
                $(".row1").append(txt1);
                // 加入水波顏色 , 加入水波高度        
                if (pa>=90){
                    $('#col'+i).addClass('col_blue');
                    counts_array[i-1] = 1;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -430px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -440px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;');                 
                } else if (pa>=80){
                    $('#col'+i).addClass('col_blue');
                    counts_array[i-1] = 1;                    
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -410px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -420px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;');                 
                } else if (pa>=70){
                    $('#col'+i).addClass('col_blue');
                    counts_array[i-1] = 1;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -390px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -400px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=60){
                    $('#col'+i).addClass('col_blue');
                    counts_array[i-1] = 1;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -370px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -380px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=50){
                    $('#col'+i).addClass('col_blue');
                    counts_array[i-1] = 1;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -350px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -360px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=40){
                    $('#col'+i).addClass('col_yellow');
                    counts_array[i-1] = 2;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -330px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -340px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=30){
                    $('#col'+i).addClass('col_yellow');
                    counts_array[i-1] = 2;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -310px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -320px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=20){
                    $('#col'+i).addClass('col_yellow');
                    counts_array[i-1] = 2;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -290px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -300px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else if (pa>=10){
                    $('#col'+i).addClass('col_red');
                    counts_array[i-1] = 3;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -270px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -280px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                } else{
                    $('#col'+i).addClass('col_red');
                    counts_array[i-1] = 3;
                    document.styleSheets[0].addRule('.bgbox'+i+':before','top: -250px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                    document.styleSheets[0].addRule('.bgbox'+i+':after','top: -260px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
                }
                // 加入百分比數字
                document.styleSheets[0].addRule('.infobox'+i,'position: absolute; z-index: 1; width: 100%;');             
                document.styleSheets[0].addRule('.infobox'+i+':after','content: "'+pa+'%"; z-index:-1; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);');              
            }
            // 更新頁面上的水顏色個數
            counts_array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            var c = [];            
            for (i=1;i<=3;i++) {
                if (counts[i]==undefined) {
                    c[i-1] = 0;                    
                } else {
                    c[i-1] = counts[i];   
                }
            }         
            document.getElementById('sumBlue').innerHTML = '處於藍色正常的點滴：'+c[0]+'個';
            document.getElementById('sumYellow').innerHTML = '處於黃色正常的點滴：'+c[1]+'個';
            document.getElementById('sumRed').innerHTML = '處於紅色正常的點滴：'+c[2]+'個';
        });
        setTimeout(ShowData,30000);
    }

    // 計時器 顯示系統時間
    ShowTime();        
    function ShowTime(){
        var NowDate=new Date();
        var h=NowDate.getHours();
        var m=NowDate.getMinutes();
        var s=NowDate.getSeconds();　
        var y1=NowDate.getFullYear();
        var y2=NowDate.getMonth()+1;
        var y3=NowDate.getDate();
        document.getElementById('timeStr').innerHTML = '系統時間：'+y1+'年'+y2+'月'+y3+'日'+h+'時'+m+'分'+s+'秒';
        setTimeout(ShowTime,1000);
    }

    // 更新主頁的暱稱
    var userId = localStorage.getItem("uid");
    return firebase.database().ref('/使用者/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().暱稱) || 'Anonymous';
        // 儲存uid，之後讀取與寫入資料用
        localStorage.setItem("username", username);
        document.getElementById("menu-heading1").innerText = username;
    });
}])

// ----------------------------------------設定頁面----------------------------------------
.controller('page4Ctrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicPopup',
function ($scope, $stateParams, $ionicLoading, $ionicPopup) {
    
    
    // 修改暱稱功能
    var SaveBtn1 = document.getElementById("page4_savebtn1");
    var uploadFileInput1 = document.getElementById("uploadFileInput1");    
    SaveBtn1.addEventListener("click",function(){
        $ionicLoading.show({ // 開始跑圈圈
            template: '更新暱稱中...'
        });
        var uid = localStorage.getItem("uid"); // 取回uid
        var db = firebase.database();
        db.ref("使用者/" + uid).update({暱稱: uploadFileInput1.value},
        function (error) {
            if (error) {
                console.log("修改失敗");
                $ionicLoading.hide();
                console.log(error);
                var alertPopup = $ionicPopup.alert({
                    title: '修改暱稱失敗',
                    template: error
                });
            }
            else {
                console.log("修改成功");
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: '成功',
                    template: '暱稱修改完成。'
                });
                // 更新選單的暱稱
                var userId = localStorage.getItem("uid");
                return firebase.database().ref('/使用者/' + userId).once('value').then(function(snapshot) {
                    var username = (snapshot.val() && snapshot.val().暱稱) || 'Anonymous';
                    document.getElementById("menu-heading1").innerText = username; 
                });
            }
        });
    });
    // 上傳大頭照功能
    var SaveBtn2 = document.getElementById("page4_savebtn2");    
    var uploadFileInput2 = document.getElementById("uploadFileInput2");
    SaveBtn2.addEventListener("click",function(){
        $ionicLoading.show({ // 開始跑圈圈
            template: '上傳圖片中...'
        });
        var file = uploadFileInput2.files[0];
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child('images/'+localStorage.getItem("uid")).put(file);
        uploadTask.on('state_changed', function(snapshot){
            // 取得檔案上傳狀態，並用數字顯示
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('已上傳 ' + progress + '%');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: 
                console.log('上傳暫停');
                break;
                case firebase.storage.TaskState.RUNNING: 
                console.log('上傳中');
                break;
            }
        }, function(error) {
            console.log("上傳失敗");
            $ionicLoading.hide();
            console.log(error);
            var alertPopup = $ionicPopup.alert({
                title: '上傳圖片失敗',
                template: error
            });
        }, function() {
            console.log("上傳成功");
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: '成功',
                template: '更換照片完成。'
            });
            // 更新menu的大頭照
            var storage = firebase.storage();
            var storageRef = storage.ref();
            storageRef.child('images/'+localStorage.getItem("uid")).getDownloadURL().then(function(url) {
                document.getElementById("menu-img").src=url;
            })
        });
    },false);

    // 登出
    var signOutSmtBtn = document.getElementById("signoutbtn");
    signOutSmtBtn.addEventListener("click",function(){
        firebase.auth().signOut().then(function() {
            console.log("登出成功");
            localStorage.clear();
            open("/ChanryTW2/#/page5",'_self');
        }).catch(function(error) {
            console.log("登出發生錯誤!");
        });
    },false);

    // 更新menu的大頭照
    var storage = firebase.storage();
    var storageRef = storage.ref();
    storageRef.child('images/'+localStorage.getItem("uid")).getDownloadURL().then(function(url) {
        document.getElementById("menu-img").src=url;
    })
    
    // 更新選單的暱稱
    var userId = localStorage.getItem("uid");
    return firebase.database().ref('/使用者/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().暱稱) || 'Anonymous';
        // 儲存uid，之後讀取與寫入資料用
        localStorage.setItem("username", username);
        document.getElementById("menu-heading2").innerText = username +"，您好"; 
    });
    
}])