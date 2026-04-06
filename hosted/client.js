const socket = io();

const handleEditBox = () => {
    const editForm = document.getElementById('editForm');
    const editBox = document.getElementById('editBox');
    const channelSelect = document.getElementById('channel');

    channelSelect.addEventListener('change', () => {
        document.getElementById('messages').innerHTML = '';
        socket.emit('room change', channelSelect.value);
    })

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (editBox.value) {
            socket.emit('chat message', editBox.value);
            editBox.value = '';
        }
    });
}

const displayMessage = (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = msg;
    document.getElementById('messages').appendChild(messageDiv);
}

const init = () => {
    handleEditBox();
    socket.on('chat message', displayMessage);
};

window.onload = init;