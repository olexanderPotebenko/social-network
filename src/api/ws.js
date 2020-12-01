export default startWebSocketConnection = () => {
    let ws = new WebSocket('ws://127.0.0.1:8181');
    ws.onopen = (e) => {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        debugger;
        ws.send(JSON.stringify({
            token: this.props.auth.token,
            id: this.props.auth.id,
            action: 'auth',
        }));
        let data = JSON.stringify({
            id: this.props.auth.id,
            action: 'send message',
            user_id: '',
        });

        ws.send(data);
    };

    ws.onmessage = (event) => {
        alert(`[message] Данные получены с сервера: ${event.data}`);
    };

    ws.onclose = (event) => {
        if (event.wasClean) {
            alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            alert('[close] Соединение прервано');
            setTimeout(startWebSocketConnection, 2000);
        }
    };

    ws.onerror = (error) => {
        alert(`[error] ${error.message}`);
    };
};

