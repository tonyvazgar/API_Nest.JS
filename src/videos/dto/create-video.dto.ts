import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(2, 10)
  title: string;

  @IsNotEmpty()
  @Length(5, 25)
  description: string;

  @IsNotEmpty()
  @IsUrl()
  src: string;
}
