import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { APP_SERVICES } from '@/data/plans';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('hidden_plans_hub');
    const collection = db.collection('services');

    // Count documents. If empty, self-seed the collection with APP_SERVICES static data.
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Seeding services collection from static plans data...');
      await collection.insertMany(APP_SERVICES);
    }

    // Retrieve all services from MongoDB
    const services = await collection.find({}).toArray();

    // Map _id (ObjectId) to string or exclude it to keep standard JSON format
    const formattedServices = services.map(service => {
      const { _id, ...rest } = service;
      return { id: service.id, ...rest };
    });

    return NextResponse.json(formattedServices);
  } catch (error: any) {
    console.error('Failed to fetch services from MongoDB:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint to allow adding new services to MongoDB dynamically
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, logo, category, description, plans } = body;

    if (!name || !logo || !category || !description || !plans) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Missing required service fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('hidden_plans_hub');
    const collection = db.collection('services');

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newService = {
      id,
      name,
      logo,
      category,
      description,
      plans
    };

    const result = await collection.insertOne(newService);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      service: newService
    });
  } catch (error: any) {
    console.error('Failed to create service in MongoDB:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
