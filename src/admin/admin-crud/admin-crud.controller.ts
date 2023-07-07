import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { AdminCrudService } from './admin-crud.service';
import { CreateAdminCrudDto } from './dto/create-admin-crud.dto';
import { UpdateAdminCrudDto } from './dto/update-admin-crud.dto';

@ApiBearerAuth()
@ApiTags('Main')
@Controller()
export class AdminCrudController {
  constructor(private readonly adminCrudService: AdminCrudService) {}

  //! CREATE
  @ApiOperation({ summary: 'Admin creating' })
  @ApiResponse({ status: 200, description: 'Successful creating of admin' })
  @ApiResponse({ status: 400, description: 'Validation Error' })
  @ApiResponse({ status: 409, description: 'Admin is existing' })
  @Post()
  create(@Body() createAdminCrudDto: CreateAdminCrudDto) {
    try {
      return this.adminCrudService.create(createAdminCrudDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  //! GET ALL
  @ApiOperation({ summary: 'All admins getting' })
  @ApiResponse({ status: 200, description: 'Show all admins' })
  @Get()
  findAll() {
    try {
      return this.adminCrudService.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  //! GET ONE
  @ApiOperation({ summary: 'Getting admin by id' })
  @ApiResponse({
    status: 200,
    description: 'The admin is getted',
  })
  @ApiResponse({
    status: 404,
    description: 'The admin is undefined',
  })
  @ApiResponse({
    status: 406,
    description: 'ID is not a number',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.adminCrudService.findOne(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  //! UPDATE
  @ApiOperation({ summary: 'Adming updating' })
  @ApiResponse({
    status: 200,
    description: 'The admin is updated',
  })
  @ApiResponse({
    status: 404,
    description: 'The admin is undefined',
  })
  @ApiResponse({
    status: 406,
    description: 'ID is not a number',
  })
  @ApiResponse({
    status: 409,
    description: 'This email is existing already by other admin',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminCrudDto: UpdateAdminCrudDto,
  ) {
    try {
      return this.adminCrudService.update(+id, updateAdminCrudDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  //! DELETE
  @ApiOperation({ summary: 'Adming removing' })
  @ApiResponse({
    status: 200,
    description: 'The admin is removed',
  })
  @ApiResponse({
    status: 404,
    description: 'The admin is undefined',
  })
  @ApiResponse({
    status: 406,
    description: 'ID is not a number',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.adminCrudService.remove(+id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
