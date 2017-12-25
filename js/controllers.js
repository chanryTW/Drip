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
    function CPopup() {
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

    // 點擊設備
    $('#col1').click(function(){
        CPopup();
    });

    // 動態加入設備資料
        // 改顏色
        $('#col1').addClass('col_blue');
        $('#col2').addClass('col_yellow');
        $('#col3').addClass('col_blue');
        $('#col4').addClass('col_yellow');
        $('#col5').addClass('col_red');
        $('#col6').addClass('col_blue');
        // 改水波高度
        document.styleSheets[0].addRule('.bgbox1:before','top: -400px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox1:after','top: -410px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox2:before','top: -325px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox2:after','top: -335px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox3:before','top: -380px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox3:after','top: -390px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox4:before','top: -310px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox4:after','top: -320px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox5:before','top: -290px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox5:after','top: -300px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox6:before','top: -360px; border-radius: 190px; background-color: rgba(255, 255, 255, 0.424); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;'); 
        document.styleSheets[0].addRule('.bgbox6:after','top: -370px; border-radius: 170px; background-color: rgb(255, 255, 255); content: " "; position: absolute; width: 450px; height: 450px; left: 50%; animation: wave 30s infinite linear;');     
        // 改百分比數字
        document.styleSheets[0].addRule('.infobox1','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox1:after','content: "80%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
        document.styleSheets[0].addRule('.infobox2','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox2:after','content: "47%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
        document.styleSheets[0].addRule('.infobox3','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox3:after','content: "72%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
        document.styleSheets[0].addRule('.infobox4','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox4:after','content: "35%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
        document.styleSheets[0].addRule('.infobox5','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox5:after','content: "18%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
        document.styleSheets[0].addRule('.infobox6','position: absolute; z-index: 1; width: 100%;'); 
        document.styleSheets[0].addRule('.infobox6:after','content: "63%"; font-size: 80px; color: rgba(255, 255, 255, 0.514); position: absolute; top: 130px; left: 50%; transform: translateX(-50%);'); 
    

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