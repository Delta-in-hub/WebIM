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

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
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
}

function updateFriendList(friendsList) {
  if (friendsList == null || friendsList.length == 0) {
    return;
  }
  friendsList.forEach((name) => {
    var afriend = document.createElement("div");
    afriend.className = "msg";

    var img = document.createElement("img");
    img.className = "msg-profile";
    img.src =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png";
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
