import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { FiSend, FiX } from 'react-icons/fi';

export interface ChatMessage {
    type: 'user' | 'ai' | 'error';
    text: string;
}

export default function Chat() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
    const [isResponding, setIsResponding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [controller, setController] = useState<AbortController | null>(null);
    const [isComposing, setIsComposing] = useState(false);

    const aiMessageRef = useRef('');
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!message.trim() || isResponding) return;

        setIsLoading(true);
        setIsResponding(true);
        const newController = new AbortController();
        setController(newController);
        const signal = newController.signal;

        setChatLog((prev) => [...prev, { type: 'user', text: message.trim() }]);
        setMessage('');
        aiMessageRef.current = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message.trim() }),
                signal,
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            setChatLog((prev) => [...prev, { type: 'ai', text: '' }]);

            if (reader) {
                let buffer = '';
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const parts = buffer.split('\n').filter(Boolean);
                    
                    for (let i = 0; i < parts.length; i++) {
                        try {
                            const json = JSON.parse(parts[i]);
                            aiMessageRef.current += json.response;

                            setChatLog((prev) => {
                                const updated = [...prev];
                                updated[updated.length - 1] = { type: 'ai', text: aiMessageRef.current };
                                return updated;
                            });

                            if (i === parts.length - 1) buffer = '';
                        } catch (e) {
                            // Keep buffer for next round
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error(error);
                setChatLog((prev) => [...prev, { type: 'error', text: 'Streaming failed.' }]);
            }
        } finally {
            setIsLoading(false);
            setIsResponding(false);
            setController(null);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !isResponding && !isComposing) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleCancel = () => {
        if (controller) {
            controller.abort();
            // Update the chat log immediately to show cancellation
            setChatLog((prev) => {
                const updated = [...prev];
                if (updated.length > 0 && updated[updated.length - 1].type === 'ai') {
                    updated[updated.length - 1] = {
                        type: 'ai',
                        text: updated[updated.length - 1].text + '.'
                    };
                }
                return updated;
            });
            
            // Reset states
            setIsResponding(false);
            setIsLoading(false);
            setController(null);
        }
    };

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    const renderMarkdown = (text: string) => {
        return { __html: marked.parse(text) };
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
        }
    }, [message]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatLog]);
    return (
        <div className="relative flex h-[calc(100vh-4rem)] flex-col bg-gray-50">
            {/* Chat messages container */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4">
                {chatLog.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center text-gray-500">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-lg font-medium">How can I help you today?</h2>
                            <p className="mt-1 text-sm">Ask me anything or start a conversation</p>
                        </div>
                    </div>
                ) : (
                    chatLog.map((msg, i) => (
                        <div key={i} className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[90%] rounded-2xl p-4 text-sm transition-all duration-200 ${
                                    msg.type === 'user'
                                        ? 'bg-gray-100 text-dark'
                                        : msg.type === 'ai'
                                          ? ' border-gray-100  text-gray-800 '
                                          : 'border border-red-100 bg-red-50 text-red-800'
                                }`}
                            >
                                {msg.type === 'ai' ? (
                                    <div dangerouslySetInnerHTML={renderMarkdown(msg.text)} className="prose prose-sm max-w-none" />
                                ) : (
                                    <div className="whitespace-pre-wrap">{msg.text}</div>
                                )}
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
                <div className="mx-auto max-w-3xl">
                    <div className="relative">
                        <textarea
                            ref={inputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onCompositionStart={handleCompositionStart}
                            onCompositionEnd={handleCompositionEnd}
                            placeholder="Type your message..."
                            rows={1}
                            className="w-full resize-none border border-gray-300 bg-gray-50 p-4 pr-24 text-sm shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none sm:text-base md:max-h-45 md:min-h-[5rem] lg:max-h-40 rounded-xs"
                        />
                        <div className="absolute right-3 bottom-3 flex gap-2">
                            {message && (
                                <button
                                    onClick={() => setMessage('')}
                                    className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100"
                                    aria-label="Clear message"
                                >
                                    <FiX className="h-4 w-4" />
                                </button>
                            )}
                            <button
                                onClick={isResponding ? handleCancel : sendMessage}
                                disabled={!message.trim() && !isResponding}
                                className={`mr-2 mb-1 rounded-full p-2 transition-all duration-200 ${
                                    isResponding
                                        ? 'mr-2 mb-1 bg-red-500 p-2 text-white shadow-md hover:bg-red-600 cursor-pointer'
                                        : message.trim()
                                          ? 'mr-2 mb-1 bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700'
                                          : 'cursor-not-allowed bg-gray-300 text-gray-400'
                                }`}
                                aria-label={isResponding ? 'Cancel response' : 'Send message'}
                            >
                                {isResponding ? <BsStopCircle className="h-4 w-4" /> : <FiSend className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    {isResponding && (
                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                            AI is responding
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
