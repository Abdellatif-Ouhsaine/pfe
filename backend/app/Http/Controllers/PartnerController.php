<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Models\PartnershipRequest; // Your Eloquent model for requests

class PartnerController extends Controller
{
    // Approve a request by ID
    public function approve($id)
    {
        $request = Restaurant::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        $request->status = 'approved';
        $request->save();

        return response()->json(['message' => 'Request approved successfully', 'request' => $request]);
    }

    // Reject a request by ID
    public function reject($id)
    {
        $request = Restaurant::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        $request->status = 'rejected';
        $request->save();

        return response()->json(['message' => 'Request rejected successfully', 'request' => $request]);
    }

    // get ppendig resto
    public function pending()
    {
        $requests = Restaurant::with('user')->where('status', 'pending')->get();

        return response()->json($requests);
    }
    public function approved()
    {
        $requests = Restaurant::with('user')->where('status', 'approved')->get();

        return response()->json($requests);
    }
}
