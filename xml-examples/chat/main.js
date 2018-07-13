
var nick=document.getElementById('nick')
var message=document.getElementById('message')
var button=document.getElementById('button')
var chat=document.getElementById('chat')

button.onclick=function(elem){
    function jsonPost(url, data)
    {
        return new Promise((resolve, reject) => {
            var newRequest = new XMLHttpRequest();   
            newRequest.onerror = () => reject(new Error('jsonPost failed'))
            //x.setRequestHeader('Content-Type', 'application/json');
            newRequest.open("POST", url, true);
            newRequest.send(JSON.stringify(data))

            newRequest.onreadystatechange = () => {
                if (newRequest.readyState == XMLHttpRequest.DONE && newRequest.status == 200){
                    resolve(JSON.parse(newRequest.responseText))
                }
                else if (newRequest.status != 200){
                    reject(new Error('status is not 200'))
                }
            }
        })
    }
    jsonPost("http://students.a-level.com.ua:10012", {
      func:"addMessage",
      nick:nick.value,
      message:message.value,
    })



    var mess = function(){
    var messages = {};
    messages = jsonPost("http://students.a-level.com.ua:10012", {
        func: "getMessages",
        messageid: messages.length
    }).then(a => {
        console.log(a)
        for (q = 0; q < a.data.length; q++) {
            var chatik = document.getElementById("chat")
            var abzac = document.createElement("p")
            
            abzac.innerHTML = a.data[q].nick + "----" + a.data[q].message
            // abzac.style.backgroundColor = "green";
            chatik.appendChild(abzac)
            

        }
    var nextId = a.nextMessageId
        console.log(nextId + "a111")
        console.log(a.data.length)
        setInterval(function() {
            var messages = jsonPost("http://students.a-level.com.ua:10012", {
                func: "getMessages",
                messageid: nextId
            }).then(newFunc => {
                for (q = a.data.length; q < newFunc.data.length; q++) {
                    var chatik = document.getElementById("chat")
                    var abzac = document.createElement("p")
                    abzac.innerHTML = newFunc.data[q].nick + "----" + newFunc.data[q].message
                    chatik.appendChild(abzac)

                }
                nextId = newFunc.nextMessageId
                console.log(nextId + "a222")
                console.log(newFunc.data.length)
            })


        }, 2000);
    })
}
mess()
}
