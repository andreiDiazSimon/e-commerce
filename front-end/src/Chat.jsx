import axios from 'axios';
import { useState, useEffect, useContext, useRef } from "react";
import { contextKo } from "./LoginComponent";

export default function Chat() {
	console.clear();
	const context = useContext(contextKo);
	console.log(JSON.stringify(context, null, 2))
	const currentUserId = context.userId;
	const [contacts, setContacts] = useState([]);
	const [selectedContact, setSelectedContact] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState(''); // Track the new message
	const messagesEndRef = useRef(null); // Ref for the bottom of the messages container

	// Function to scroll to the bottom of the chat
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		// Fetch contacts when the component mounts
		const fetchContacts = async () => {
			try {
				const response = await axios.get(`http://localhost:9999/api/chat/contacts`, {
					params: { userId: currentUserId },
				});
				setContacts(response.data.contacts);
			} catch (err) {
				console.error('Error fetching contacts:', err);
			}
		};

		fetchContacts();
	}, [currentUserId]);

	// Fetch messages when a contact is selected
	useEffect(() => {
		if (!selectedContact) return;

		const fetchMessages = async () => {
			try {
				const response = await axios.get(`http://localhost:9999/api/chat/messages`, {
					params: {
						senderId: currentUserId,
						receiverId: selectedContact.user_id,
					},
				});
				setMessages(response.data.messages);
			} catch (err) {
				console.error('Error fetching messages:', err);
			}
		};

		fetchMessages();
	}, [currentUserId, selectedContact]);

	// Scroll to bottom whenever messages update
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Function to handle sending a message
	const handleSendMessage = async () => {
		if (!newMessage.trim()) return; // Prevent sending empty messages

		try {
			const response = await axios.post('http://localhost:9999/api/messages', {
				sender_id: currentUserId,
				receiver_id: selectedContact.user_id,
				message: newMessage,
			});

			if (response.status === 200) {
				// Update the messages list locally after successful send
				setMessages((prevMessages) => [
					...prevMessages,
					{
						message_id: Date.now(), // Temporary ID for UI
						sender_id: currentUserId,
						receiver_id: selectedContact.user_id,
						content: newMessage,
					},
				]);
				setNewMessage(''); // Clear input field
			}
		} catch (err) {
			console.error('Error sending message:', err);
		}
	};

	return (
		<div className="bg-white w-full h-full p-4">
			<div className="grid grid-cols-[20%_1fr] grid-rows-1 w-full h-[85vh]">
				{/* First Column (contacts) */}
				<div className="flex flex-col bg-gradient-to-r from-white to-gray-300 h-screen overflow-scroll">
					{contacts.map((contact) => (
						<div
							key={contact.user_id}
							onClick={() => setSelectedContact(contact)} // Set selected contact
							className={`bg-gray-800 text-white flex gap-[0.5rem] justify-start items-center p-2 cursor-pointer ${selectedContact?.user_id === contact.user_id ? 'bg-gray-600' : ''
								}`}
						>
							<img
								className="border rounded-full object-cover w-12 h-12"
								src={`http://localhost:9999/photos/${contact.user_profile_photo_path}`}
								alt={contact.user_name}
							/>
							<div className="font-bold">{contact.user_name}</div>
						</div>
					))}
				</div>

				{/* Second Column (chat box) */}
				<div className="flex flex-col bg-gray-100 p-4 h-full">
					{/* Chat Header */}
					{selectedContact ? (
						<>
							<h2 className="text-xl font-bold mb-4 bg-gray-800 text-white p-[1rem]">
								{selectedContact.user_name}
							</h2>
							{/* Messages */}
							<div className="flex flex-col gap-2 flex-1 overflow-y-auto">
								{messages.map((message) => {
									const isCurrentUser = message.sender_id === currentUserId;
									const senderPhoto = isCurrentUser
										? `${context.profilePhoto}`
										: `http://localhost:9999/photos/${selectedContact.user_profile_photo_path}`;

									return (
										<div
											key={message.message_id}
											className={`flex items-center gap-2 ${isCurrentUser ? 'justify-end' : ''}`}
										>
											{/* Show profile picture for the other user */}
											{!isCurrentUser && (
												<img
													src={senderPhoto}
													alt="Profile"
													className="w-8 h-8 rounded-full"
												/>
											)}
											<div
												className={`p-2 rounded ${isCurrentUser
													? 'bg-blue-500 text-white self-end'
													: 'bg-gray-300 text-black self-start'
													}`}
												style={{ maxWidth: '60%' }}
											>
												{message.content}
											</div>
											{/* Show profile picture for the current user */}
											{isCurrentUser && (
												<img
													src={senderPhoto}
													alt="Profile"
													className="w-8 h-8 rounded-full"
												/>
											)}
										</div>
									);
								})}
								{/* Invisible div to ensure scrolling to the bottom */}
								<div ref={messagesEndRef} />
							</div>
							{/* Input and Send Button */}
							<div className="flex gap-2 mt-4">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type a message..."
									className="flex-1 border rounded p-2"
								/>
								<button
									onClick={handleSendMessage}
									className="bg-blue-500 text-white rounded px-4"
								>
									Send
								</button>
							</div>
						</>
					) : (
						<p className="text-gray-500">Select a contact to view the conversation</p>
					)}
				</div>
			</div>
		</div>
	);
}
