import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserConfigService } from './user_config.service';
import { CreateUserConfigDto } from './dto/create-user_config.dto';
import { UpdateUserConfigDto } from './dto/update-user_config.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DOC_BEARER_AUTH, DOC_CREATE_USER_DESCRIPTION, DOC_CREATE_USER_SUMMARY, DOC_DISABLE_USER_BY_ID_DESCRIPTION, DOC_DISABLE_USER_BY_ID_SUMMARY, DOC_GET_USER_BY_ID_DESCRIPTION, DOC_GET_USER_BY_ID_SUMMARY, DOC_PATCH_USER_BY_ID_DESCRIPTION, DOC_PATCH_USER_BY_ID_SUMMARY, DOC_USER_TAG } from 'src/doc/swagger-consts';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@ApiTags(DOC_USER_TAG)
@Controller('user-config')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {}

  @ApiBody({type: CreateUserConfigDto, description: DOC_CREATE_USER_DESCRIPTION})
  @ApiOperation({summary: DOC_CREATE_USER_SUMMARY})
  @Post('/create')
  async createUserConfig(@Body() createUserConfigDto: CreateUserConfigDto) {

    return await this.userConfigService.createUserConfig(createUserConfigDto);

  }

  @ApiParam({name: 'id', description: DOC_GET_USER_BY_ID_DESCRIPTION})
  @ApiOperation({summary: DOC_GET_USER_BY_ID_SUMMARY})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @UseGuards(AuthTokenGuard)
  @Get('/find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.userConfigService.findOneUserConfig(+id);
  }

  @ApiParam({name: 'id', description: DOC_PATCH_USER_BY_ID_DESCRIPTION})
  @ApiBody({type: UpdateUserConfigDto})
  @ApiOperation({summary: DOC_PATCH_USER_BY_ID_SUMMARY})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @UseGuards(AuthTokenGuard)
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserConfigDto: UpdateUserConfigDto) {
    return this.userConfigService.updateUserConfig(+id, updateUserConfigDto);
  }

  @ApiParam({name: 'id', description: DOC_DISABLE_USER_BY_ID_DESCRIPTION})
  @ApiOperation({summary: DOC_DISABLE_USER_BY_ID_SUMMARY})
  @ApiBearerAuth(DOC_BEARER_AUTH)
  @UseGuards(AuthTokenGuard)
  @Patch('/disable/:id')
  remove(@Param('id') id: string) {
    return this.userConfigService.disableUserConfigByUserId(+id);
  }
}
