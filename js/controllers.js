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
    // 彈出視窗    
    function CPopup(i) {
        console.log('這是編號'+i+'的設備');
        $ionicPopup.prompt({
            title: '更新容量',
            template: '請輸入『點滴A00001』容量(ml)',
            inputType: 'text',
            inputPlaceholder: '500',
            cancelText: '取消',
            okText: '下一步'
        }).then(function(res) {
            if(res) {
                console.log('容量 is', res);
                $ionicPopup.prompt({
                    title: '更新水量',
                    template: '請輸入『點滴A00001』水量(ml)',
                    inputType: 'text',
                    inputPlaceholder: '300',
                    cancelText: '取消',
                    okText: '更新'
                }).then(function(res) {
                    if(res) {
                        console.log('水量 is', res);
                    } else {
                        console.log('未輸入水量');
                    }
                });
            } else {
                console.log('未輸入容量');
            }
        });
    }

    // var pa =[90,50,40,30,20,10]; //模擬資料 百分比
    var pa =[80,47,72,35,18,63,74,84,57,53,77,35,86,85,96,90,85,70]; //模擬資料 百分比
    // 動態加入開始
    for (var i=1;i<=pa.length;i++){
        // 加入Element
        var txt1 = '<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" id="col'+i+'"><div class="infobox'+i+'">ABCD12345670<br>2017-12-07 04:07:20<br>護理師：Mary<br>病床號：A-3-01-00<br>藥品名：IV-1<br>計算已滴數量:121<br>滴速(滴量/分鐘)：63<br>點滴袋容量：342/500ml<br>預測剩餘時間：00:32:46<br></div><div class="bgbox'+i+'"></div><br><br><br><br><br><br><br><br><br></div>';
        $(".row1").append(txt1);
        // 點擊設備事件 <<目前有點狀況
        $('#col'+i).click(function(){
            CPopup(i);
        });
        // 加入水波顏色 , 加入水波高度        
        if (pa[i-1]>=90){
            $('#col'+i).addClass('col_blue');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -430px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -440px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;');                 
        } else if (pa[i-1]>=80){
            $('#col'+i).addClass('col_blue');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -410px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -420px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;');                 
        } else if (pa[i-1]>=70){
            $('#col'+i).addClass('col_blue');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -390px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -400px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=60){
            $('#col'+i).addClass('col_blue');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -370px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -380px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=50){
            $('#col'+i).addClass('col_blue');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -350px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -360px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=40){
            $('#col'+i).addClass('col_yellow');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -330px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -340px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=30){
            $('#col'+i).addClass('col_yellow');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -310px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -320px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=20){
            $('#col'+i).addClass('col_yellow');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -290px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -300px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else if (pa[i-1]>=10){
            $('#col'+i).addClass('col_red');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -270px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -280px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        } else{
            $('#col'+i).addClass('col_red');
            document.styleSheets[0].addRule('.bgbox'+i+':before','top: -250px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
            document.styleSheets[0].addRule('.bgbox'+i+':after','top: -260px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        }
        // 加入百分比數字
        document.styleSheets[0].addRule('.infobox'+i,'position: absolute; z-index: 1; width: 100%;');             
        document.styleSheets[0].addRule('.infobox'+i+':after','content: "'+pa[i-1]+'%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 

    }

    // 顯示系統時間
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