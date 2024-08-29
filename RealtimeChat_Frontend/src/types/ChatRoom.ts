type ChatRoom = {
    id?: number,
    idUsers: number[],
    nameReceiver?: string,
    lastMessage?: string,
    unseenMessageCount?: number,
    idLastSender?: number
}

export default ChatRoom