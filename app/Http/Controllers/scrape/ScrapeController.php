<?php

namespace App\Http\Controllers\scrape;

use App\Http\Controllers\Controller;
use DOMXPath;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ScrapeController extends Controller
{
    public function index()
    {
        return Inertia::render('scrape/Index');
    }

    public function process(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $url = $request->input('url');

        try {
            $response = Http::get($url);
            $html = $response->body();

            libxml_use_internal_errors(true);
            $doc = new \DOMDocument;
            $doc->loadHTML($html);
            libxml_clear_errors();

            $xpath = new DOMXPath($doc);

            // Extract title
            $title = $doc->getElementsByTagName('title')->item(0)?->nodeValue ?? '';

            // Extract meta tags
            $metaTags = $doc->getElementsByTagName('meta');
            $description = '';
            $image = '';
            $author = '';
            $publishedAt = '';

            foreach ($metaTags as $meta) {
                $name = strtolower($meta->getAttribute('name') ?: $meta->getAttribute('property'));

                if ($name === 'description' || $name === 'og:description') {
                    $description = $meta->getAttribute('content');
                }
                if ($name === 'og:image') {
                    $image = $meta->getAttribute('content');
                }
                if ($name === 'author') {
                    $author = $meta->getAttribute('content');
                }
                if (str_contains($name, 'published_time')) {
                    $publishedAt = $meta->getAttribute('content');
                }
            }

            // Try common HTML tags for author and date if meta fails
            if (! $author) {
                $authorNodes = $xpath->query('//*[contains(@class, "author") or contains(@id, "author")]');
                if ($authorNodes->length > 0) {
                    $author = trim($authorNodes->item(0)->textContent);
                }
            }

            if (! $publishedAt) {
                $timeTags = $doc->getElementsByTagName('time');
                if ($timeTags->length > 0) {
                    $publishedAt = $timeTags->item(0)?->getAttribute('datetime') ?: $timeTags->item(0)?->textContent;
                }
            }

            // Extract tags
            $tags = [];
            $tagCandidates = $xpath->query('//a[contains(@class, "tag") or contains(@class, "label") or contains(@href, "tag")]');
            foreach ($tagCandidates as $tag) {
                $text = trim($tag->textContent);
                if (! empty($text)) {
                    $tags[] = $text;
                }
            }

            // Extract main content
            $mainNode = $doc->getElementsByTagName('main')->item(0)
                        ?? $doc->getElementsByTagName('article')->item(0);

            if (! $mainNode) {
                $mainCandidates = $xpath->query('//*[contains(@class, "content") or contains(@id, "content")]');
                $mainNode = $mainCandidates->item(0);
            }

            $paragraphs = [];
            if ($mainNode) {
                // Remove unwanted tags
                $unwanted = ['script', 'style', 'nav', 'footer', 'aside'];
                foreach ($unwanted as $tag) {
                    $nodes = $mainNode->getElementsByTagName($tag);
                    for ($i = $nodes->length - 1; $i >= 0; $i--) {
                        $nodes->item($i)->parentNode->removeChild($nodes->item($i));
                    }
                }

                // Collect clean paragraphs
                $pTags = (new DOMXPath($doc))->query('.//p', $mainNode);
                foreach ($pTags as $p) {
                    $text = trim($p->textContent);
                    if (! empty($text)) {
                        $paragraphs[] = $text;
                    }
                }
            }

            return response()->json([
                'success' => true,
                'title' => $title,
                'description' => $description,
                'image' => $image,
                'author' => $author,
                'published_at' => $publishedAt,
                'tags' => array_unique($tags),
                'paragraphs' => $paragraphs,
                'url' => $url,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch URL. Please check the URL and try again.',
            ]);
        }
    }
}
