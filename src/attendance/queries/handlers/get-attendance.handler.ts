import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAttendanceQuery } from '../impl/get-attendance.query';

@QueryHandler(GetAttendanceQuery)
export class GetAttendanceHandler implements IQueryHandler<GetAttendanceQuery> {
  async execute(query: GetAttendanceQuery) {
    // For now, we'll return a placeholder.
    // In a real application, you'd fetch this from the database.
    return { id: query.id, status: 'present' };
  }
}
