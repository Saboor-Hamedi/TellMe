<?php 
namespace App\Services;

class ImageDelete{
    public function deleteImageIfExists(?string $imageName, string $directory){
        if(!$imageName) return; 
        $fullPath = public_path($directory . '/' . $imageName);
        if(file_exists($fullPath)){
            unlink($fullPath);
        }
    }
}