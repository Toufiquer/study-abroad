import { revalidatePath } from 'next/cache';
import { getFooters, createFooter, updateFooter, deleteFooter, getFooterById } from './controller';

// Note: Ensure this path matches where your formatResponse utility is located
// In your example it was '@/app/api/utils/jwt-verify', but often it is '@/app/api/utils/utils'
import { formatResponse, IResponse } from '@/app/api/utils/jwt-verify';

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getFooterById(req) : await getFooters(req);

  return formatResponse(result.data, result.message, result.status);
}

export async function POST(req: Request) {
  const result = await createFooter(req);

  if (result.status === 200 || result.status === 201) {
    // Update this path to where your Footer is displayed on the frontend
    revalidatePath('/footer-settings');
  }

  return formatResponse(result.data, result.message, result.status);
}

export async function PUT(req: Request) {
  const result = await updateFooter(req);

  if (result.status === 200) {
    revalidatePath('/footer-settings');
  }

  return formatResponse(result.data, result.message, result.status);
}

export async function DELETE(req: Request) {
  const result = await deleteFooter(req);

  if (result.status === 200) {
    revalidatePath('/footer-settings');
  }

  return formatResponse(result.data, result.message, result.status);
}
