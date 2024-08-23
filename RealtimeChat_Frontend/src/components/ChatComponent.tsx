import React, { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface Message {
    type: string;
    content: string;
    sender: string;
}

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [user, setUsername] = useState<string>("user");

    useEffect(() => {
        // Prompt for username only once when the component mounts
        const username = prompt("Nhập tên") || "user";
        setUsername(username);
    }, []);

    useEffect(() => {
        // Create WebSocket connection
        const sock = new SockJS('http://localhost:8080/message');
        const stompClient = new Client({
            webSocketFactory: () => sock as WebSocket,
            debug: (str) => console.log(str),
            onConnect: () => {
                // Subscribe to the topic
                stompClient.subscribe('/topic/public', (message: IMessage) => {
                    console.log('Received message:', message.body);
                    setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    const sendMessage = (msg: string) => {
        if (client && client.connected) {
            client.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify({ type: 'CHAT', content: msg, sender: user }),
            });
        }
    };

    return (
        <div>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>
                        {msg.sender}: {msg.content}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}
            />
        </div>
    );
};

export default ChatComponent;
