<?php

namespace App\Http\Controllers;

use App\Models\SeatingArea;
use App\Models\SeatingPosition;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SeatingAreasController extends Controller
{
    // Lister toutes les zones avec leurs tables
    public function index(Request $request)
    {
        $query = SeatingArea::with('seatingPositions');
        
        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }
        
        return $query->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'restaurant_id' => 'required|integer',
            'tables' => 'nullable|string', // JSON string
            'image' => 'nullable|image',
        ]);

        $zone = new SeatingArea();
        $zone->name = $request->name;
        $zone->restaurant_id = $request->restaurant_id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('zones', 'public');
            $zone->image_url = $path; // ✅ correction ici
        }

        $zone->save();

        if ($request->tables) {
            $tables = json_decode($request->tables, true);
            \Log::info('Tables reçues :', $tables);

            foreach ($tables as $tableData) {
                $table = new SeatingPosition();
                $table->label = $tableData['label'] ?? 'Table';
                $table->capacity = $tableData['capacity'] ?? 1;
                $table->is_available = isset($tableData['is_available']) ? (bool)$tableData['is_available'] : true;
                $table->seating_area_id = $zone->id;
                $table->save();
            }
        }

        return response()->json(['message' => 'Zone créée avec tables']);
    }

    public function update(Request $request, $id)
    {
        $zone = SeatingArea::findOrFail($id);

        \Log::info('Update seating area', $request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'restaurant_id' => 'required|exists:restaurants,id',
            'tables' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $zone->name = $request->input('name');
        $zone->restaurant_id = $request->input('restaurant_id');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('seating_area_images', 'public');
            $zone->image_url = $path; // ✅ correction ici aussi
        }

        $zone->save();

        // Mise à jour des tables
        if ($request->tables) {
            $tables = json_decode($request->tables, true);

            $zone->seatingPositions()->delete();

            foreach ($tables as $tableData) {
                $table = new SeatingPosition();
                $table->label = $tableData['number'] ?? 'Table';
                $table->capacity = $tableData['capacity'] ?? 1;
                $table->is_available = isset($tableData['status']) && $tableData['status'] === 'available';
                $table->seating_area_id = $zone->id;
                $table->save();
            }
        }

        return response()->json(['message' => 'Zone mise à jour avec ses tables']);
    }

    public function destroy($id)
    {
        $area = SeatingArea::findOrFail($id);
        $area->seatingPositions()->delete();
        $area->delete();

        return response()->json(['message' => 'Zone supprimée avec ses tables']);
    }

    public function destroyPosition($id)
    {
        $position = SeatingPosition::findOrFail($id);
        $position->delete();

        return response()->json(['message' => 'Table supprimée avec succès']);
    }
    public function getSeatingPositions()
    {
    return response()->json(SeatingPosition::all());
    }
    public function updateStatus(Request $request, $id)
{
    $reservation = Reservation::findOrFail($id);
    $request->validate([
        'status' => 'required|string|in:pending,confirmed,cancelled',
    ]);

    $reservation->status = $request->status;
    $reservation->save();

    return response()->json([
        'message' => 'Statut mis à jour avec succès',
        'reservation' => $reservation,
    ]);
}

}
