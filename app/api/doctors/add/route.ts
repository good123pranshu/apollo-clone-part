import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Doctor from '@/models/Doctor';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Parse incoming JSON data from the request
    const body = await req.json();
    
    // Destructure body for easier access
    const { 
      name, 
      specialty, 
      qualification, 
      experience, 
      consultationFee, 
      totalRatings, 
      location, 
      state, 
      consultationMode, 
      languages, 
      availableSlots, 
      image 
    } = body;

    // Basic validation
    if (!name || !specialty || !qualification || !experience || !consultationFee || !totalRatings || !location || !state) {
      return NextResponse.json(
        { error: 'Missing required fields: name, specialty, qualification, experience, consultationFee, totalRatings, location, state' },
        { status: 400 }
      );
    }

    // Ensure consultationMode and languages are arrays (if provided)
    const consultationModeArray = Array.isArray(consultationMode) ? consultationMode : [];
    const languagesArray = Array.isArray(languages) ? languages : [];

    // Check if the image URL is valid (Optional validation)
    if (image && !/^https?:\/\//.test(image)) {
      return NextResponse.json(
        { error: 'Invalid image URL' },
        { status: 400 }
      );
    }

    // Create a new doctor object
    const newDoctor = new Doctor({
      name,
      specialty,
      qualification,
      experience,
      consultationFee,
      languages: languagesArray,
      rating: 0,  // Default to 0 if not provided
      totalRatings,
      hospital: body.hospital || null,  // Default to null if not provided
      location,
      state,
      consultationMode: consultationModeArray,
      availableSlots,
      image: image || null,  // Add the image URL if provided (or null if not)
    });

    // Save the doctor to the database
    await newDoctor.save();

    return NextResponse.json({
      message: 'Doctor added successfully',
      doctor: newDoctor,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding doctor:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
