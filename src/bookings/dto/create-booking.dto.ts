import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class EndTimeAfterStartTimeConstraint {
  validate(endTime: Date, args: any) {
    const startTime = args.object.startTime;
    return endTime > startTime;
  }

  defaultMessage() {
    return 'endTime must be after startTime';
  }
}

export class CreateBookingDto {
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  startTime: Date;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  @Validate(EndTimeAfterStartTimeConstraint)
  endTime: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  userId: string;
}
