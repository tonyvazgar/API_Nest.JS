import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 10)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 25)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  src: string;
}
