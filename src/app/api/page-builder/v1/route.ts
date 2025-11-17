import { revalidatePath } from 'next/cache';
import { getSections, createSection, updateSection, deleteSection, getSectionById } from './controller';

import { formatResponse, IResponse } from '@/app/api/utils/jwt-verify';

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getSectionById(req) : await getSections(req);

  return formatResponse(result.data, result.message, result.status);
}

export async function POST(req: Request) {
  const result = await createSection(req);

  if (result.status === 200 || result.status === 201) {
    revalidatePath('/page-builder');
  }

  return formatResponse(result.data, result.message, result.status);
}

export async function PUT(req: Request) {
  const result = await updateSection(req);

  if (result.status === 200) {
    revalidatePath('/page-builder');
  }

  return formatResponse(result.data, result.message, result.status);
}

export async function DELETE(req: Request) {
  const result = await deleteSection(req);

  if (result.status === 200) {
    revalidatePath('/page-builder');
  }

  return formatResponse(result.data, result.message, result.status);
}
