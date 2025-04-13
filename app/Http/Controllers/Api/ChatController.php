<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        return response()->stream(function () use ($userMessage) {
            // Connect to Ollama with streaming
            $response = Http::withOptions(['stream' => true])
                ->timeout(60)
                ->post('http://localhost:11434/api/generate', [
                    'model' => 'llama3.2',
                    'prompt' => $userMessage,
                    'stream' => true,
                    'num_predict' => 1024,
                    'temperature' => 0.7,
                    'system' => 'You are a helpful assistant. Answer fully and clearly.',
                ]);

            $body = $response->getBody();

            // Stream chunks to frontend
            while (!$body->eof()) {
                $chunk = $body->read(19); 
                echo $chunk;

                ob_flush();
                flush();
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no', // useful for nginx
        ]);
    }
}
