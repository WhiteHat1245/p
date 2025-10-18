import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAttendancesQuery } from '../impl/get-attendances.query';

@QueryHandler(GetAttendancesQuery)
export class GetAttendancesHandler
  implements IQueryHandler<GetAttendancesQuery>
{
  async execute(query: GetAttendancesQuery) {
    // For now, we'll return a placeholder.
    // In a real application, you'd fetch this from the database.
    return [{ id: 1, status: 'present' }];
  }
}
