<?php

namespace App\Http\Controllers;


use App\Models\Rider;
use Illuminate\Http\Request;

class RiderController extends Controller
{
    // Approve a request by ID
    public function approve($id)
    {
        $request = Rider::find($id);

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
        $request = Rider::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        $request->status = 'rejected';
        $request->save();

        return response()->json(['message' => 'Request rejected successfully', 'request' => $request]);
    }

    // get pending riders
    public function pending()
    {
        $requests = Rider::with('user')->where('status', 'pending')->get();

        return response()->json($requests);
    }

    public function approved()
    {
        $requests = Rider::with('user')->where('status', 'approved')->get();

        return response()->json($requests);
    }
}
