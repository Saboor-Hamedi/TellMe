<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    use AuthorizesRequests;

    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        return response()->stream(function () use ($userMessage) {
            $response = Http::withOptions(['stream' => true])
                ->timeout(120)
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
            while (! $body->eof()) {
                $chunk = $body->read(1024);
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
