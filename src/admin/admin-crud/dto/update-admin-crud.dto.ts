import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminCrudDto } from './create-admin-crud.dto';
import { IsString, IsEmail } from 'class-validator';

export class UpdateAdminCrudDto extends PartialType(CreateAdminCrudDto) {}
