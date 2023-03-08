import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude() // will auto cast string to number in query
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude() // will auto cast string to number in query
  lat: number;
}
