<?php

namespace App\Helpers;

class QRCodeHelper
{
    public static function renderWithLabel(string $qrPng, string $label): string
    {
        $qrImage = imagecreatefromstring($qrPng);
        $qrWidth = imagesx($qrImage);
        $qrHeight = imagesy($qrImage);

        $paddingX = 20;
        $paddingTop = 40;
        $paddingBottom = 15;
        $borderThickness = 2;

        $canvasWidth = $qrWidth + ($paddingX * 2);
        $canvasHeight = $qrHeight + $paddingTop + $paddingBottom;

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);
        $white = imagecolorallocate($canvas, 255, 255, 255);
        $black = imagecolorallocate($canvas, 0, 0, 0);
        imagefill($canvas, 0, 0, $white);

        // Draw fieldset border
        imagefilledrectangle($canvas, 0, 0, $canvasWidth - 1, $canvasHeight - 1, $white);
        imagerectangle($canvas, $borderThickness, $borderThickness, $canvasWidth - 1 - $borderThickness, $canvasHeight - 1 - $borderThickness, $black);

        // White background behind label text to create legend effect
        $fontPath = 'C:\Windows\Fonts\segoeui.ttf';
        $fontSize = 12;
        $textWidth = 0;
        if (file_exists($fontPath)) {
            $bbox = imagettfbbox($fontSize, 0, $fontPath, $label);
            $textWidth = $bbox[2] - $bbox[0];
        } else {
            $textWidth = strlen($label) * 8;
        }
        $textHeight = 20;
        $labelX = 12;
        $labelBgWidth = $textWidth + 16;
        imagefilledrectangle($canvas, $labelX, 0, $labelBgWidth, $textHeight + 2, $white);

        // Draw label text (legend)
        if (file_exists($fontPath)) {
            imagettftext($canvas, $fontSize, 0, $labelX + 4, $textHeight - 2, $black, $fontPath, $label);
        } else {
            imagestring($canvas, 3, $labelX + 4, 2, $label, $black);
        }

        // Paste QR code centered horizontally, below the label area
        $qrX = $paddingX;
        $qrY = $paddingTop;
        imagecopy($canvas, $qrImage, $qrX, $qrY, 0, 0, $qrWidth, $qrHeight);

        ob_start();
        imagepng($canvas);
        $output = ob_get_clean();

        imagedestroy($qrImage);
        imagedestroy($canvas);

        return $output;
    }
}
