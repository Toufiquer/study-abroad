import { withDB } from '@/app/api/utils/db';
import Footer from './model';
import { formatResponse, IResponse } from '@/app/api/utils/utils';
import { FilterQuery } from 'mongoose';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
}

function isMongoError(error: unknown): error is MongoError {
  return error !== null && typeof error === 'object' && 'code' in error && typeof (error as MongoError).code === 'number';
}

export async function createFooter(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const footerData = await req.json();

      const newFooter = await Footer.create(footerData);

      return formatResponse(newFooter, 'Footer created successfully', 201);
    } catch (error: unknown) {
      if (isMongoError(error) && error.code === 11000) {
        return formatResponse(null, `Duplicate: ${JSON.stringify(error.keyValue)}`, 409);
      }
      throw error;
    }
  });
}

export async function getFooterById(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'ID is required', 400);

    const footer = await Footer.findById(id);
    if (!footer) return formatResponse(null, 'Not found', 404);

    return formatResponse(footer, 'Fetched successfully', 200);
  });
}

export async function getFooters(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '1000');
    const skip = (page - 1) * limit;

    const searchQuery = url.searchParams.get('q');
    let filter: FilterQuery<unknown> = {};

    if (searchQuery) {
      filter = {
        $or: [
          { footerUId: { $regex: searchQuery, $options: 'i' } },
          // Since 'data' is mixed, deep searching it via regex is complex/inefficient,
          // but we can search basic fields or top-level string properties inside data if known.
          // For now, limiting search to footerUId to match the safe pattern.
        ],
      };
    }

    const footers = await Footer.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit);

    const total = await Footer.countDocuments(filter);

    return formatResponse({ footers, total, page, limit }, 'Fetched successfully', 200);
  });
}

// Get All footers for internal use or SSG equivalent
export async function getAllFooters(): Promise<IResponse> {
  return withDB(async () => {
    const page = parseInt('1');
    const limit = parseInt('1000');
    const skip = (page - 1) * limit;
    const filter: FilterQuery<unknown> = {};
    const footers = await Footer.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit);

    const total = await Footer.countDocuments(filter);

    return formatResponse({ footers, total, page, limit }, 'Fetched successfully', 200);
  });
}

export async function updateFooter(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      if (!id) return formatResponse(null, 'ID is required', 400);

      const updated = await Footer.findByIdAndUpdate(id, updateData, {
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

export async function deleteFooter(req: Request): Promise<IResponse> {
  return withDB(async () => {
    const { id } = await req.json();
    if (!id) return formatResponse(null, 'ID required', 400);

    const deleted = await Footer.findByIdAndDelete(id);
    if (!deleted) return formatResponse(null, 'Not found', 404);

    return formatResponse({ deletedCount: 1 }, 'Deleted successfully', 200);
  });
}
