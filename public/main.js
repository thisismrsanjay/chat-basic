$(document).ready(()=>{
    
    let socket = io.connect('http://localhost:3000');
    let chatForm = $('#chatForm');
    let message = $('#chatInput');
    let chatWindow = $('#chatWindow');
    let userForm = $('#userForm');
    let username = $('#username');
    let users = $('#users');
    let error = $('#error');



    //submit form
    userForm.on('submit',(e)=>{
        socket.emit('set user',username.val(),(data)=>{
            if(data){
                $('#userFormWrap').hide();
                $('#mainWrap').show();
            }else{
                error.html('username is taken');
            }
        })
        e.preventDefault();
    });

    //submit chat form 
    chatForm.on('submit',(e)=>{
        socket.emit('send message',message.val());
        message.val('');
        e.preventDefault();
    })
    //Show message
    socket.on('show message',(data)=>{
        chatWindow.append('<strong>'+ data.user +'</strong>: '+data.msg+'<br>')
    })

    //Display username
    socket.on('users',(data)=>{
        let html='';
        for(let i=0;i<data.length;i++){
            html+='<li class="list-group-item">'+data[i]+ '</li>'
        }
        users.html(html);
    })



})