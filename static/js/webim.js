const toggleButton = document.querySelector(".dark-light");
const colors = document.querySelectorAll(".color");

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    colors.forEach((c) => c.classList.remove("selected"));
    const theme = color.getAttribute("data-color");
    document.body.setAttribute("data-theme", theme);
    color.classList.add("selected");
  });
});

function addFriend(friendName) {
  var url = "/apis/addFriend?friendName=";
  if (friendName == null || friendName == "") {
    return false;
  }
  url += friendName;

  var http = new XMLHttpRequest();

  http.open("GET", url, true);
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log("addFriend: " + http.responseText);
    }
  };
  http.send(null);
}

function addFriendButton() {
  console.log("add friend button clicked");
  var friendName = window.prompt("请输入用户名称", "用户名");
  if (friendName == null || friendName == "") {
    return;
  }
  addFriend(friendName);
  getFriendsList();
}

function getMessagesSendByMe(friendName) {
  // getMessagesSendByMe?friendName=bob
  var url = "/apis/getMessagesSendByMe?friendName=";
  if (friendName == null || friendName == "") {
    return [];
  }
  url += friendName;
  var http = new XMLHttpRequest();
  http.open("GET", url, false);
  http.send(null);
  if (http.readyState == 4 && http.status == 200) {
    var re_json = JSON.parse(http.responseText);
    return re_json["messages"];
  }
  return [];
}

function getMessagesSendByFriend(friendName) {
  // http://127.0.0.1:8000/apis/getMessagesSendByFriend?friendName=delta
  var url = "/apis/getMessagesSendByFriend?friendName=";
  if (friendName == null || friendName == "") {
    return [];
  }
  url += friendName;
  var http = new XMLHttpRequest();
  http.open("GET", url, false);
  http.send(null);
  if (http.readyState == 4 && http.status == 200) {
    var re_json = JSON.parse(http.responseText);
    return re_json["messages"];
  }
  return [];
}

function formatDate(str) {
  // 2022-04-28T08:17:14.329Z
  str.indexOf(".");
  var dateStr = str.substring(0, str.indexOf("."));
  var date = new Date(dateStr + "Z");
  return date;
}

function getOrderedMessageList(friendName) {
  var messagesSendByMe = getMessagesSendByMe(friendName);
  messagesSendByMe.forEach((message) => {
    message["time"] = formatDate(message["time"]);
    message["isSendByMe"] = true;
  });

  var messagesSendByFriend = getMessagesSendByFriend(friendName);
  messagesSendByFriend.forEach((message) => {
    message["time"] = formatDate(message["time"]);
    message["isSendByMe"] = false;
  });

  var messages = messagesSendByMe.concat(messagesSendByFriend);
  messages.sort(function (a, b) {
    return a["time"].getTime() - b["time"].getTime();
  });
  return messages;
}

var my_name = null;

function getMyName() {
  if (my_name == null) {
    var http = new XMLHttpRequest();
    http.open("GET", "/apis/getUserInfo", false);
    http.send(null);
    if (http.readyState == 4 && http.status == 200) {
      my_name = new String(JSON.parse(http.responseText)["userName"]);
    }
  }
  return my_name;
}

function changeChatArea(afriend) {
  // console.log("changeChatArea: " + afriend.innerHTML);
  if (afriend == null) {
    return;
  }
  var old_active = document.getElementsByClassName("msg active")[0];
  if (old_active != null) {
    old_active.className = "msg";
  }
  afriend.className = "msg active";

  var chatTitle = document.getElementsByClassName("chat-area-title")[0];
  chatTitle.innerHTML =
    afriend.getElementsByClassName("msg-username")[0].innerHTML;

  var chatAreaMain = document.getElementsByClassName("chat-area-main")[0]; // chat-area-main

  messageList = getOrderedMessageList(
    afriend.getElementsByClassName("msg-username")[0].innerHTML
  );
  if (
    messageList.length ==
    chatAreaMain.getElementsByClassName("chat-msg-text").length
  ) {
    return;
  }

  chatAreaMain.innerHTML = "";
  var pre_chat = null;
  for (let index = 0; index < messageList.length; ) {
    const message = messageList[index];
    if (pre_chat == null) {
      pre_chat = document.createElement("div");
      if (message["isSendByMe"]) {
        pre_chat.className = "chat-msg owner";
      } else {
        pre_chat.className = "chat-msg";
      }
      var chat_msg_profile = document.createElement("div");
      chat_msg_profile.className = "chat-msg-profile";
      var chat_msg_profile_img = document.createElement("img");
      chat_msg_profile_img.className = "chat-msg-img";
      var name =
        document.getElementsByClassName("chat-area-title")[0].innerHTML;

      if (message["isSendByMe"]) {
        name = getMyName();
      }

      chat_msg_profile_img.src = getAvatar(name);

      chat_msg_profile.appendChild(chat_msg_profile_img);
      var chat_msg_date = document.createElement("div");
      chat_msg_date.className = "chat-msg-date";
      chat_msg_date.innerHTML =
        "send at " + message["time"].toLocaleTimeString();
      chat_msg_profile.appendChild(chat_msg_date);
      pre_chat.appendChild(chat_msg_profile);

      var chat_msg_content = document.createElement("div");
      chat_msg_content.className = "chat-msg-content";
      pre_chat.appendChild(chat_msg_content);
    }
    if (message["isSendByMe"] && pre_chat.className == "chat-msg") {
      chatAreaMain.appendChild(pre_chat);
      pre_chat = null;
      continue;
    } else if (
      !message["isSendByMe"] &&
      pre_chat.className == "chat-msg owner"
    ) {
      chatAreaMain.appendChild(pre_chat);
      pre_chat = null;
      continue;
    }

    var chat_msg_text = document.createElement("div");
    chat_msg_text.className = "chat-msg-text";
    chat_msg_text.innerHTML = message["content"];

    pre_chat
      .getElementsByClassName("chat-msg-content")[0]
      .appendChild(chat_msg_text);

    index++;
  }
  if (pre_chat != null) {
    chatAreaMain.appendChild(pre_chat);
  }

  scrollDown();
  /*
            <div class="chat-msg owner">
              <div class="chat-msg-profile">
                <img
                  class="chat-msg-img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                  alt=""
                />
                <div class="chat-msg-date">Message seen 2.50pm</div>
              </div>
              <div class="chat-msg-content">
                <div class="chat-msg-text">
                  posuere eget augue sodales, aliquet posuere eros.
                </div>
                <div class="chat-msg-text">
                  Cras mollis nec arcu malesuada tincidunt.
                </div>
              </div>
            </div>

 */
}

function isFriendInList(friendName) {
  var friendList = document.getElementsByClassName("msg-username");
  for (let index = 0; index < friendList.length; index++) {
    const friend = friendList[index];
    if (friend.innerHTML == friendName) {
      return true;
    }
  }
  return false;
}

const hashCode = (s) =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

function getAvatar(friendName) {
  var hash = hashCode(friendName);
  var avatar = hash % 22; //1-22
  avatar = avatar + 1;
  return "/static/emoji/emoji" + avatar + ".png";
}

function updateFriendList(friendsList) {
  if (friendsList == null || friendsList.length == 0) {
    return;
  }
  friendsList.forEach((name) => {
    if (!isFriendInList(name)) {
      var afriend = document.createElement("div");
      afriend.className = "msg";

      afriend.addEventListener("click", function handleClick() {
        getFriendsList();
        changeChatArea(this);
      });

      var img = document.createElement("img");
      img.className = "msg-profile";
      img.src = getAvatar(name);

      afriend.appendChild(img);

      var msg_detail = document.createElement("div");
      msg_detail.className = "msg-detail";

      var msg_username = document.createElement("div");
      msg_username.className = "msg-username";
      msg_username.innerHTML = name;

      msg_detail.appendChild(msg_username);

      var msg_content = document.createElement("div");
      msg_content.className = "msg-content";

      var msg_message = document.createElement("span");
      msg_message.className = "msg-message";
      msg_message.innerHTML = "你好，我是" + name;

      msg_content.appendChild(msg_message);

      var msg_time = document.createElement("span");
      msg_time.className = "msg-date";
      msg_time.innerHTML = "18m";

      msg_content.appendChild(msg_time);

      msg_detail.appendChild(msg_content);

      afriend.appendChild(msg_detail);

      var area = document.getElementsByClassName("conversation-area")[0];
      area.prepend(afriend);
    }
  });

  /*
          <div class="msg">
            <img
              class="msg-profile"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png"
              alt=""
            />
            <div class="msg-detail">
              <div class="msg-username">Jared Jackson</div>
              <div class="msg-content">
                <span class="msg-message"
                  >Tattooed brooklyn typewriter gastropub</span
                >
                <span class="msg-date">18m</span>
              </div>
            </div>
          </div>
  */
}

function getFriendsList() {
  var url = "/apis/getFriendsList";
  var http = new XMLHttpRequest();

  http.open("GET", url, true);
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log("getFriendsList: " + http.responseText);
      var friendsList = JSON.parse(http.responseText);
      updateFriendList(friendsList["friends"]);
    }
  };
  http.send(null);
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function fullUpdate() {
  console.log("fullUpdate" + new Date());
  // getFriendsList();
  changeChatArea(document.getElementsByClassName("msg active")[0]);
}

function sendMessage() {
  const input = document.getElementById("message_input");
  if (input.value == "") {
    fullUpdate();
    scrollDown();
    return;
  }
  var friendName =
    document.getElementsByClassName("chat-area-title")[0].innerHTML;
  var url =
    "/apis/sendMessage?content=" + input.value + "&friendName=" + friendName;
  var http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log("sendMessage: " + http.responseText);
    }
  };
  http.send(null);
  input.value = "";
  sleep(10).then(() => {
    fullUpdate();
    scrollDown();
  });
}

var input = document.getElementById("message_input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
    scrollDown();
  }
});

setInterval(fullUpdate, 1500);

function scrollDown() {
  const tmp = document.getElementsByClassName("chat-area")[0];
  tmp.scrollTop = tmp.scrollHeight;
}
