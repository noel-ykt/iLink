var socket = io('http://noel.ykt.ru:8087/'),
    storageParams = {
        username: "ilUsername",
        uid: "ilUid"
    };

socket.on('receive', function (data) {
    console.log(data);
    $(".il-messages_wrap").append(initMessage(data));
    scrollChat();
});

function isAuth() {
    return (localStorage.getItem(storageParams.username) != null && localStorage.getItem(storageParams.uid) != null);
}

function scrollChat() {
    $(".il-messages")
        .perfectScrollbar()
        .scrollTop($(".il-messages_wrap").height())
        .perfectScrollbar('update');
}

function initMessage(data) {
    var message;
    if (data.uid == localStorage.getItem(storageParams.uid)) {
        message = $('<div>', {
            class: 'il-message--me'
        });
    } else {
        message = $('<div>', {
            class: 'il-message'
        });
    }
    var messageUser = $('<div>', {
        class: 'il-message_user',
        html: data.username
    });
    var messageText = $('<div>', {
        class: 'il-message_text',
        html: data.message
    });
    message.append(messageUser)
        .append(messageText);
    return message;
}

angular.module('iLink', ['ngSanitize'])
    .controller('MainCtrl', function ($scope) {
        scrollChat();
        $scope.isAuth = isAuth();
        $scope.auth = function () {
            if ($scope.username.length > 2) {
                localStorage.setItem(storageParams.username, $scope.username);
                localStorage.setItem(storageParams.uid, (new Date()).getTime());
                angular.element(document.getElementById('auth-window')).hide();
            }
        };
        $scope.send = function () {
            if ($scope.text.length > 0) {
                socket.emit('message', {
                    username: localStorage.getItem(storageParams.username),
                    uid: localStorage.getItem(storageParams.uid),
                    message: $scope.text
                })
                $scope.text = '';
            }
            return false;
        };
    });