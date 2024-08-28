type ChatRoom = {
    id?: number,
    idUsers: number[],
    nameReceiver?: string,
    lastMessage?: string,
    unseenMessageCount?: number
}

export default ChatRoom