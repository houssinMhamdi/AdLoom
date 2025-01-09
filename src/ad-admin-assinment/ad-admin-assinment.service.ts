import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdAdminAssinmentDto } from './dto/create-ad-admin-assinment.dto';
import { UpdateAdAdminAssinmentDto } from './dto/update-ad-admin-assinment.dto';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdAssignment } from './entities/ad-admin-assinment.entity';
import { Advertising } from 'src/advertising/entities/advertising.entity';

@Injectable()
export class AdAdminAssinmentService {
  constructor( 
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    @InjectModel(AdAssignment.name) 
    private readonly AdAdminModel: Model<AdAssignment>,
    @InjectModel(Advertising.name)
    private readonly adsModel: Model<Advertising>,
  ){}

    
 async create(createAdAdminAssinmentDto: CreateAdAdminAssinmentDto) {
  const user = await this.UserModel.findById(createAdAdminAssinmentDto.user_id)
  if(!user){
    throw new NotFoundException('User not found');
  }
  if(user.deviceNumber<createAdAdminAssinmentDto.device_id){
    throw new BadRequestException('Device ID exceeds the user\'s allowed device limit');
  }
  const newAssignment = new this.AdAdminModel(createAdAdminAssinmentDto);
  return newAssignment.save()
  }

  findAll() {
    return 'zadazd'
  }

  async findOne(id: any) {
// console.log(id) 

  // const ads = await this.adsModel.findById(id)
  // console.log(ads)
  }

  update(id: number, updateAdAdminAssinmentDto: UpdateAdAdminAssinmentDto) {
    return `This action updates a #${id} adAdminAssinment`;
  }

  remove(id: number) {
    return `This action removes a #${id} adAdminAssinment`;
  }
}
