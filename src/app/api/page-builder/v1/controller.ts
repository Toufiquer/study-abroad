import { withDB } from '@/app/api/utils/db';
import PageBuilder from './model';
import { formatResponse, IResponse } from '@/app/api/utils/utils';
import { FilterQuery } from 'mongoose';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
}

function isMongoError(error: unknown): error is MongoError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'code' in error &&
    typeof (error as MongoError).code === 'number'
  );
}

export async function createSection(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const sectionData = await req.json();

      const newSection = await PageBuilder.create(sectionData);

      return formatResponse(newSection, 'Page created successfully', 201);
    } catch (error: unknown) {
      if (isMongoError(error) && error.code === 11000) {
        return formatResponse(null, `Duplicate: ${JSON.stringify(error.keyValue)}`, 409);
      }
      throw error;
    }
  });
}

export async function getSectionById(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'ID is required', 400);

    const page = await PageBuilder.findById(id);
    if (!page) return formatResponse(null, 'Not found', 404);

    return formatResponse(page, 'Fetched successfully', 200);
  });
}

export async function getSections(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const searchQuery = url.searchParams.get('q');
    let filter: FilterQuery<unknown> = {};

    if (searchQuery) {
      filter = {
        $or: [
          { pageTitle: { $regex: searchQuery, $options: 'i' } },
          { pagePath: { $regex: searchQuery, $options: 'i' } },
          { 'content.sectionUid': { $regex: searchQuery, $options: 'i' } },
          { 'content.title': { $regex: searchQuery, $options: 'i' } },
        ],
      };
    }

    const pages = await PageBuilder.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit);

    const total = await PageBuilder.countDocuments(filter);

    return formatResponse({ pages, total, page, limit }, 'Fetched successfully', 200);
  });
}

export async function updateSection(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      if (!id) return formatResponse(null, 'ID is required', 400);

      const updated = await PageBuilder.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: false,
      });

      if (!updated) return formatResponse(null, 'Not found', 404);

      return formatResponse(updated, 'Updated successfully', 200);
    } catch (error: unknown) {
      if (isMongoError(error) && error.code === 11000) {
        return formatResponse(null, `Duplicate: ${JSON.stringify(error.keyValue)}`, 409);
      }
      throw error;
    }
  });
}

export async function deleteSection(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const { id } = await req.json();
    console.log('id : ', id);
    if (!id) return formatResponse(null, 'ID required', 400);

    const deleted = await PageBuilder.findByIdAndDelete(id);
    if (!deleted) return formatResponse(null, 'Not found', 404);

    return formatResponse({ deletedCount: 1 }, 'Deleted successfully', 200);
  });
}