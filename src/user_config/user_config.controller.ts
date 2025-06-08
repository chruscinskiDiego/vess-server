import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserConfigService } from './user_config.service';
import { CreateUserConfigDto } from './dto/create-user_config.dto';
import { UpdateUserConfigDto } from './dto/update-user_config.dto';

@Controller('user-config')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {}

  @Post('/create')
  async createUserConfig(@Body() createUserConfigDto: CreateUserConfigDto) {

    return await this.userConfigService.createUserConfig(createUserConfigDto);

  }

  @Get('/find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.userConfigService.findOneUserConfig(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserConfigDto: UpdateUserConfigDto) {
    return this.userConfigService.updateUserConfig(+id, updateUserConfigDto);
  }

  @Patch('/disable/:id')
  remove(@Param('id') id: string) {
    return this.userConfigService.disableUserConfigByUserId(+id);
  }
}
