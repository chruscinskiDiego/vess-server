import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserConfigDto } from './dto/create-user_config.dto';
import { UpdateUserConfigDto } from './dto/update-user_config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig } from './entities/user_config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConfigService {

  constructor(
    @InjectRepository(UserConfig)
    private readonly userConfigRepository: Repository<UserConfig>,
  ) { }

  async createUserConfig(createUserConfigDto: CreateUserConfigDto) {

    try {

      const user = await this.userConfigRepository.create(createUserConfigDto);

      const createdUser = await this.userConfigRepository.save(user);

      return {
        message: `Usuário com ID ${createdUser.id_user} criado com sucesso`,
        id: createdUser.id_user,
        email: createdUser.email,
      }

    }catch (error) {

      if(error.code === '23505') {
        
        throw new ConflictException('E-mail já cadastrado na base de dados.');

      }
      
      throw error;
    }
    
  }


  async findOneUserConfig(id: number) {
    
    const user = await this.userConfigRepository.findOneBy({ id_user: id });

    if(!user){
      throw new NotFoundException(`Usuário não encontrado`);
    }
    
    return user;
  }

  async updateUserConfig(id: number, updateUserConfigDto: UpdateUserConfigDto) {
    
    const user = await this.userConfigRepository.preload({
      id_user: id,
      ...updateUserConfigDto,
    });

    if(!user){
      throw new NotFoundException(`Usuário não encontrado`);
    }

    await this.userConfigRepository.save(user);

    return {
      message: `Usuário com ID ${id} atualizado com sucesso`,
    }

  }

  async disableUserConfigByUserId(id: number) {
    
    const userToDisable = await this.userConfigRepository.findOneBy({ id_user: id });

    if(!userToDisable){
      throw new NotFoundException(`Usuário não encontrado`);
    }

    await this.userConfigRepository.update(id, { isActive: false });

    return {
      message: `Usuário com ID ${id} desativado com sucesso`
    }

  }
}
