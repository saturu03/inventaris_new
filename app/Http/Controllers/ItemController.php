<?php

namespace App\Http\Controllers;

use App\Helpers\QRCodeHelper;
use App\Models\Category;
use App\Models\Item;
use App\Models\Location;
use chillerlan\QRCode\Output\QRGdImagePNG;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use ZipArchive;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $items = Item::with(['category', 'location'])->get();

        return Inertia::render('Items/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $locations = Location::all();

        return Inertia::render('Items/Create', [
            'categories' => $categories,
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'name' => 'required|string|max:255',
            'status' => 'required|in:available,inavailable',
            'spec' => 'nullable|string',
            'condition' => 'required|in:functional,slightly_damaged,broken',
            'is_limited' => 'boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $photoPath = $request->file('photo')?->store('items', 'public');

        Item::create([
            'category_id' => $request->category_id,
            'location_id' => $request->location_id,
            'name' => $request->name,
            'status' => $request->status,
            'spec' => $request->spec,
            'condition' => $request->condition,
            'is_limited' => $request->boolean('is_limited'),
            'barcode' => Str::uuid(),
            'photo' => $photoPath,
        ]);

        return redirect()->route('items.index')->with('success', 'Item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        $categories = Category::all();
        $locations = Location::all();

        return Inertia::render('Items/Edit', [
            'item' => $item,
            'categories' => $categories,
            'locations' => $locations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'name' => 'required|string|max:255',
            'status' => 'required|in:available,inavailable',
            'spec' => 'nullable|string',
            'condition' => 'required|in:functional,slightly_damaged,broken',
            'is_limited' => 'boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $updateData = [
            'category_id' => $request->category_id,
            'location_id' => $request->location_id,
            'name' => $request->name,
            'status' => $request->status,
            'spec' => $request->spec,
            'condition' => $request->condition,
            'is_limited' => $request->boolean('is_limited'),
        ];

        if ($request->hasFile('photo')) {
            if ($item->photo) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($item->photo);
            }
            $updateData['photo'] = $request->file('photo')->store('items', 'public');
        }

        $item->update($updateData);

        return redirect()->route('items.index')->with('success', 'Item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('items.index')->with('success', 'Item deleted successfully.');
    }

    public function publicIndex()
    {
        $locations = Location::with(['items.category'])->get();

        return Inertia::render('Items/Public', [
            'locations' => $locations,
        ]);
    }

    public function findByBarcode(string $barcode)
    {
        $item = Item::with(['category', 'location'])->where('barcode', $barcode)->first();

        if (! $item) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        return response()->json($item);
    }

    public function generateBarcodePerItem(Item $item)
    {
        $options = new QROptions;
        $options->outputInterface = QRGdImagePNG::class;
        $options->scale = 10;
        $options->outputBase64 = false;

        $qrcode = new QRCode($options);
        $png = $qrcode->render($item->barcode);
        $png = QRCodeHelper::renderWithLabel($png, $item->name);

        return response($png, 200, [
            'Content-Type' => 'image/png',
            'Content-Disposition' => 'inline; filename="'.$item->name.'-qrcode.png"',
        ]);
    }

    public function generateBarcode()
    {
        set_time_limit(0);
        $items = Item::all();
        $zip = new ZipArchive;
        $zipFileName = storage_path('app/public/item-qrcodes.zip');

        if (file_exists($zipFileName)) {
            unlink($zipFileName);
        }

        $zip->open($zipFileName, ZipArchive::CREATE);

        $options = new QROptions;
        $options->outputInterface = QRGdImagePNG::class;
        $options->scale = 8;
        $options->outputBase64 = false;

        foreach ($items as $item) {
            $qrcode = new QRCode($options);
            $pngData = $qrcode->render($item->barcode);
            $pngData = QRCodeHelper::renderWithLabel($pngData, $item->name);
            $zip->addFromString($item->name.'-'.$item->id.'.png', $pngData);
        }

        $zip->close();

        return response()->download($zipFileName, 'item-qrcodes.zip')->deleteFileAfterSend(true);
    }
}
