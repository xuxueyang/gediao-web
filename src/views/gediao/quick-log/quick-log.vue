<template>
<div class="quick-log">
    <div id="myDIV" class="header">
        <h2 style="margin:5px">快捷日志</h2>
        <input type="text" id="myInput" placeholder="Title...">
        <span @click="newElement" class="addBtn">Add</span>
    </div>

    <ul id="myUL">
    </ul>
</div>
</template>

<script>
export default {
    data(){
        return{
            close: [],
        }
    },
    methods:{
        //  得到所有今天的快捷日志（标题自动创建为快捷日志，消息体为输入的内容，状态为流水）
        getAllQuickLog(){
            const token = services.getToken()
            const userId = services.getUserId()
            if(token&&userId){
              var url = '' + services.getServiceIp()+"/api/app/log/eachs"+"?token="+token+"&userId="+userId
              this.$http.get(url,{
                // 分页信息
                //   page: 0,
                //   size: 20
              }).then(function(res){
                if(res.data.returnCode.startsWith("200")){
                  var map = res.data.data
                  var arr = [];
                  for(var i=0;i<map.data.length;i++){
                    arr.push(map.data[i])
                  }
                  for(var i=0;i<arr.length;i++){
                   // this.tableDate.push(arr[i])
                  }
                }else{
                  this.$message({
                    type:"error",
                    showClose:true,
                    message: services.getMessageByCode(res.data.returnCode)
                  })
                }
              }).catch(function(res){
                console.log(res)
                this.$message({
                  type:"error",
                  showClose:true,
                  message:"服务器正在抢修中~688"
                })
              })
            }else{
              this.$message({
                type:"error",
                showClose:true,
                message:"登录失效"
              })
              this.$router.history.push('/gediao')
            }
        },
        newElement() {
            var li = document.createElement("li");
            var inputValue = document.getElementById("myInput").value;
            var t = document.createTextNode(""+inputValue);
            li.appendChild(t);
            if (inputValue === '') {
                alert("请输入内容!");
            } else {
                document.getElementById("myUL").appendChild(li);
            }
            document.getElementById("myInput").value = "";

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            for (var i = 0; i < this.close.length; i++) {
                this.close[i].onclick = function() {
                    var div = this.parentElement;
                    div.style.display = "none";
                }
            }
        }
    },
    mounted() {
        // Create a "close" button and append it to each list item
        var myNodelist = document.getElementsByTagName("#myUK LI");
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }

        // Click on a close button to hide the current list item
        this.close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < this.close.length; i++) {
            this.close[i].onclick = function() {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }

        // Add a "checked" symbol when clicking on a list item
        // var list = document.querySelector('ul');
        var list = document.getElementById("myUL");
        list.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
            }
        }, false);

        // Create a new list item when clicking on the "Add" button

    },
}
</script>

<style>
.quick-log{
    width: 40%;
    min-width: 250px;
    margin-left:10px;
    box-sizing: border-box;
}



/* Remove margins and padding from the list */
.quick-log ul {
  margin-top: 30px;
}

/* Style the list items */
.quick-log ul li {
    clear: both;
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
.quick-log ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
.quick-log ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
.quick-log ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
.quick-log ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.quick-log .close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.quick-log .close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.quick-log .header {
  background-color: #f44336;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.quick-log .header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
.quick-log input {
  border: none;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.quick-log .addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.quick-log .addBtn:hover {
  background-color: #bbb;
}
</style>
