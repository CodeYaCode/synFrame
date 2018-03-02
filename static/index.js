// index.js
$(document).ready(function() {
    var conn;    
    var msg = document.getElementById("msg");
    var log = document.getElementById("log");
    var netFlag = true
    var uid

    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + "/ws");
        conn.onopen = function(evt) {
            conn.send(JSON.stringify(format()))
        }
        conn.onclose = function (evt) {
            appendLog("Connection closed.");
        };
        conn.onmessage = function (evt) {
            var messages = evt.data.split('\n');
            for (var i = 0; i < messages.length; i++) {
                appendLog(messages[i]);
            }
            uid = messages[0].Uid
            // 认为网络是通的
            netFlag = true
        };
    } else {
        appendLog("<b>Your browser does not support WebSockets.</b>");
    }

    function format(cmd) {
        var result = new Object()
        if (!uid) {
            result.cmd = "0"
            return result
        } else if (cmd === 1) {

        } else if (cmd === 2) {

        } else {

        }
        return uid
    }

    function appendLog(message) {
        var item = document.createElement("div");
        // var s = $.parseJSON(message)
        // item.innerText = s.F + ": " + s.Uid + ": "+ s.C;
        item.innerText = message
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    }

    var ra1 = $("#ra-1");
    if (ra1) {
        ra1.click(function() {
            conn.send("hello world")
        });
    }

    // 模拟检测网络情况
    setInterval(function() {
        if (!netFlag) {
            appendLog("Network is crowded.")
        }
        netFlag = false
    }, 1000);
});