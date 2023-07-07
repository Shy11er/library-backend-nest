import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorizDto } from './create-authoriz.dto';

export class UpdateAuthorizDto extends PartialType(CreateAuthorizDto) {}
