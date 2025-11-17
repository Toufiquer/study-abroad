import { formatResponse } from '@/app/api/utils/jwt-verify';
import { isUserHasAccess, IWantAccess } from '../utils/is-user-has-access';
import { logger } from 'better-auth';

export async function GET(req: Request) {
  logger.info(JSON.stringify(req));
  const wantToAccess: IWantAccess = {
    db_name: 'user',
    access: 'create',
  };

  const result = await isUserHasAccess(wantToAccess);

  console.log('result: ', result); // Check terminal logs

  return formatResponse(result, 'Server is running', 200);
}
