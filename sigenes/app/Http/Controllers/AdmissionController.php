<?php

namespace App\Http\Controllers;

use App\Applicant;
use App\AttachmentApplicants;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('templates.admissions.index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{

            $applicant = Applicant::create($request->all());

            // Insert official_identification
            AttachmentApplicants::create(['applicant_id' =>  $applicant->id,
            'attachment_type_id' => 1,
            'document' => $request->input('official_identification')['base64']]);

            // Insert birth_certificate
            AttachmentApplicants::create(['applicant_id' => $applicant->id,
                'attachment_type_id' => 2,
                'document' => $request->input('official_identification')['base64']]);

            // Insert high_school_certificate
            AttachmentApplicants::create(['applicant_id' => $applicant->id,
                'attachment_type_id' => 3,
                'document' => $request->input('official_identification')['base64']]);

            // Insert curp_file
            AttachmentApplicants::create(['applicant_id' => $applicant->id,
                'attachment_type_id' => 4,
                'document' => $request->input('official_identification')['base64']]);

            return \Response::json(['created' => true], 200);
        }catch (Exception $e){
            \Log::info('Error creating user: '.$e);
            return \Response::json(['created' => false], 500);
        }
    }
}
