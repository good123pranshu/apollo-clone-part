import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Doctor from '@/models/Doctor';
import { experienceRanges, feeRanges } from '@/lib/constant';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = req.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    // Filters
    const specialties = searchParams.getAll('specialty');
    const consultationModes = searchParams.getAll('consultationMode');
    const experiences = searchParams.getAll('experience');
    const fees = searchParams.getAll('fees');
    const languages = searchParams.getAll('language');
    const minRating = searchParams.get('minRating');
    const location = searchParams.get('location');
    const state = searchParams.get('state');

    const sortBy = searchParams.get('sortBy') || 'rating';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const filter: any = {};

    if (specialties.length > 0) filter.specialty = { $in: specialties };
    if (consultationModes.length > 0) filter.consultationMode = { $in: consultationModes };
    if (languages.length > 0) filter.languages = { $in: languages };
    if (location) filter.location = location;
    if (state) filter.state = state;
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    // Handle experience ranges
    if (experiences.length > 0) {
      const expFilters = experiences.map(label => {
        const range = experienceRanges.find(r => r.label === label);
        return range
          ? { experience: { $gte: range.min, $lte: range.max } }
          : null;
      }).filter(Boolean);

      if (expFilters.length > 0) {
        filter.$or = [...(filter.$or || []), ...expFilters];
      }
    }

    // Handle fee ranges
    if (fees.length > 0) {
      const feeFilters = fees.map(label => {
        const range = feeRanges.find(r => r.label === label);
        return range
          ? { consultationFee: { $gte: range.min, $lte: range.max } }
          : null;
      }).filter(Boolean);

      if (feeFilters.length > 0) {
        filter.$or = [...(filter.$or || []), ...feeFilters];
      }
    }

    // Normalize sort field
    let sortField = 'rating';
    let sortDirection = sortOrder === 'asc' ? 1 : -1;

    switch (sortBy) {
      case 'fees_low':
        sortField = 'consultationFee';
        sortDirection = 1;
        break;
      case 'fees_high':
        sortField = 'consultationFee';
        sortDirection = -1;
        break;
      case 'experience':
        sortField = 'experience';
        break;
      case 'rating':
      default:
        sortField = 'rating';
        break;
    }

    const sort: any = {};
    sort[sortField] = sortDirection;

    // Fetch data
    const doctors = await Doctor.find(filter).sort(sort).skip(skip).limit(limit).lean();
    const total = await Doctor.countDocuments(filter);

    return NextResponse.json({
      doctors,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
